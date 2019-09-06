<?php
class Paging {
  private $limit;
  private $page;
  private $pages;
  private $offset;
  private $count;

  public function __construct($page, $blueprint, $count) {
    $this->count = $count;
    $this->setLimit($blueprint);
    $this->setPage($page);
    $this->setPages();
    $this->setOffset();
  }

  private function setPage($page) {
    $this->page = (isset($page)) ? (int)$page : 1;
  }

  private function setLimit($blueprint) {
    $this->limit = $blueprint['limit'];
  }

  private function setOffset() {
    if($this->page > 1) {
      $this->offset = ($this->page-1) * $this->limit;
    } else {
      $this->offset = 0;
    }    
  }

  private function setPages() {
    $this->pages = ceil($this->count / $this->limit);
  }

  public function get() {
    return [
      'limit' => $this->limit,
      'page' => $this->page,
      'offset' => $this->offset,
      'pages' => $this->pages
    ];
  }
}

function paging($blueprint, $count) {
  $paging_class = new Paging(get('page'), $blueprint, $count);
  return $paging_class->get();
}