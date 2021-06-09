<?php
class db {
  public $config = null;
  public $attr = null;
  public $sql = null;
  public $pdo = null;

  function __construct() {
    $this->config = $this->load();
  }

  // Load config file
  function load() {
    $config = __DIR__ . '/../db.php';
    if(!file_exists($config)) die('Config file missing!');
    return require $config;
  }

  // Get config data
  function data($db_name) {
    $data = (object)$this->config[$db_name];

    foreach($data as $key => $item) {
      if($key == "password" && $item == "") continue;
      if(!validate($item)) die('DB config characters not allowed');
    }

    return $data;
  }

  function sql($sql) {
    $this->sql = $sql;
  }

  function attr($attr) {
    $this->attr = $attr;
  }

  function query($args = []) {
    $stmt = $this->pdo->prepare($this->sql);
    $stmt->execute($args);
    $this->results = $stmt->fetchAll($this->attr);
  }

  function q($args = []) {
    $stmt = $this->pdo->prepare($this->sql);
    return $stmt->execute($args);
  }

  // Connect to PDO
  function connect($db_name) {
    $data = $this->data($db_name);
    try {
      $pdo = new PDO(
        "mysql:host=$data->host;dbname=$db_name",
        $data->user,
        $data->password,
        [
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
        ]
      );
      $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
      );
      $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      $this->pdo = $pdo;
      return $pdo;
    } catch(PDOException $e) {
      header::error("Connection failed: " . $e->getMessage());
    }
  }
}
