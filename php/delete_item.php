<?php
include 'db.php';

$db = getDB();
$id = $_POST['id'];

$stmt = $db->prepare('DELETE FROM items WHERE id = :id');
$stmt->bindValue(':id', $id, SQLITE3_INTEGER);

if($stmt->execute()) {
    echo json_encode(['success' => 'Item deleted']);
} else {
    echo json_encode(['error' => 'Could not delete item']);
}
