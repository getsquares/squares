<?php
require __DIR__ . '/../methods/core.php';
require_once __DIR__ . '/../methods/data.php';

header::json();
session::validate();

global $request;
$request = $_GET;

$data_class = new Data();
$data_class->setColumns();
$data_class->setRows();

$results['meta'] = $data_class->meta();
$results['cols_all'] = $data_class->cols_all();
$results['cols_order'] = $data_class->cols_order();
$results['cols'] = $data_class->cols();
$results['rows'] = $data_class->rows();

$out = (object)$results;

// STÖD FÖR BÅDE POST OCH GET
// http://localhost/tools/squares/server/php/queries/data.php?database=test&table=a_table_with_a_really_long_name&orderby[]=success%20asc&orderby[]=id%20desc

echo json_encode($out);