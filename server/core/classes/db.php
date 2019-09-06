<?php
class DB {
  public $conn;
  private $db_name;
  private $options;

  public function __construct($db_name, $options) {
    $this->options = $options;
    $this->db_name = $db_name;

    $args = $options['db'][$db_name];
    $charset = (isset($args['charset'])) ? $args['charset'] : 'utf8mb4';
    $db = new PDO(
      sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $args['host'],
        $db_name,
        $charset
      ),
      $args['user'],
      $args['pass']
    );
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
  
    $this->conn = $db;
  }

  public function showTables() {
    $whitelist = isset($this->options['db'][$this->db_name]['tables']) ? $this->options['db'][$this->db_name]['tables'] : null;
    $sql = "SHOW tables";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $table_data = $stmt->fetchAll();
    foreach($table_data as $table) {
      if($whitelist && !in_array($table[0], $whitelist)) continue;
      $tables[] = $table[0];
    }
    return $tables;
  }

  public function columns($table_name) {
    $sql = "
    SHOW columns FROM $table_name";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $column_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach($column_data as $item) {
      preg_match('/\d+/', $item['Type'], $len);

      $columns[$item['Field']]['type'] = $item['Type'];
      if($len) {
        $columns[$item['Field']]['limit'] = $len[0];
      } else {
        $columns[$item['Field']]['limit'] = 0;
      }
    }
    return $columns;
  }

  public function rows($sql) {
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $results = [];
    foreach($rows as $index => $row) {
      $results[(int)$index] = [
        'row' => (string)$row['id'],
      ];
      foreach($row as $colKey => $item) {
        $results[(int)$index]['items'][] = [
          'col' => $colKey,
          'presentation' => $item
        ];
        
      }
    }
    return $results;
  }

  public function update($sql, $value) {
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(':value', $value);
    $stmt->execute();
  }

  public function validate($sql, $column, $cell_value) {
    echo $sql;
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $value = $row[$column];

    echo $value . "\n\n";
    echo $cell_value;

    if($value !== $cell_value) {
      http_response_code(500);
      die('Could not save value correctly to database');
    }
  }

  public function value($sql, $column) {
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return json_encode($row[$column]);
  }

  public function rowsCount($sql) {
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result[0]['COUNT(*)'];
  }

  public function connect() {
    return $this->conn;
  }
}