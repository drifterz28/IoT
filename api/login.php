<?php
require('./lib/setup.php');

$path = substr($_SERVER['PATH_INFO'], 1);

switch($path) {
	case 'signin':
		echo "siginin";
		break;
	case 'check':
		echo 'Check';
		break;
	default:
		echo 'Hello, I am up and running. Thanks for checking.';
}

function guid() {
	mt_srand((double) microtime() * 10000);
	$charid = strtoupper(md5(uniqid(rand(), true)));
	$hyphen = chr(45);
	$uuid = substr($charid, 0, 8).$hyphen
			.substr($charid, 8, 4).$hyphen
			.substr($charid,12, 4).$hyphen
			.substr($charid,16, 4).$hyphen
			.substr($charid,20,12);
	return $uuid;
}
