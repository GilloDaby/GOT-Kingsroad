<?php
require_once __DIR__.'db.php';

header('Content-Type: application/json');

try {
    $db = getDbConnection();
    
    // Sécurité: Filtrer les paramètres GET
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    
    if ($category) {
        $stmt = $db->prepare("SELECT * FROM map_markers WHERE category = ?");
        $stmt->execute([$category]);
    } else {
        $stmt = $db->query("SELECT * FROM map_markers");
    }
    
    $markers = $stmt->fetchAll();
    
    // Formatage des données pour Leaflet
    $response = array_map(function($marker) {
        return [
            'id' => $marker['id'],
            'lat' => $marker['latitude'],
            'lng' => $marker['longitude'],
            'title' => $marker['title'],
            'description' => $marker['description'],
            'category' => $marker['category'],
            'icon' => $marker['icon']
        ];
    }, $markers);
    
    echo json_encode($response);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>