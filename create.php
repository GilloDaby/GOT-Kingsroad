<<<<<<< HEAD
<?php
require_once "assets/inc/sqlite3database.class.php";
require_once "assets/inc/mypdo.class.php";
require_once "assets/inc/outils.class.php";

$_map = $_GET['map'];
if((isset($_map) && !empty($_map)) && ($_map == "teyvat" || $_map == "enka" || $_map == "gouffre")) {
    $_map = "-{$_map}";
} else {
    echo "Nom de map absent ou éronné";
    die();
}

$db = new SQLite3Database("markers$_map.db");

$map = [];
$layersarray = [];
$nbtm = 0;
$total = 0;
$counter = 0;
$i = 0;
$uid = 0;
$mid = 0;

$groups = $db->get_rows('SELECT * FROM genshin_map_group');
$markers = $db->get_rows('SELECT * FROM genshin_map_marker');

foreach($groups as $g => $group) {
    $map[$group->groupid] = [
        'id' => $group->groupid,
        'grouptitle' => $group->title,
        'grpicon' => $group->grpicon,
        'grpmrk' => $group->grpmrk,
        'grptitle' => $group->grptitle,
        'markers' => [],
    ];

    if($group->grpfilename) {
        $map[$group->groupid]['grpfilename'] = $group->grpfilename;
    };

    if($group->grpcbx) {
        $map[$group->groupid]['grpcbx'] = $group->grpcbx;
    };
};

foreach($markers as $m => $marker) {
    $map[$marker->mgroup]['markers'][$m] = [
        'uid' => $marker->uid,
        'mid' => $marker->mid,
        'format' => $marker->format,
        'x' => $marker->x,
        'y' => $marker->y,
    ];

    if($marker->video) {
        $map[$marker->mgroup]['markers'][$m]['video'] = $marker->video;
    };

    if($marker->text) {
        $map[$marker->mgroup]['markers'][$m]['text'] = $marker->text;
    };

    if($marker->title) {
        $map[$marker->mgroup]['markers'][$m]['title'] = $marker->title;
    };

    if($marker->icon) {
        $map[$marker->mgroup]['markers'][$m]['icon'] = $marker->icon;
    };

    if($marker->under) {
        $map[$marker->mgroup]['markers'][$m]['under'] = $marker->under;
    };
};

$layers = "// Layers\n\nvar teyvatarray = [";
$initmarkers = "// Initialisation des Markers\n\nvar initDatas = {\n";
$js = "// Liste des Marqueurs\n\n";

foreach($map as $group) {
    if(!in_array($group['grpmrk'], $layersarray)) {
        $layersarray[] = $group['grpmrk'];
        $layers .= "'{$group['grpmrk']}',";
    };

    $initmarkers .= "{$group['id']}:{List:'{$group['id']}', Icon:'{$group['grpicon']}', Grp:'{$group['grpmrk']}', Title:{$group['grptitle']}";
    if(isset($group['grpfilename'])) {
        $initmarkers .= ", Filename:'{$group['grpfilename']}'";
    };

    if(isset($group['grpcbx'])) {
        $initmarkers .= ", Cbx:'{$group['grpcbx']}'";
    };

    $initmarkers .= "},\n";

    if(isset($group['grouptitle']) && $group['grouptitle'] !="") {
        $js .= "{$group['grouptitle']}\n\n";
    };
    $js .= "var list{$group['id']} = [\n\t";
    $counter = 1;
    $i = 1;
    $nbtm = count($group['markers']);
    $total += $nbtm;

    foreach($group['markers'] as $marker) {

        $xx = ($marker['x'] < 10000) ? " ".$marker['x'] : $marker['x'];
        $yy = ($marker['y'] < 10000) ? " ".$marker['y'] : $marker['y'];
        $mid = ($marker['mid'] < 10) ? "0".$marker['mid'] : $marker['mid'];
        if($marker['uid'] < 10) {
            $uid = "0000".$marker['uid'];
        } elseif ($marker['uid'] < 100) {
            $uid = "000".$marker['uid'];
        } elseif ($marker['uid'] < 1000) {
            $uid = "00".$marker['uid'];
        } elseif ($marker['uid'] < 10000) {
            $uid = "0".$marker['uid'];
        } elseif ($marker['uid'] > 9999) {
            $uid = $marker['uid'];
        };
        $js .= "[{$marker['format']},[{$xx},{$yy}],{id:'{$uid}',mid:'{$mid}'";
        if(isset($marker['video'])) {
            $js .= ",video:'{$marker['video']}'";
        };
        if(isset($marker['text'])) {
            $js .= ",text:{$marker['text']}";
        };
        if(isset($marker['title'])) {
            $js .= ",title:{$marker['title']}";
        };
        if(isset($marker['icon'])) {
            $js .= ",icon:'{$marker['icon']}'";
        };
        if(isset($marker['under'])) {
            $js .= ",under:{$marker['under']}";
        };
        if($i != $nbtm) {
            $js .= "}],";
        } else {
            $js .= "}]";
        };
        if($counter == 10 && $i != $nbtm) {
            $js .= "\n\t";
            $counter = 0;
        };
        $counter += 1;
        $i += 1;
    };

    $js .= "\n];\n\n";
};

$layers .= "\n];\n\n";
$initmarkers .= "};\n\n";

$fnbk = "assets/js/mkbk/markers{$_map} - ".date('Y-m-d_H-i-s').".js";
$fn = "assets/js/markers{$_map}.js";
$output = $layers . $initmarkers . $js . "var totalMarkers = {$total};";
file_put_contents($fnbk, $output);
file_put_contents($fn, $output);
outils::dd("Fichier de backup $fnbk créé et $fn remplacé sur le serveur");
=======
<?php
require_once "assets/inc/sqlite3database.class.php";
require_once "assets/inc/mypdo.class.php";
require_once "assets/inc/outils.class.php";

