<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$root = __DIR__ . '/../../../../../..';

include $root . '/server/core/index.php';

$options = settings::load();
$credentials = settings::credentials(get('db'), $options);
$db = database::connect($credentials);

$defaults_array = json_decode(file_get_contents($root . '/src/components/fields/markdown/defaults.json'), true);
$markdown_options = $defaults_array;

if(isset($options['fields']['markdown'])) {
  $markdown_options = array_replace_recursive ($defaults_array, $options['fields']['markdown']);
}

$sql_rows = "SELECT * FROM " . get('table');
$columns = database::columns($db, get('table'));
$rows = database::rows($db, $sql_rows);

foreach($columns as $key => $item) {
  $col_keys[] = '{{' . $key . '}}';
}

foreach($rows as $row) {
  foreach($row['items'] as $key => $col) {
    $presentations[] = $col['presentation'];
  }
  $str = str_replace($col_keys, $presentations, $markdown_options['rows']['template']);

  $results[$row['row']] = $str;
  $presentations = [];
}

echo json_encode($results);