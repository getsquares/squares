<?php
require __DIR__ . '/../methods/core.php';

header::json();
session::validate();

$config_class = new Config();
$config = $config_class->data;

$args = (object)array_merge(['database' => null, 'table' => null, 'offset' => 0], $_GET);

if(!validate($args->database))
  header::error('No database');
if(!isset($config[$args->database]))
  header::error('No database match in config');
if(!is_array($config[$args->database]))
  header::error('Tables are not an array');
if(!isset($config[$args->database][$args->table]))
  header::error('Table does not exist');
if(isset($config[$args->database][$args->table]['hidden'])) {
  if($config[$args->database][$args->table]['hidden']) {
    header::error('Hidden table');
  }
}
if(!isset($config[$args->database][$args->table]['id']))
  header::error('ID is missing');

$limit = 100;
if(isset($config[$args->database][$args->table]['limit'])) {
  $limit = $config[$args->database][$args->table]['limit'];
}

## COLUMNS

$sql = "SHOW FULL COLUMNS FROM " . $args->table;
$db = new db();
$db->connect($args->database);
$db->sql($sql);
$db->attr(PDO::FETCH_ASSOC);
$db->query();

$column_data = [];
$column_fields = [];
$match_ids = false;
foreach($db->results as $i => $item) {
  // Hide if hidden column
  if(!empty($config[$args->database][$args->table]['columns'][$item['Field']]['hidden'])) {
    continue;
  }

  $column_data[$item['Field']] = $item;

  // Add prefered ID to column data
  $id = $config[$args->database][$args->table]['id'];
  if($id == $item['Field']) {
    $column_data[$item['Field']]['ID'] = true;
    $match_ids = true;
  }

  $passive = !empty($config[$args->database][$args->table]['columns'][$item['Field']]['passive']);

  if($passive) {
    $column_data[$item['Field']]['PASSIVE'] = true;
  } else {
    $column_fields[$item['Field']] = $item['Field'];
  }
}

if(!$match_ids)
  header::error('ID does not match table');

$results['columns'] = array_values($column_data);

## FIELDS

$sql = "
  SELECT " . implode(",", $column_fields) . " FROM " . $args->table . " LIMIT $limit OFFSET " . $args->offset;

$db = new db();
$db->connect($args->database);
$db->sql($sql);
$db->attr(PDO::FETCH_OBJ);
$db->query();

foreach($db->results as $i => $item) {
  foreach($column_data as $column => $col) {
    $value = isset($item->{$column}) ? $item->{$column} : null;
    $results['data'][$i][$column] = $value;
  }
}

$out = (object)$results;

echo json_encode($out);

// Få in kolumn data i varje kolumn från options