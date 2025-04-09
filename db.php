<?php
require_once __DIR__.'/config.php';

function getDbConnection() {
    static $db = null;
    
    if ($db === null) {
        try {
            $db = new PDO(
                "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::ATTR_PERSISTENT => false
                ]
            );
        } catch (PDOException $e) {
            error_log('['.date('Y-m-d H:i:s').'] DB Error: '.$e->getMessage());
            header('HTTP/1.1 503 Service Unavailable');
            die('Maintenance en cours. Veuillez réessayer ultérieurement.');
        }
    }
    
    return $db;
}

// Version optimisée de saveOrUpdateUser
function saveOrUpdateUser($provider, $userData) {
    $db = getDbConnection();
    
    $stmt = $db->prepare("INSERT INTO users 
        (provider, provider_id, email, name, avatar, last_login) 
        VALUES (?, ?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
        email = VALUES(email),
        name = VALUES(name),
        avatar = VALUES(avatar),
        last_login = NOW()");
    
    $stmt->execute([
        $provider,
        $userData['id'],
        $userData['email'],
        $userData['name'],
        $userData['picture']
    ]);
    
    // Enregistrement de la connexion
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $stmt = $db->prepare("INSERT INTO user_logins (user_id, ip_address) VALUES (?, ?)");
    $stmt->execute([$db->lastInsertId(), $ip]);
    
    return $db->lastInsertId();
}

// Nouvelle fonction pour les marqueurs
function getMapMarkers($filters = []) {
    $db = getDbConnection();
    $where = [];
    $params = [];
    
    if (!empty($filters['category'])) {
        $where[] = "category = ?";
        $params[] = $filters['category'];
    }
    
    $sql = "SELECT * FROM map_markers";
    if (!empty($where)) {
        $sql .= " WHERE " . implode(" AND ", $where);
    }
    $sql .= " LIMIT 500"; // Sécurité contre les requêtes trop larges
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    
    return $stmt->fetchAll();
}
?>