<?php
header("Access-Control-Allow-Origin: *");

$root = __DIR__ . '/../../../../../..';

$options_array = json_decode(file_get_contents($root . '/options.json'), true);
$defaults_array = json_decode(file_get_contents($root . '/src/components/fields/markdown/defaults.json'), true);
$options = $defaults_array;

if(isset($options_array['fields']['markdown'])) {
  $options = array_replace_recursive ($defaults_array, $options_array['fields']['markdown']);
}

function get_data($url) {
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}


if(isset($options['css'])) {
  header("Content-type: text/css; charset: UTF-8");
  echo get_data($options['css']);
}