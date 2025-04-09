<<<<<<< HEAD
<?php
require 'config.php';
try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    echo "Connexion DB réussie!";
} catch (PDOException $e) {
    die("Erreur DB: " . $e->getMessage());
}
=======
<?php
require 'config.php';
try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    echo "Connexion DB réussie!";
} catch (PDOException $e) {
    die("Erreur DB: " . $e->getMessage());
}
>>>>>>> 370412e90a0bf4fcde37b45a7d90cb5f096c75df
?>