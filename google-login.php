<?php
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/config.php';

session_start();

$client = new Google_Client();
$client->setApplicationName('Got Kingsroad');
$client->setClientId(GOOGLE_CLIENT_ID);
$client->setClientSecret(GOOGLE_CLIENT_SECRET);
$client->setRedirectUri(GOOGLE_REDIRECT_URI);
$client->addScope('email');
$client->setAccessType('offline');
$client->setPrompt('select_account consent');

if (isset($_GET['code'])) {
    try {
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
        
        if (!isset($token['error'])) {
            $client->setAccessToken($token);
            $google_oauth = new Google_Service_Oauth2($client);
            $google_account_info = $google_oauth->userinfo->get();
            
            $_SESSION['user'] = [
                'id' => $google_account_info->id,
                'email' => $google_account_info->email,
                'name' => $google_account_info->name,
                'avatar' => $google_account_info->picture,
                'provider' => 'google'
            ];

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
    } catch (Exception $e) {
        error_log('Google login error: ' . $e->getMessage());
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

if (isset($_GET['popup'])) {
    $authUrl = $client->createAuthUrl();
    header("Location: $authUrl");
    exit();
}

header('Location: ' . $client->createAuthUrl());
exit();
?>