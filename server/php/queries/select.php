<?php
header('Content-Type: application/json');

// Session
require __DIR__ . '/../methods/methods.php';

$args = select_args($_GET);

if(!$args) {
  header("HTTP/1.0 404 Not Found");
  die('Not valid args');
}

if(!config($args['db'])) {
  header("HTTP/1.0 404 Not Found");
  die('databasfel');
} else {
  $config = config($args['db']);
  $fields = fields($args['table'], $config);
}

$pdo = connect($args['db']);

$sql = "
  SELECT " . implode(',', $fields) . "
  FROM " . $args['table'] . "
  LIMIT 100
  OFFSET :offset
";

$stmt = $pdo->prepare($sql);
$stmt->bindValue(':offset', $args['offset'], PDO::PARAM_INT);
$stmt->execute();
$results = $stmt->fetchAll();

echo json_encode($results);