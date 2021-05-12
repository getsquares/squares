<?php
print_r($_POST);

$raw = file_get_contents("php://input");
$data = json_decode($raw);

foreach($data->ids as $id) {
  $sql = "";
}

print_r($_GET);

//return failade ids och success failed
/*
{
  success: false,
  failed_ids: [1,4,2]
}
*/