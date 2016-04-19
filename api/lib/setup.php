<?php
// Best to change in the php.ini but wanted to add here for now
ini_set('error_reporting', 'E_ALL & ~E_NOTICE');

date_default_timezone_set('America/Los_Angeles');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

function connect() {
	$db = new PDO('sqlite:iot.sqlite');
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, 'SET NAMES utf8');
	return $db;
}
