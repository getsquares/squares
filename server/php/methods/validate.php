<?php
function validate($str) {
  $regex = "/^[0-9a-zA-Z_]+$/i";
  return preg_match($regex, $str);
}