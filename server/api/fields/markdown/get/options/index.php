<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$root = __DIR__ . '/../../../../../..';

$options_data = file_get_contents($root . '/options.json');
$options = json_decode($options_data, true)['fields']['markdown'];

echo json_encode($options);