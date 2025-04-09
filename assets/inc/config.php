<?php
// Configuration de la base de données
define('DB_HOST', 'mysql77.ifastnet.com');
define('DB_NAME', 'gotkings_dbkingsroad');
define('DB_USER', 'gotkings_gillodaby');
define('DB_PASS', 'VhyX5pTuL77$5fd5Bt9&');

// Configuration Discord OAuth2
define('DISCORD_CLIENT_ID', '1359206763785752807');
define('DISCORD_CLIENT_SECRET', 'LC4qHHKlBBGdd2F2opySDDsG4WjU_itl');
define('DISCORD_REDIRECT_URI', 'https://got-kingsroad.com/auth/discord/callback');

// Sécurité de base
define('APP_ENV', 'production'); // 'development' ou 'production'
error_reporting(APP_ENV === 'development' ? E_ALL : 0);
ini_set('display_errors', APP_ENV === 'development' ? 1 : 0);
?>