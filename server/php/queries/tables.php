<?php
header('Content-Type: application/json');

// Session
require __DIR__ . '/../methods/methods.php';

$args = $_GET;

if(!isset($args['db'])) {
  header("HTTP/1.0 404 Not Found");
  die('Not valid args');
}

if(!config($args['db'])) {
  header("HTTP/1.0 404 Not Found");
  die('databasfel');
} else {
  $config = config($args['db']);
  print_r($config);
}

$pdo = connect($args['db']);

print_r(array_keys($config));

$sql = "
SELECT schema_name
FROM information_schema.schemata
  WHERE schema_name IN ('" . implode("', '" , array_keys($config)) . "')
";

echo $sql;

$stmt = $pdo->prepare($sql);
//$stmt->bindValue(':offset', $args['offset'], PDO::PARAM_INT);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_GROUP|PDO::FETCH_ASSOC);

print_r($results);
//echo json_encode($results);