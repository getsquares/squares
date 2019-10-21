<?php
include __DIR__ . '/lib/revisions.php';

// In
// folder?
// content

$revision = new PhpFileRevisions([
  'limit' => 5,
  'root' => __DIR__ . '/revisions',
  'template' => 'my-file-{{id}}.md'
]);

$revision->folder('my/unique/file');
$revision->write('This is my content');