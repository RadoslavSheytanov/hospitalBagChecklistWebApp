<?php
function getDB() {
    $db = new SQLite3(__DIR__.'/../database/checklist.db');
    return $db;
}
