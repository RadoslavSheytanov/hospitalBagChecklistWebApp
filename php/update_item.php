<?php
include 'db.php';

$db = getDB();
$id = $_POST['id'];
$checked = $_POST['checked']; // Expect 0 or 1

$stmt = $db->prepare('UPDATE items SET checked = :checked WHERE id = :id');
$stmt->bindValue(':checked', $checked, SQLITE3_INTEGER);
$stmt->bindValue(':id', $id, SQLITE3_INTEGER);

if($stmt->execute()) {
    echo json_encode(['success' => 'Item updated']);
} else {
    echo json_encode(['error' => 'Could not update item']);
}
