<?php
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/config.php';
require_once __DIR__.'/db.php';

session_start();

try {
    $client = new Google_Client();
    $client->setClientId(GOOGLE_CLIENT_ID);
    $client->setClientSecret(GOOGLE_CLIENT_SECRET);
    $client->setRedirectUri(GOOGLE_REDIRECT_URI);

    if (!isset($_GET['code'])) {
        throw new Exception('Code d\'autorisation manquant');
    }

    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    
    if (isset($token['error'])) {
        throw new Exception($token['error_description'] ?? 'Erreur Google: ' . $token['error']);
    }

    $client->setAccessToken($token);
    
    $oauth = new Google_Service_Oauth2($client);
    $user_info = $oauth->userinfo->get();
    
    // Préparation des données utilisateur
    $userData = [
        'id' => $user_info->id,
        'email' => $user_info->email,
        'name' => $user_info->name,
        'picture' => $user_info->picture
    ];
    
    // Sauvegarde en base de données
    $userId = saveOrUpdateUser('google', $userData);
    
    // Stockage en session
    $_SESSION['user'] = [
        'id' => $userId,
        'email' => $user_info->email,
        'name' => $user_info->name,
        'avatar' => $user_info->picture,
        'provider' => 'google'
    ];
    
    // Fermeture du popup et rafraîchissement de la page parente
    echo '<script>
        if (window.opener) {
            window.opener.postMessage({action: "googleAuthSuccess"}, "*");
            window.close();
        } else {
            window.location.href = "/";
        }
    </script>';
    exit();
} catch (Exception $e) {
    echo '<script>
        if (window.opener) {
            window.opener.postMessage({action: "googleAuthError", message: "'.addslashes($e->getMessage()).'"}, "*");
            window.close();
        } else {
            alert("Erreur: '.addslashes($e->getMessage()).'");
            window.location.href = "/";
        }
    </script>';
    exit();
}
?>