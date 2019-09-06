<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

include __DIR__ . '/../../../../server/core/index.php';

// Option
$option = new Option();
#$option->allowed();


// Db
$db = new DB(get('db'), $option->get());

// Load id from blueprint option
$id = 'id';

$sql = "
  SELECT * FROM " . get('table') . "
  WHERE $id = " . get('id') . "
";

echo $db->value($sql, get('column'));