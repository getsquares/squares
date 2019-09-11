<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$root = __DIR__ . '/../../../../..';

include $root . '/server/core/index.php';
include __DIR__ . '/browser.php';

$data = json_decode(file_get_contents("php://input"), true);

$options_data = file_get_contents($root . '/options.json');
$options = json_decode($options_data, true)['fields']['markdown'];


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