$_map = $_GET['map'];
if((isset($_map) && !empty($_map)) && ($_map == "teyvat" || $_map == "enka" || $_map == "gouffre")) {
    $_map = "-{$_map}";
} else {
    echo "Nom de map absent ou éronné";
    die();
}

$db = new SQLite3Database("markers$_map.db");

$map = [];
$layersarray = [];
$nbtm = 0;
$total = 0;
$counter = 0;
$i = 0;
$uid = 0;
$mid = 0;

$groups = $db->get_rows('SELECT * FROM genshin_map_group');
$markers = $db->get_rows('SELECT * FROM genshin_map_marker');

foreach($groups as $g => $group) {
    $map[$group->groupid] = [
        'id' => $group->groupid,
        'grouptitle' => $group->title,
        'grpicon' => $group->grpicon,
        'grpmrk' => $group->grpmrk,
        'grptitle' => $group->grptitle,
        'markers' => [],
    ];

    if($group->grpfilename) {
        $map[$group->groupid]['grpfilename'] = $group->grpfilename;
    };

    if($group->grpcbx) {
        $map[$group->groupid]['grpcbx'] = $group->grpcbx;
    };
};

foreach($markers as $m => $marker) {
    $map[$marker->mgroup]['markers'][$m] = [
        'uid' => $marker->uid,
        'mid' => $marker->mid,
        'format' => $marker->format,
        'x' => $marker->x,
        'y' => $marker->y,
    ];

    if($marker->video) {
        $map[$marker->mgroup]['markers'][$m]['video'] = $marker->video;
    };

    if($marker->text) {
        $map[$marker->mgroup]['markers'][$m]['text'] = $marker->text;
    };

    if($marker->title) {
        $map[$marker->mgroup]['markers'][$m]['title'] = $marker->title;
    };

    if($marker->icon) {
        $map[$marker->mgroup]['markers'][$m]['icon'] = $marker->icon;
    };

    if($marker->under) {
        $map[$marker->mgroup]['markers'][$m]['under'] = $marker->under;
    };
};

$layers = "// Layers\n\nvar teyvatarray = [";
$initmarkers = "// Initialisation des Markers\n\nvar initDatas = {\n";
$js = "// Liste des Marqueurs\n\n";

foreach($map as $group) {
    if(!in_array($group['grpmrk'], $layersarray)) {
        $layersarray[] = $group['grpmrk'];
        $layers .= "'{$group['grpmrk']}',";
    };

    $initmarkers .= "{$group['id']}:{List:'{$group['id']}', Icon:'{$group['grpicon']}', Grp:'{$group['grpmrk']}', Title:{$group['grptitle']}";
    if(isset($group['grpfilename'])) {
        $initmarkers .= ", Filename:'{$group['grpfilename']}'";
    };

    if(isset($group['grpcbx'])) {
        $initmarkers .= ", Cbx:'{$group['grpcbx']}'";
    };

    $initmarkers .= "},\n";

    if(isset($group['grouptitle']) && $group['grouptitle'] !="") {
        $js .= "{$group['grouptitle']}\n\n";
    };
    $js .= "var list{$group['id']} = [\n\t";
    $counter = 1;
    $i = 1;
    $nbtm = count($group['markers']);
    $total += $nbtm;

    foreach($group['markers'] as $marker) {

        $xx = ($marker['x'] < 10000) ? " ".$marker['x'] : $marker['x'];
        $yy = ($marker['y'] < 10000) ? " ".$marker['y'] : $marker['y'];
        $mid = ($marker['mid'] < 10) ? "0".$marker['mid'] : $marker['mid'];
        if($marker['uid'] < 10) {
            $uid = "0000".$marker['uid'];
        } elseif ($marker['uid'] < 100) {
            $uid = "000".$marker['uid'];
        } elseif ($marker['uid'] < 1000) {
            $uid = "00".$marker['uid'];
        } elseif ($marker['uid'] < 10000) {
            $uid = "0".$marker['uid'];
        } elseif ($marker['uid'] > 9999) {
            $uid = $marker['uid'];
        };
        $js .= "[{$marker['format']},[{$xx},{$yy}],{id:'{$uid}',mid:'{$mid}'";
        if(isset($marker['video'])) {
            $js .= ",video:'{$marker['video']}'";
        };
        if(isset($marker['text'])) {
            $js .= ",text:{$marker['text']}";
        };
        if(isset($marker['title'])) {
            $js .= ",title:{$marker['title']}";
        };
        if(isset($marker['icon'])) {
            $js .= ",icon:'{$marker['icon']}'";
        };
        if(isset($marker['under'])) {
            $js .= ",under:{$marker['under']}";
        };
        if($i != $nbtm) {
            $js .= "}],";
        } else {
            $js .= "}]";
        };
        if($counter == 10 && $i != $nbtm) {
            $js .= "\n\t";
            $counter = 0;
        };
        $counter += 1;
        $i += 1;
    };

    $js .= "\n];\n\n";
};

$layers .= "\n];\n\n";
$initmarkers .= "};\n\n";

$fnbk = "assets/js/mkbk/markers{$_map} - ".date('Y-m-d_H-i-s').".js";
$fn = "assets/js/markers{$_map}.js";
$output = $layers . $initmarkers . $js . "var totalMarkers = {$total};";
file_put_contents($fnbk, $output);
file_put_contents($fn, $output);
outils::dd("Fichier de backup $fnbk créé et $fn remplacé sur le serveur");
>>>>>>> 370412e90a0bf4fcde37b45a7d90cb5f096c75df
?>