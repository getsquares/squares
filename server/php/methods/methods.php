<?php
function fields($table, $config) {
  $columns = array_keys($config[$table]['fields']);
  $sanitized_columns = [];

  foreach($columns as $column) {
    if(!validate($column)) continue;
    $sanitized_columns[] = $column;
  }
  return $sanitized_columns;
}

function select_args($args) {
  if(!validate($args['db'])) return;
  if(!validate($args['table'])) return;
  
  return [
    'db' => $args['db'],
    'table' => $args['table'],
    'offset' => $args['offset']
  ];
}