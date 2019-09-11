<?php
header("Access-Control-Allow-Origin: *");

$post = [
  'db' => 'presenth_pollenbutiken',
  'table' => 'cms_pages',
  'column' => 'meta_title',
  'id' => 59,
  'value' => 'Saved data'
];

$id = 'id';

include __DIR__ . '/../../../../../server/core/index.php';

$post = post();

$options = settings::load();
$credentials = settings::credentials($post['db'], $options);
$db = database::connect($credentials);

$sql_update = sprintf("UPDATE %s SET %s = :value WHERE %s = %d", $post['table'], $post['column'], $id, $post['id']);
$sql_validate = sprintf("SELECT * FROM %s WHERE %s = %d", $post['table'], $id, $post['id']);

database::update($db, $sql_update, $post['value']);
database::validate($db, $sql_validate, $post['column'], $post['value']);

header("HTTP/1.0 404 Not Found");