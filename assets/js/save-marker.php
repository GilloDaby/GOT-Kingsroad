<?php
require_once __DIR__.'config.php';
require_once __DIR__.'db.php';

header('Content-Type: application/json');

// Liste des catégories autorisées
$allowedCategories = [
    'castle', 'tower', 'altarofmemories', 'signpost', 'sidequest', 
    'historicsite', 'occupiedsite', 'bountie', 'banditcamp', 
    'enemyhideout', 'gerociousbeast', 'echoesofthepast', 
    'godhaven', 'lostletter', 'citymysteries'
];

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validation
    if (!in_array($data['category'], $allowedCategories)) {
        throw new Exception('Catégorie non autorisée');
    }
    
    $stmt = getDbConnection()->prepare("
        INSERT INTO map_markers 
        (latitude, longitude, title, description, category, icon) 
        VALUES (:lat, :lng, :title, :desc, :cat, :icon)
        ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        description = VALUES(description)
    ");
    
    $stmt->execute([
        ':lat' => $data['latitude'],
        ':lng' => $data['longitude'],
        ':title' => $data['title'],
        ':desc' => $data['description'],
        ':cat' => $data['category'],
        ':icon' => $data['icon']
    ]);
    
    echo json_encode([
        'success' => true,
        'id' => getDbConnection()->lastInsertId(),
        'category' => $data['category']
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}