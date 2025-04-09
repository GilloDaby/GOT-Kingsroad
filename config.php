<<<<<<< HEAD
<?php
session_start();

// Configuration Google
define('GOOGLE_CLIENT_ID', '234180032961-qa7sg6nvl1kfqd8ot45sr3ukrgm59b4g.apps.googleusercontent.com'); // Raccourci pour l'exemple
define('GOOGLE_CLIENT_SECRET', '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');
define('GOOGLE_REDIRECT_URI', 'https://got-kingsroad.com/google-auth-callback.php');

// Configuration Discord
define('DISCORD_CLIENT_ID', '1359206763785752807');
define('DISCORD_CLIENT_SECRET', 'LC4qHHKlBBGdd2F2opySDDsG4WjU_itl');
define('DISCORD_REDIRECT_URI', 'https://got-kingsroad.com/discord-auth-callback.php');

// Autres configurations
define('BASE_URL', 'https://got-kingsroad.com');

// Configuration DataBase
define('DB_HOST', 'localhost');
define('DB_NAME', 'gotkings_dbkingsroad');
define('DB_USER', 'gotkings_gillodaby');
define('DB_PASS', 'VhyX5pTuL77$5fd5Bt9&');

// Connexion à la base de données
try {
    $db = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4", 
        DB_USER, 
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch(PDOException $e) {
    // En production, ne pas afficher le message d'erreur complet
    error_log("Erreur DB: " . $e->getMessage());
    die("Erreur de connexion à la base de données");
}

// Empêcher l'accès direct
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    header('HTTP/1.0 403 Forbidden');
    exit('Accès interdit');
}
=======
<?php
session_start();

// Configuration Google
define('GOOGLE_CLIENT_ID', '234180032961-qa7sg6nvl1kfqd8ot45sr3ukrgm59b4g.apps.googleusercontent.com'); // Raccourci pour l'exemple
define('GOOGLE_CLIENT_SECRET', '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');
define('GOOGLE_REDIRECT_URI', 'https://got-kingsroad.com/google-auth-callback.php');

// Configuration Discord
define('DISCORD_CLIENT_ID', '1359206763785752807');
define('DISCORD_CLIENT_SECRET', 'LC4qHHKlBBGdd2F2opySDDsG4WjU_itl');
define('DISCORD_REDIRECT_URI', 'https://got-kingsroad.com/discord-auth-callback.php');

// Autres configurations
define('BASE_URL', 'https://got-kingsroad.com');

// Configuration DataBase
define('DB_HOST', 'localhost');
define('DB_NAME', 'gotkings_dbkingsroad');
define('DB_USER', 'gotkings_gillodaby');
define('DB_PASS', 'VhyX5pTuL77$5fd5Bt9&');

// Connexion à la base de données
try {
    $db = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4", 
        DB_USER, 
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch(PDOException $e) {
    // En production, ne pas afficher le message d'erreur complet
    error_log("Erreur DB: " . $e->getMessage());
    die("Erreur de connexion à la base de données");
}

// Empêcher l'accès direct
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    header('HTTP/1.0 403 Forbidden');
    exit('Accès interdit');
}
>>>>>>> 370412e90a0bf4fcde37b45a7d90cb5f096c75df
?>