<?php
function connect($db) {
  $db_class = require __DIR__ . '/../db.php';
  $data = (object)$db_class[$db];
  try {
    $pdo = new PDO(
      "mysql:host=$data->host;dbname=$db",
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
    return $pdo;
  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }
}

function config($db_name) {
  $config = require __DIR__ . '/../config.php';
  if(!isset($config['databases'][$db_name])) return;

  return $config['databases'][$db_name];
}

function configAll() {
  $config = require __DIR__ . '/../config.php';
  if(!isset($config)) return;

  return $config;
}

function fields($table, $config) {
  $columns = array_keys($config[$table]['fields']);
  $sanitized_columns = [];

  foreach($columns as $column) {
    if(!validate($column)) continue;
    $sanitized_columns[] = $column;
  }
  return $sanitized_columns;
}

function validate($str) {
  $regex = "/^[0-9a-zA-Z_]+$/i";
  return preg_match($regex, $str);
}

function select_args($args) {
  if(!validate($args['db'])) return;
  if(!validate($args['table'])) return;
  
  return [
    'db' => $args['db'],
    'table' => $args['table'],
    'offset' => $args['offset']
  ];
}