<?php
function path($predefined = null, $uri = '') {
  $root = ($predefined) ? $predefined : __DIR__ . '/../../..';
  return $uri == '' ? $root : $root . '/' . $uri;
}

// rfiles
function rfiles($path, $type = null, $regex = null) {
  if(!is_dir($path)) return;
  $items = [];
  $directory = new RecursiveDirectoryIterator($path);
  $child_first = RecursiveIteratorIterator::CHILD_FIRST;
  $iterator = new RecursiveIteratorIterator($directory, $child_first);
  $iterator->setFlags(RecursiveDirectoryIterator::SKIP_DOTS);
  if($regex) {
    $iterator = new RegexIterator($iterator, $regex);
  }
  foreach($iterator as $item) {
    switch($type) {
      case 'files':
        if(!$item->isDir()) {
          $items[] = $item->getPathname();
        }
        break;
      case 'folders':
        if($item->isDir()) {
          $items[] = $item->getPathname();
        }
        break;
      default:
        $items[] = $item->getPathname();
    }
  }
  return $items;
}

function url($uri = '') {
  return $uri == '' ? option('url') : option('url') . '/' . $uri;
}

function get($key = null) {
  if(post($key)) return post($key);
  
  $data = null;

  if(isset($_GET)) {
    $data = $_GET;
  }

  if(!$data) return;
  if(!$key) return $data;
  if(!isset($data[$key])) return;
  
  return $data[$key];
}

function post($key = null) {
  $data = json_decode(file_get_contents("php://input"), true);
  if(!isset($data[$key])) return $data;

  return $data[$key];
}