<?php
class config {  
  public $data = null;
  public $path = __DIR__ . '/../../../config.yaml';

  function __construct() {
    require_once __DIR__ . '/../libs/Spyc.php';
    $this->load();
  }

  function load() {
    $this->validateUrl();
    $this->loadYaml();
    $this->validateContent();
  }

  function validateUrl() {
    if(!file_exists($this->path)) die('Config file missing!');
  }

  function loadYaml() {
    $this->data = Spyc::YAMLLoad($this->path);
  }

  function validateContent() {
    if(!isset($this->data)) die('Yaml not valid!');
    if(!is_array($this->data)) die('Config not an array!');
  }

  function get() {
    return $this->data;
  }
}