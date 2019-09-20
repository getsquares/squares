<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$root = __DIR__ . '/../../../../..';

include $root . '/server/core/index.php';
include __DIR__ . '/browser.php';

$data = json_decode(file_get_contents("php://input"), true);

$options_array = json_decode(file_get_contents($root . '/options.json'), true);
$defaults_array = json_decode(file_get_contents($root . '/src/components/fields/markdown/defaults.json'), true);
$options = $defaults_array;

if(isset($options_array['fields']['markdown'])) {
  $options = array_replace_recursive ($defaults_array, $options_array['fields']['markdown']);
}

$options = [
  'root' => $root . '/' . $options['media']['path']
];

$data = [
  'whitelist' => [
    "jpg", "jpeg", "png", "svg", "gif", "webp",
  ],
  'uri' => get('uri'),
];

$FileBrowserServer = new FileBrowserServer($options, $data);
$FileBrowserServer->getResults();