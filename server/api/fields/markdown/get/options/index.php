<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$root = __DIR__ . '/../../../../../..';

$options_array = json_decode(file_get_contents($root . '/options.json'), true);
$defaults_array = json_decode(file_get_contents($root . '/src/components/fields/markdown/defaults.json'), true);
$options = $defaults_array;

if(isset($options_array['fields']['markdown'])) {
  $options = array_replace_recursive ($defaults_array, $options_array['fields']['markdown']);
}

echo json_encode($options);