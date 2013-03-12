<?php

require_once("config.php");

require_once("phpFlickr/phpFlickr.php");

$f = new phpFlickr($flickrKey);
$photos = $f->photos_search(array("text"=>$_GET['query'],"license"=>"1,2,3,4,5,6","extras"=>"owner_name","per_page"=>100));
header('Content-type: application/json');
echo json_encode($photos);




?>
