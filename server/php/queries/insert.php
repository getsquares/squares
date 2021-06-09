<?php
require __DIR__ . '/../methods/core.php';

header::json();
session::validate();

$config_class = new Config();
$config = $config_class->data;

$args = (object)array_merge(['database' => null], $_GET);

$id_col = null;

foreach($config[$args->database][$args->table]['columns'] as $key => $item) {
  if(!isset($item['id'])) continue;
  $id_col = $key;
}

if(!validate($args->database))
  header::error('No database');
if(!isset($config[$args->database]))
  header::error('No database match in config');
if(!is_array($config[$args->database]))
  header::error('Tables are not an array');


$raw = file_get_contents("php://input");
$data = json_decode($raw);

$out = [];

foreach($data->updates as $item) {
  $db = new db();
  $col = $item->col;
  $row = $item->row;
  $content = $item->content;

  $db->connect($args->database);
  $db->sql("
    UPDATE $args->table
    SET $col = :content
    WHERE $id_col = :id
  ");
  $db->attr(PDO::FETCH_GROUP|PDO::FETCH_OBJ);
  $params = [
    "content" => $content,
    "$id_col" => $row
  ];
  $success = $db->q($params);

  $db->sql("
    SELECT $col AS content
    FROM $args->table
    WHERE $id_col = :id
  ");

  $params = [
    "$id_col" => $row
  ];

  $db->attr(PDO::FETCH_OBJ);

  $db->query($params);

  //var_dump($db->results);

  // Hämta värdet med select
  // Kolla diff

  $out[] = [
    'success' => $success,
    'col' => $col,
    'row' => $row,
    'content' => $content,
    'content:after' => $db->results[0]->content,
    'match' => $content === $db->results[0]->content
  ];
}

echo json_encode($out);