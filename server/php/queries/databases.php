<?php
require_once __DIR__ . '/../methods/core.php';

header::json();
session::validate();

$config = new Config();

$databases = [];

foreach($config->data as $database => $collection) {
  if(!validate($database)) continue;
  $databases[] = $database;
}

echo json_encode($databases);