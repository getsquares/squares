<?php
$root = __DIR__ . '/../../../../..';

include $root . '/core/index.php';

$options_array = json_decode(file_get_contents($root . '/../options.json'), true);
$defaults_array = json_decode(file_get_contents($root . '/../src/components/fields/markdown/defaults.json'), true);
$options = $defaults_array;

if(!$options['revisions']) {
  header("HTTP/1.0 404 Not Found");
  die;
}

$post = post();

include $root . '/core/classes/php-file-revisions.php';

$path = $options['revisions']['path'];
$limit = $options['revisions']['limit'];

$fullpath = $root . '/' . $path;
$folder = $post['db'] . '/' . $post['table']  . '/' . $post['id'] . '/' . $post['column'];

if(!file_exists($fullpath)) {
  mkdir($fullpath, 0644, true);
}

$revision = new PhpFileRevisions([
  'limit' => 5,
  'root' => $fullpath,
  'template' => '{{id}}.md'
]);

$revision->folder($folder);
$revision->write($post['value']);

$files = scandir($fullpath . '/' . $folder);
$num_files = count($files)-2;

echo $num_files;