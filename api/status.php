<?php
session_start();
header('Content-Type: application/json');

$response = [
    'loggedIn' => false,
    'user' => null
];

if (isset($_SESSION['user'])) {
    $response['loggedIn'] = true;
    $response['user'] = [
        'id' => $_SESSION['user']['id'],
        'email' => $_SESSION['user']['email'],
        'name' => $_SESSION['user']['name'],
        'avatar' => $_SESSION['user']['avatar'],
        'provider' => $_SESSION['user']['provider']
    ];
}

echo json_encode($response);
?>