<?php
class PhpFileRevisions {
  private $content = '';
  private $dirpath = '';
  private $filename = '';
  private $filepath = '';
  private $files = [];
  private $folder = '';
  private $options = [];
  private $rest = [];

  // PUBLIC
  public function __construct($options = []) {
    $this->options = $this->options($options);
  }

  public function folder($folder) {
    $this->folder = trim($folder, '/');
  }

  public function override($key, $value) {
    if(!isset($this->options[$key])) return;
    $this->options[$key] = $value;
  }

  public function write($content = '') {
    $this->content = $content;
    $this->dirpath = $this->dirpath();
    $this->filename = $this->filename();
    $this->filepath = $this->filepath();

    $this->addFolder();

    $this->files = $this->getFiles();
    $this->rest = $this->rest();

    if($this->isSameContent()) return;

    $this->deleteRest();
    $this->addFile($content);
  }

  // PRIVATE
  private function defaults() {
    return [
      'root' => __DIR__ . '/../revisions',
      'limit' => 10,
      'template' => '{{id}}'
    ];
  }

  private function isSameContent() {
    if(empty($this->files)) return;
    
    $last = $this->files[0];

    return file_get_contents($last) == $this->content;
  }

  private function options($options) {
    return array_merge($this->defaults(), $options);
  }

  private function filename() {
    return str_replace('{{id}}', $this->milliseconds(), $this->options['template']);
  }

  private function dirpath() {
    return trim($this->options['root'] . '/' . $this->folder, '/');
  }

  private function filepath() {    
    return $this->dirpath . '/' . $this->filename;
  }

  private function milliseconds() {
    $mt = explode(' ', microtime());
    return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
  }

  // ACTIONS
  private function addFolder() {
    if(!file_exists($this->dirpath)) {
      $mkdir = mkdir($this->dirpath, 0644, true);
      if(!$mkdir) {
        throw new Exception('Could not add new folder');
      }
    }
  }

  private function getFiles() {
    $files = array_filter(glob($this->dirpath . "/*"), 'is_file');
    $files = array_values($files);

    usort($files, function($a, $b) {
      return strcmp($b, $a);
    });
    return $files;    
  }

  private function rest() {
    return array_slice($this->files, $this->options['limit'] - 1);
  }

  private function deleteRest() {
    foreach($this->rest as $file) {
      if(file_exists($file)) {
        $deleted = unlink($file);
        if(!$deleted) {
          throw new Exception('Rest could not be deleted');
        }
      }
    }
  }

  private function addFile() {
    $content = file_put_contents($this->filepath, $this->content);

    if($content === false) {
      throw new Exception('Content could not be created');
    }
  }
}