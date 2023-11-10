<?php
include 'db.php';

$db = getDB();
$name = $_POST['name'];
$category = $_POST['category'];
// The 'checked' status is not necessary to provide when creating a new item, as it will default to 0 (unchecked)

$stmt = $db->prepare('INSERT INTO items (name, category) VALUES (:name, :category)');
$stmt->bindValue(':name', $name, SQLITE3_TEXT);
$stmt->bindValue(':category', $category, SQLITE3_TEXT);

if($stmt->execute()) {
    echo json_encode(['id' => $db->lastInsertRowID()]);
} else {
    echo json_encode(['error' => 'Could not add item']);
}
