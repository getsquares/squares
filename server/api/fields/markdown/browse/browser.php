<?php
class FileBrowserServer {
  private $options = [];
  private $data = [];
  private $path = '';
  private $type = null;
  private $breadcrumbs = [];
  private $file = null;
  private $folder = null;
  private $extension = null;
  private $name = null;
  private $current = [];

  public function __construct($options, $data) {
    $this->options = $options;
    $this->data = $data;
    $this->trim();
    $this->path = $this->path();

    if(!file_exists($this->path)) {
      echo 'Path does not exists';
      return;
    }

    $this->type = $this->type();
  }

  // Trim
  private function trim() {
    $this->data['uri'] = str_replace('\\', '/', $this->data['uri']);
    $this->data['uri'] = trim($this->data['uri'], '/');
    $this->options['root'] = trim($this->options['root'], '/');
  }

  // Path
  private function path() {
    return $this->options['root'] . '/' . $this->data['uri'];
  }

  // Breadcrumbs
  private function breadcrumbs() {
    if(empty($this->data['uri'])) return;
    $exploded = explode('/', $this->data['uri']);
    return $exploded;
  }

  // Current
  private function current() {
    $current = [];

    if(is_file($this->path)) {
      $current = $this->currentFile();
    }

    $append = [
      'active' => $this->active(),
      'name' => $this->name(),
      'type' => $this->type(),
      'updated' => filemtime($this->path),
    ];
    
    $current = array_merge($current, $append);

    return $current;
  }

  // CurrentFile
  private function currentFile() {
    return [
      //'size' => $this->size($this->size),
      'file' => $this->file(),
      'name' => $this->name(),
      'extension' => $this->extension()
    ];
  }

  // Active
  private function active() {
    return isset($this->data['active']) ? $this->data['active'] : false;
  }

  // Type
  private function type() {
    return is_file($this->path) ? 'file' : 'folder';
  }

  // File
  private function file() {
    return pathinfo($this->path, PATHINFO_BASENAME);
  }

  // Name
  private function name() {
    return pathinfo($this->path, PATHINFO_FILENAME);
  }

  // Extension
  private function extension() {
    return pathinfo($this->path, PATHINFO_EXTENSION);
  }

  // Whitelist to brace
  private function whitelistToBrace() {
    $str = "{";
    $whitelist = !empty($this->data['whitelist']) ? $this->data['whitelist'] : ['*'];

    foreach($whitelist as $extension) {
      $str .= '*.' . strtolower($extension) . ',';
    };

    return substr($str, 0, -1) . '}';
  }

  // Size
  private function size($path) {
    $bytes = sprintf('%u', filesize($path));

    if ($bytes > 0) {
      $unit = intval(log($bytes, 1024));
      $units = array('bytes', 'kB', 'MB', 'GB');

      if(array_key_exists($unit, $units) === true) {
        return sprintf('%d %s', $bytes / pow(1024, $unit), $units[$unit]);
      }
    }

    return $bytes;
  }

  // Folders
  private function folders() {
    $collection = [];
    $path = is_file($this->path) ? dirname($this->path) : $this->path;
    $items = glob($path . '/*', GLOB_ONLYDIR);
    natsort($items);
    foreach($items as $item) {
      $collection[] = [
        'name' => basename($item),
        'updated' => filemtime($item),
      ];
    }
    return $collection;
  }

  // Files
  private function files() {
    $whitelist = $this->whitelistToBrace();
    $collection = [];

    $path = is_file($this->path) ? dirname($this->path) : $this->path;
    $items = glob($path . '/' . $whitelist, GLOB_BRACE);
    natsort($items);
    foreach($items as $item) {
      if(!is_file($item)) continue;
      $collection[] = [
        'name' => basename($item),
        'size' => $this->size($item),
        'updated' => filemtime($item),
      ];
    }
    return $collection;
  }

  // Get results
  public function getResults() {
    if(!$this->type) return;

    $results = [
      'breadcrumbs' => $this->breadcrumbs(),
      'current' => $this->current(),
      'folders' => $this->folders(),
      'files' => $this->files(),
    ];

    //print_r($results);

    echo json_encode($results);

    return $results;
  }
}