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
    $this->validateArgs();
    $this->orderByToString();

    // Config
    $config_class = new Config();
    $this->config = $config_class->data;
    $this->configHasDatabaseTable();
    $this->config_table = $this->config[$this->database][$this->table];

    $this->limit = $this->getLimit();
    $this->cols = [];
    $this->cols_order = [];
    $this->rows = [];
  }

  function rows() {
    return $this->rows;
  }

  function cols() {
    return $this->cols;
  }

  function cols_order() {
    return $this->cols_order;
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

  function orderByToString() {
    if(!$this->args->orderby) return '';
    $this->orderby = "ORDER BY " . implode(', ', $this->args->orderby);
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
    $sql = "
      SELECT " . implode(",", $visible_columns) . "
      FROM $this->table
      $this->orderby
      LIMIT $this->limit
      OFFSET $this->offset
    ";

    $db = new db();
    $db->connect($this->database);
    $db->sql($sql);
    $db->attr(PDO::FETCH_OBJ);
    $db->query();

    return $db->results;
  }
}