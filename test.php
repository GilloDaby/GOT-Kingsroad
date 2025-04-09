<?php
require 'config.php';
try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    echo "Connexion DB réussie!";
} catch (PDOException $e) {
    die("Erreur DB: " . $e->getMessage());
}
?>