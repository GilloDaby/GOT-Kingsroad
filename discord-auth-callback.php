<<<<<<< HEAD
<?php
require_once __DIR__.'/config.php';
require_once __DIR__.'/db.php';

session_start();

// Vérifier si le code d'autorisation est présent
if (!isset($_GET['code'])) {
    die('Code d\'autorisation manquant');
}

try {
    // 1. Échanger le code contre un token d'accès
    $token = getDiscordAccessToken($_GET['code'], DISCORD_REDIRECT_URI);
    
    if (!isset($token['access_token'])) {
        throw new Exception('Échec de l\'obtention du token d\'accès');
    }

    // 2. Récupérer les infos utilisateur
    $user = getDiscordUserInfo($token['access_token']);
    
    if (!$user) {
        throw new Exception('Échec de la récupération des informations utilisateur');
    }

    // 3. Préparer les données utilisateur
    $avatarUrl = isset($user->avatar) 
        ? "https://cdn.discordapp.com/avatars/{$user->id}/{$user->avatar}.png" 
        : 'media/icones/logog.png';

    $userData = [
        'id' => $user->id,
        'email' => $user->email ?? '',
        'name' => $user->username,
        'picture' => $avatarUrl,
        'provider' => 'discord'
    ];

    // 4. Sauvegarder en base de données
    $userId = saveOrUpdateUser('discord', $userData);
    
    // 5. Créer la session utilisateur
    $_SESSION['user'] = [
        'id' => $userId,
        'email' => $user->email ?? '',
        'name' => $user->username,
        'avatar' => $avatarUrl,
        'provider' => 'discord'
    ];

    // 6. Fermer le popup et notifier le parent
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Connexion réussie</title>
        <script>
            if (window.opener) {
                window.opener.postMessage({
                    action: "authSuccess",
                    provider: "discord",
                    user: '.json_encode([
                        'id' => $userId,
                        'email' => $user->email ?? '',
                        'name' => $user->username,
                        'avatar' => $avatarUrl
                    ]).'
                }, "'.DISCORD_REDIRECT_URI.'");
                window.close();
            } else {
                window.location.href = "/";
            }
        </script>
    </head>
    <body>
        <p>Connexion réussie, fermeture de la fenêtre...</p>
    </body>
    </html>';
    exit();

} catch (Exception $e) {
    error_log('Discord Auth Error: '.$e->getMessage());
    
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Erreur de connexion</title>
        <script>
            if (window.opener) {
                window.opener.postMessage({
                    action: "authError",
                    provider: "discord",
                    message: "'.addslashes($e->getMessage()).'"
                }, "'.DISCORD_REDIRECT_URI.'");
                window.close();
            } else {
                window.location.href = "/?error=auth_failed";
            }
        </script>
    </head>
    <body>
        <p>Erreur lors de la connexion: '.htmlspecialchars($e->getMessage()).'</p>
    </body>
    </html>';
    exit();
}

/**
 * Fonction pour obtenir le token d'accès Discord
 */
