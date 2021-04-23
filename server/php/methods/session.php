<?php
class SessionClass {
  function isLoggedIn() {
    return true;
  }
}

class session {
  static function validate() {
    $session = new SessionClass();
    if(!$session->isLoggedIn()) die('Not logged in!');
  }
}