<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$root = __DIR__ . '/../../../../../..';

$options_data = file_get_contents($root . '/options.json');
$options = json_decode($options_data, true)['fields']['markdown'];


$path = urldecode($_GET['path']);
$filepath = $root . '/' . $options['media']['path'] . '/' . $path; // Fallback default
//http://localhost/squares/server/api/fields/markdown/get/image/?path=folder1%2Fsubfolder1%2F96449.jpg

switch(strtolower(pathinfo($path, PATHINFO_EXTENSION))) {
  case 'txt':
    header('Content-Type: text/plain');
    break;
  case 'gif':
    header('Content-Type: image/gif');
    break;
  case 'png':
    header('Content-Type: image/png');
    break;
  case 'svg':
    header('Content-Type: image/svg+xml');
    break;
  case 'jpg':
  case 'jpeg':
    header('Content-Type: image/jpeg');
    break;
}
if(file_exists($filepath)) {
  echo file_get_contents($filepath);
}