function getDiscordAccessToken($code, $redirect_uri) {
    $data = [
        'client_id' => DISCORD_CLIENT_ID,
        'client_secret' => DISCORD_CLIENT_SECRET,
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $redirect_uri,
        'scope' => 'identify email'
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents('https://discord.com/api/oauth2/token', false, $context);
    
    if ($response === false) {
        throw new Exception('Erreur lors de la requête de token');
    }

    return json_decode($response, true);
}

/**
 * Fonction pour obtenir les infos utilisateur Discord
 */
function getDiscordUserInfo($access_token) {
    $options = [
        'http' => [
            'header' => "Authorization: Bearer $access_token\r\n",
            'method' => 'GET'
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents('https://discord.com/api/users/@me', false, $context);
    
    if ($response === false) {
        throw new Exception('Erreur lors de la récupération des infos utilisateur');
    }

    return json_decode($response);
=======
<?php
require_once __DIR__.'/config.php';
require_once __DIR__.'/db.php';

session_start();

// Vérifier si le code d'autorisation est présent
if (!isset($_GET['code'])) {
    die('Code d\'autorisation manquant');
}

try {
    // 1. Échanger le code contre un token d'accès
    $token = getDiscordAccessToken($_GET['code'], DISCORD_REDIRECT_URI);
    
    if (!isset($token['access_token'])) {
        throw new Exception('Échec de l\'obtention du token d\'accès');
    }

    // 2. Récupérer les infos utilisateur
    $user = getDiscordUserInfo($token['access_token']);
    
    if (!$user) {
        throw new Exception('Échec de la récupération des informations utilisateur');
    }

    // 3. Préparer les données utilisateur
    $avatarUrl = isset($user->avatar) 
        ? "https://cdn.discordapp.com/avatars/{$user->id}/{$user->avatar}.png" 
        : 'media/icones/logog.png';

    $userData = [
        'id' => $user->id,
        'email' => $user->email ?? '',
        'name' => $user->username,
        'picture' => $avatarUrl,
        'provider' => 'discord'
    ];

    // 4. Sauvegarder en base de données
    $userId = saveOrUpdateUser('discord', $userData);
    
    // 5. Créer la session utilisateur
    $_SESSION['user'] = [
        'id' => $userId,
        'email' => $user->email ?? '',
        'name' => $user->username,
        'avatar' => $avatarUrl,
        'provider' => 'discord'
    ];

    // 6. Fermer le popup et notifier le parent
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Connexion réussie</title>
        <script>
            if (window.opener) {
                window.opener.postMessage({
                    action: "authSuccess",
                    provider: "discord",
                    user: '.json_encode([
                        'id' => $userId,
                        'email' => $user->email ?? '',
                        'name' => $user->username,
                        'avatar' => $avatarUrl
                    ]).'
                }, "'.DISCORD_REDIRECT_URI.'");
                window.close();
            } else {
                window.location.href = "/";
            }
        </script>
    </head>
    <body>
        <p>Connexion réussie, fermeture de la fenêtre...</p>
    </body>
    </html>';
    exit();

} catch (Exception $e) {
    error_log('Discord Auth Error: '.$e->getMessage());
    
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Erreur de connexion</title>
        <script>
            if (window.opener) {
                window.opener.postMessage({
                    action: "authError",
                    provider: "discord",
                    message: "'.addslashes($e->getMessage()).'"
                }, "'.DISCORD_REDIRECT_URI.'");
                window.close();
            } else {
                window.location.href = "/?error=auth_failed";
            }
        </script>
    </head>
    <body>
        <p>Erreur lors de la connexion: '.htmlspecialchars($e->getMessage()).'</p>
    </body>
    </html>';
    exit();
}

/**
 * Fonction pour obtenir le token d'accès Discord
 */
function getDiscordAccessToken($code, $redirect_uri) {
    $data = [
        'client_id' => DISCORD_CLIENT_ID,
        'client_secret' => DISCORD_CLIENT_SECRET,
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $redirect_uri,
        'scope' => 'identify email'
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents('https://discord.com/api/oauth2/token', false, $context);
    
    if ($response === false) {
        throw new Exception('Erreur lors de la requête de token');
    }

    return json_decode($response, true);
}

/**
 * Fonction pour obtenir les infos utilisateur Discord
 */
function getDiscordUserInfo($access_token) {
    $options = [
        'http' => [
            'header' => "Authorization: Bearer $access_token\r\n",
            'method' => 'GET'
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents('https://discord.com/api/users/@me', false, $context);
    
    if ($response === false) {
        throw new Exception('Erreur lors de la récupération des infos utilisateur');
    }

    return json_decode($response);
>>>>>>> 370412e90a0bf4fcde37b45a7d90cb5f096c75df
}