<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Votre code existant...
?>

<?php


if (!session_id()) @session_start();

spl_autoload_register("loadClass");

$api = new api();
$api->process(); // Process de l'appel API

/**
 * Fonction de chargement automatique des classes
 * @param string $class_name
 * @return boolean|Exception
 */
function loadClass(string $class_name) {
	if (!empty($class_name)) {
		$class_name .= ".class.php";
		if ( file_exists("assets/inc/".$class_name)) {
			require_once "assets/inc/".$class_name;
			return true;
		} elseif (file_exists("assets/inc/".strtolower($class_name))) {
			require_once "assets/inc/".strtolower($class_name);
			return true;
		} else {
			return new Exception("Class ".$class_name." not found.");
		}
	} else {
		return new Exception("Empty class not allowed.");
	}
}

 // Récupérer tous les marqueurs
$app->get('/markers', function() use($db) {
    $stmt = $db->query("SELECT * FROM map_markers");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
});

// Ajouter un marqueur
$app->post('/markers', function() use($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $db->prepare("INSERT INTO map_markers (latitude, longitude, title, description, category, icon) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data['lat'], $data['lng'], $data['title'], $data['description'], $data['category'], $data['icon']]);
    echo json_encode(['status' => 'success', 'id' => $db->lastInsertId()]);
});

?>