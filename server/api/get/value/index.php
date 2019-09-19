<?php
/*
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
*/
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
$stmt = $db->conn->prepare($sql);
$stmt->execute();
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

$value = $row[0][get('column')];

$sql = "
SHOW columns FROM " . get('table');
$stmt = $db->conn->prepare($sql);
$stmt->execute();
$column_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

$length = 0;

foreach($column_data as $item) {
  if($item['Field'] != get('column')) continue;

  preg_match('/\d+/', $item['Type'], $len);
  $length = (int)$len[0];
}

$options_data = file_get_contents(__DIR__ . '/../../../../options.json');
$options = json_decode($options_data, true)['fields']['markdown'];

$data = [
  'value' => $value,
  'length' => $length,
  'options' => $options
];
echo json_encode($data);