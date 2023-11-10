<?php
include 'db.php';

$db = getDB();
$results = $db->query('SELECT * FROM items');

$items = [];
while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    $items[] = $row;
}

header('Content-Type: application/json');
echo json_encode($items);
