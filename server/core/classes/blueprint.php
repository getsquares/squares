<?php
class Blueprint {
  private $path;
  private $db_name;
  private $table_name;
  private $columns = [];
  private $hidden = 0;
  private $blueprint = [];
  private $fields = [];

  function __construct($db_name, $table_name, $columns) {
    $this->db_name = $db_name;
    $this->table_name = $table_name;

    $this->path = path(null, 'blueprints/' . $db_name . '/' . $table_name . '.json');

    $this->set($columns);
  }

  function set($columns) {
    $this->read();

    foreach($columns as $key => $column) {
      $data = $this->getData($key, $column);

      $this->appendHidden($data);

      $this->fields[] = [
        'key' => $key,
        'name' => $data['name'],
        'type' => $data['type'],
        'limit' => $data['limit'],
        'width' => $this->width($data),
        'default' => $this->default($data)
      ];
    }
  }

  function get() {
    return [
      'fields' => $this->fields,
      'order_by' => $this->orderby(),
      'hidden' => $this->hidden,
      'id' => $this->defaultId(),
      'limit' => $this->limit()
    ];
  }

  function orderby() {
    return (isset($this->blueprint['order_by'])) ? $this->blueprint['order_by'] : null;
  }

  function width($data) {
    if(!isset($data['width'])) return 300;
    return $data['width'];
  }

  function read() {
    if(!file_exists($this->path)) return;

    $this->blueprint = file_get_contents(path(null, 'blueprints/' . $this->db_name . '/' . $this->table_name . '.json'));
    $this->blueprint = json_decode($this->blueprint, true);
  }

  function getData($key, $column) {
    if(isset($this->blueprint['fields'][$key])) {
      $data = $this->blueprint['fields'][$key];
      $data['limit'] = (int)$column['limit'];
    } else {
      $data = [
        'name' => $key,
        'type' => 'text',
        'limit' => (int)$column['limit']
      ];
    }

    return $data;
  }

  function appendHidden($data) {
    if(!isset($data['hidden'])) return;
    if(!$data['hidden']) return;
    $this->hidden++;
  }

  function default($data) {
    return isset($data['default']) ? $data['default'] : '';
  }

  function defaultId() {
    return isset($this->blueprint['id']) ? $this->blueprint['id'] : 'id';
  }

  function limit() {
    return isset($this->blueprint['limit']) ? $this->blueprint['limit'] : 25;
  }
}

function blueprint($columns) {
  $blueprint_class = new Blueprint(get('db'), get('table'), $columns);
  return $blueprint_class->get();
}