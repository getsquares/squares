<?php
require __DIR__ . '/../methods/core.php';

header::json();
session::validate();

$config_class = new Config();
$config = $config_class->data;

$args = (object)array_merge(['database' => null, 'table' => null], $_GET);

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
    header::error('Hidden column');
  }
}
if(!isset($config[$args->database][$args->table]['id']))
  header::error('ID is missing');

$db = new db();
$db->connect($args->database);
$db->sql("SHOW FULL COLUMNS FROM " . $args->table);
$db->attr(PDO::FETCH_OBJ);
$db->query();

$column_data = [];

print_r($config);

$match_ids = false;
foreach($db->results as $i => $item) {
  // Hide if hidden column
  if(!empty($config[$args->database][$args->table]['columns'][$item->Field]['hidden'])) {
    continue;
  }

  $column_data[$i] = $item;

  // Add prefered ID to column data
  $id = $config[$args->database][$args->table]['id'];
  if($id == $item->Field) {
    $column_data[$i]->ID = true;
    $match_ids = true;
  }
}

if(!$match_ids)
  header::error('ID does not match table');

$results['columns'] = $column_data;
$out = (object)$results;

print_r((object)$out);
/*
ARGS
offset från GET

rows values
  Ladda in alla fält om inte autoload: false
  Limit från options
  Offset från get


columns: [
  [
    id: {}
  ]
]
rows: [
  [
    id: 12
    slug: whatever
    title: yeah
  ],
  [
    id: 13
    slug: anoter row
    title: hello
  ]
]
*/