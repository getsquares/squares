<?php
require __DIR__ . '/../methods/core.php';

header::json();
session::validate();

$config_class = new Config();
$config = $config_class->data;

$args = (object)array_merge(['database' => null], $_GET);

if(!validate($args->database))
  header::error('No database');
if(!isset($config[$args->database]))
  header::error('No database match in config');
if(!is_array($config[$args->database]))
  header::error('Tables are not an array');

$hidden_tables = [];

foreach($config[$args->database] as $name => $table) {
  if(!empty($table['hidden'])) {
    $hidden_tables[] = $name;
  }
}

$db = new db();
$db->connect($args->database);
$db->sql("SHOW TABLES FROM " . $args->database);
$db->attr(PDO::FETCH_GROUP|PDO::FETCH_OBJ);
$db->query();

$db_tables = array_keys($db->results);
$out = array_diff($db_tables, $hidden_tables);

echo json_encode(array_values($out));