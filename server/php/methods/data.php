<?php
class Data {
  public $args = [];
  public $limit = 100;

  function __construct() {
    // Args
    $this->args = $this->getArgs();
    $this->database = $this->args->database;
    $this->table = $this->args->table;
    $this->offset = $this->args->offset;
    $this->orderby = '';
    $this->validateArgs();
    $this->orderByToString();
    $this->filters = $this->filter();

    // Config
    $config_class = new Config();
    $this->config = $config_class->data;
    $this->configHasDatabaseTable();
    $this->config_table = $this->config[$this->database][$this->table];

    $this->limit = $this->getLimit();
    $this->all_cols = [];
    $this->cols = [];
    $this->cols_order = [];
    $this->rows = [];
    $this->meta = [
      'limit' => $this->limit,
      'offset' => $this->offset,
      'total' => $this->getTotal()
    ];
  }

  function rows() {
    return $this->rows;
  }

  function cols_all() {
    return $this->all_cols;
  }

  function cols() {
    return $this->cols;
  }

  function cols_order() {
    return $this->cols_order;
  }

  function meta() {
    return $this->meta;
  }

  // Get args
  function getArgs() {
    global $request;
    return (object)array_merge([
      'database' => null,
      'table' => null,
      'offset' => 0,
      'orderby' => null,
    ], $request);
  }

  // Validate args
  function validateArgs() {
    $success = true;

    if(!validate($this->database)) $success = false;
    if(!validate($this->table)) $success = false;

    if(!$success) die('Args not accepted!');
  }

  // Config has database and table
  function configHasDatabaseTable() {
    $success = true;

    if(!isset($this->config[$this->database][$this->table])) {
      $success = false;
    }

    if(!empty($this->config[$this->database][$this->table]['hidden'])) {
      $success = false;
    }

    if(!$success) die('Datbase or table missing in config!');
  }

  // Get limit
  function getLimit() {
    if(isset($this->config_table['limit'])) {
      return $this->config_table['limit'];
    } else {
      return $this->limit;
    }
  }

  // Get columns
  function setColumns() {
    $query_columns = $this->queryColumns();

    $this->cols = [];

    foreach($query_columns as $i => $item) {
      $config_field = null;

      if(isset($this->config_table['columns'][$item['Field']])) {
        $config_field = $this->config_table['columns'][$item['Field']];
      }

      $this->all_cols[] = $item['Field'];

      if(!empty($config_field['hidden'])) continue;

      $this->cols[$item['Field']]['meta'] = $item;
      $this->cols[$item['Field']]['config'] = $config_field;
      $this->cols_order[] = $item['Field'];
    }
  }

  // Set rows
  function setRows() {
    $column_names = [];
    foreach($this->cols_order as $name) {
      // Skip passive
      if(!empty($this->cols[$name]['config']['passive'])) continue;
      $column_names[] = $name;
    }
    $data = $this->queryRows($column_names);

    foreach($data as $i => $item) {
      foreach($this->cols as $col) {
        $key = $col['meta']['Field'];

        $has_key = isset($item->{$key});
        $value = ($has_key) ? $item->{$key} : null;
        $this->rows[$i][$key] = $value;
      }
    }
  }

  function getTotal() {
    $column_names = [];
    foreach($this->cols_order as $name) {
      // Skip passive
      if(!empty($this->cols[$name]['config']['passive'])) continue;
      $column_names[] = $name;
    }
    $data = $this->queryTotal($column_names);

    return $data[0]['COUNT(*)'];
  }

  function orderByToString() {
    if(!$this->args->orderby) return '';
    $this->orderby = "ORDER BY " . implode(', ', $this->args->orderby);
  }

  function filter() {
    if(empty($this->args->filter)) return '';

    $sql = "WHERE ";
    $values = [];

    foreach($this->args->filter as $i => $item) {
      $parts = explode(" ", $item);
      if(!validate($parts[0])) die('Filter column not valid');

      $sql .= $parts[0] . " ";

      $param = ':value_' . $i;

      switch($parts[1]) {
        case 'contains':
          $sql .= "LIKE $param";
          break;
        case 'not_contains':
          $sql .= "NOT LIKE $param";
          break;
        case 'starts_with':
        case 'ends_with':
          $sql .= "LIKE $param";
          break;
        case 'equals':
          $sql .= "= $param";
          break;
        case 'not_equals':
          $sql .= "<> $param";
          break;
        case 'less_than':
          $sql .= "< $param";
          break;
        case 'larger_than':
          $sql .= "> $param";
          break;
        default:
          die('Filter type not valid');
      }

      $sql .= " AND ";

      $values[$i] = addcslashes($parts[2], '%');

      switch($parts[1]) {
        case 'contains':
        case 'not_contains':
          $values[$i] = '%' . $values[$i] . '%';
          break;
        case 'starts_with':
          $values[$i] = $values[$i] . '%';
          break;
        case 'ends_with':
          $values[$i] = '%' . $values[$i];
          break;
      }
    }

    $sql = substr($sql, 0, -4);

    return [
      'values' => $values,
      'sql' => $sql
    ];
  }

  // Query columns
  function queryColumns() {
    $sql = "SHOW FULL COLUMNS FROM " . $this->table;
    $db = new db();
    $db->connect($this->database);
    $db->sql($sql);
    $db->attr(PDO::FETCH_ASSOC);
    $db->query();
    return $db->results;
  }

  // Query rows
  function queryRows($visible_columns) {
    $filter_sql = (isset($this->filters['sql']) && !empty($this->filters['sql'])) ? $this->filters['sql'] : '';
    $filter_values = (isset($this->filters['values']) && !empty($this->filters['values'])) ? $this->filters['values'] : [];
    
    $sql = "
      SELECT " . implode(",", $visible_columns) . "
      FROM $this->table
      $filter_sql
      $this->orderby
      LIMIT $this->limit
      OFFSET $this->offset
    ";

    $db = new db();
    $db->connect($this->database);
    $db->sql($sql);
    $db->attr(PDO::FETCH_OBJ);
    $db->query($filter_values);

    return $db->results;
  }

  function queryTotal($visible_columns) {
    $filter_sql = (isset($this->filters['sql']) && !empty($this->filters['sql'])) ? $this->filters['sql'] : '';
    $filter_values = (isset($this->filters['values']) && !empty($this->filters['values'])) ? $this->filters['values'] : [];
    
    $sql = "
      SELECT COUNT(*)
      FROM $this->table
      $filter_sql
    ";

    $db = new db();
    $db->connect($this->database);
    $db->sql($sql);
    $db->attr(PDO::FETCH_ASSOC);
    $db->query($filter_values);

    return $db->results;
  }
}