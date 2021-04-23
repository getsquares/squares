<?php
class header {
  static function error($die = false) {
    header("HTTP/1.0 404 Not Found");
    if($die) {
      die($die);
    }
  }
  
  static function json() {
    header('Content-Type: application/json');
  }
}