<?php
class Option {
  private $options;

  public function __construct() {
    $this->options = file_get_contents(__DIR__ . '/../../../options.json');
    $this->options = json_decode($this->options, true);
  }

  public function get() {
    return $this->options;
  }

  public function isAllowedDb() {
    return isset($this->options['db'][get('db')]);
  }

  public function allowedDb() {
    if($this->isAllowedDb()) return;

    echo '[]';
    die;
  }

  public function isAllowedTable() {
    $whitelist = null;

    if(isset($this->options['db'][get('db')]['tables'])) {
      $whitelist = $this->options['db'][get('db')]['tables'];
    }

    return (!$whitelist || in_array(get('table'), $whitelist));
  }

  public function allowedTable() {
    if($this->isAllowedTable()) return;

    echo '[]';
    die;
  }

  public function allowed() {
    $this->allowedDb();
    $this->allowedTable();
  }

  public function isAllowed() {
    return ($this->isAllowedDb() && $this->isAllowedTable());
  }
}

class settings {
  // Load
  public function load() {
    return json_decode(file_get_contents(__DIR__ . '/../../../options.json'), true);
  }

  // Credentials
  public function credentials($db_name, $options) {
    $options['db'][$db_name]['name'] = $db_name;
    return $options['db'][$db_name];
  }
}