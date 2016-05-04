<?php
require('./lib/setup.php');

$timeStamp = date('o-m-d H:i:s');
$state = $_GET['state'];
$area = $_GET['area'];
$action = $_GET['action'];
$id = $_GET['id'];
$date = $_GET['date'];
$dateRange = $_GET['dateRange'];

// Create (connect to) SQLite database in file
$db = connect();

$db->exec("CREATE TABLE IF NOT EXISTS door (id INTEGER PRIMARY KEY AUTOINCREMENT, area TEXT, state TEXT, timeStamp DATETIME DEFAULT CURRENT_TIMESTAMP)");

function showRows($db, $limit = 10) {
	$rows = array();
	$sql = "SELECT * from door ORDER BY id DESC LIMIT $limit";
	foreach ($db->query($sql, PDO::FETCH_ASSOC) as $row) {
		$rows[] = $row;
	}
	return json_encode($rows);
}

if($action === 'get') {
	echo showRows($db);
}

if($action === 'delete' && !empty($id)) {
	$sql = "DELETE FROM door WHERE id = :id";
	$store = $db->prepare($sql);
	$store->execute(array(':id' => $id));
	echo showRows($db);
}

if(!empty($state) && !empty($area)) {
	$store_sql = "INSERT INTO door (area, state, timeStamp) VALUES (:area, :state, :timeStamp)";
	$store = $db->prepare($store_sql);
	$store->execute(array(
		':area' => $area,
		':state' => $state,
		':timeStamp' => $timeStamp
	));
	echo 'done';
}
