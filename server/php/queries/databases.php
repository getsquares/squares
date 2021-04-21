<?php
header('Content-Type: application/json');

// Session
require __DIR__ . '/../methods/methods.php';

$config = configAll();

if(!isset($config['databases']) || !is_array($config['databases'])) {
  header("HTTP/1.0 404 Not Found");
  die('Not valid args');
}

echo json_encode(array_keys($config['databases']));