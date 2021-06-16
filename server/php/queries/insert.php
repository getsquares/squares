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
$db = new db();
$db->connect($args->database);

foreach($data->updates as $item) {
  
  $col = $item->col;
  $row = $item->row;
  $content = $item->content;
  
  $db->sql("
    UPDATE $args->table
    SET $col = :content
    fdsfsd
    WHERE $id_col = :id
  ");
  $db->attr(PDO::FETCH_GROUP|PDO::FETCH_OBJ);
  $params = [
    "content" => $content,
    "$id_col" => $row
  ];
  $success = $db->q($params);

  $message_temp = $db->message != "" ? $db->message . "\n\n" : "";

  if(!$db->success) {
    $success = $db->success;
  }

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

  $messages = $message_temp . $db->message;

  if(!$db->success) {
    $success = $db->success;
  }

  $success = $success ? true : false;

  $out[] = [
    'success' => $success,
    'col' => $col,
    'row' => $row,
    'content' => $content,
    'content:after' => $db->results[0]->content,
    'match' => $content === $db->results[0]->content,
    'message' => $messages
  ];
}

echo json_encode($out);