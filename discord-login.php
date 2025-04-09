<?php
require_once __DIR__.'/config.php';
require_once __DIR__.'/db.php';

session_start();

$client_id = '1359206763785752807';
$redirect_uri = 'https://got-kingsroad.com/discord-auth-callback.php';
$scope = 'identify email';

if (isset($_GET['code'])) {
    try {
        $token = getDiscordAccessToken($_GET['code'], $redirect_uri);
        
        if ($token && isset($token['access_token'])) {
            $user = getDiscordUserInfo($token['access_token']);
            
            if ($user) {
                $avatarUrl = $user->avatar 
                    ? "https://cdn.discordapp.com/avatars/{$user->id}/{$user->avatar}.png" 
                    : 'media/icones/logog.png';

                $_SESSION['user'] = [
                    'id' => $user->id,
                    'email' => $user->email ?? '',
                    'name' => $user->username,
                    'avatar' => $avatarUrl,
                    'provider' => 'discord'
                ];

                // Fermeture simple du popup
                echo '<script>
    if (window.opener) {
        window.opener.postMessage({
            type: "authUpdate",
            loggedIn: true,
            user: '.json_encode([
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'avatar' => $user->avatar
            ]).'
        }, "*");
        window.close();
    } else {
        window.location.href = "/";
    }
</script>';
                exit();
            }
        }
    } catch (Exception $e) {
        error_log('Discord Auth Error: '.$e->getMessage());
        echo '<script>
            if (window.opener) {
                window.opener.location.href = "/?login_error=1";
                window.close();
            } else {
                window.location.href = "/?login_error=1";
            }
        </script>';
        exit();
    }
}

// Gestion popup
if (isset($_GET['popup'])) {
    $authUrl = "https://discord.com/api/oauth2/authorize?client_id=$client_id&redirect_uri=".urlencode($redirect_uri)."&response_type=code&scope=$scope";
    header("Location: $authUrl");
    exit();
}

// Fonctions restent identiques à votre version originale
function getDiscordAccessToken($code, $redirect_uri) {
    $data = [
        'client_id' => '1359206763785752807',
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
    $result = file_get_contents('https://discord.com/api/oauth2/token', false, $context);
    
    return json_decode($result, true);
}

function getDiscordUserInfo($access_token) {
    $options = [
        'http' => [
            'header' => "Authorization: Bearer $access_token\r\n",
            'method' => 'GET'
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents('https://discord.com/api/users/@me', false, $context);
    
    return json_decode($result);
}
?>