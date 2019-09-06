<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

include __DIR__ . '/../../../../../server/core/index.php';
include __DIR__ . '/browser.php';

$data = json_decode(file_get_contents("php://input"), true);
$root = __DIR__ . '/../../../../../';

$options_data = file_get_contents($root . 'options.json');
$options = json_decode($options_data, true)['fields']['markdown'];


$options = [
  'root' => $root . $options['media']['path']
];

$data = [
  'whitelist' => [
    "jpg", "jpeg", "png", "svg", "gif", "webp",
  ],
  'uri' => get('uri'),
];

$FileBrowserServer = new FileBrowserServer($options, $data);
$FileBrowserServer->getResults();