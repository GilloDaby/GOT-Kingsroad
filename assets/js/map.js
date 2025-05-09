
// Chargement des marqueurs depuis l'API
function loadMarkersFromDB() {
    fetch('api/markers.php')
        .then(response => response.json())
        .then(markers => {
            markers.forEach(markerData => {
                // Création du marqueur
                const marker = L.marker(
                    [markerData.latitude, markerData.longitude],
                    { icon: getCustomIcon(markerData.category) }
                ).addTo(map);
                
                // Ajout du popup
                if (markerData.title || markerData.description) {
                    marker.bindPopup(`
                        <b>${markerData.title || ''}</b>
                        <p>${markerData.description || ''}</p>
                    `);
                }
            });
        })
        .catch(error => console.error('Erreur:', error));
}

// Appeler cette fonction après l'initialisation de la carte
document.addEventListener('DOMContentLoaded', function() {
    loadMarkersFromDB();
});
// Fonctions Interaction sur la Map

    function onMapClick(e) {
        var txt = mymap.project([e.latlng.lat, e.latlng.lng], mymap.getMaxZoom());
        var x = Math.floor(txt.x);
        var y = Math.floor(txt.y);
        console.log(langue["ui-click"] + "[" + x + "," + y + "]");
    }

    function unproject(coord) {
        return mymap.unproject(coord, mymap.getMaxZoom());
      }

    function onMarkerClick(e) {
        currentMarker = this;
    }

    function clearGroup() {
        teyvatarray.forEach(function(e){
            window[e+'Group'].clearLayers();
        });
    }

    function updatenbtmark() {
        var num = 0, r, c; 

        $('.itembtn').each(function(){
            if ($(this).hasClass('active')) {
                num += window['list' + $(this).data('type')].length;
            };
        });
    
        $('.matbtn').each(function(){
            if ($(this).hasClass('active')) {
                num += window['list' + $(this).data('type')].length;
            };
        });
    
        $('.region' + lgmenu).each(function() {
            if ($(this).hasClass('active')) {
                r = $(this).data('type');
                $('.chest' + lgmenu).each(function(){
                    if ($(this).hasClass('active')) {
                        c = $(this).data('type');
                        if (typeof window['list' + c + r] !=='undefined')
                            num += window['list' + c + r].length;
                    };
                });
            };
        });
    
        $('#total' + lgmenu).text(num +" / "+ totalMarkers + langue['ui-load']);
    }

    function checkinfo(e) {
        if (!localStorage.getItem('Mapvers') || !(localStorage.Mapvers === "1.0")) {
            localStorage.Mapvers = "1.0";
            if (localStorage.MapLng === "FR") {
                var infobox = lity('#infomajFR');
            } else {
                var infobox = lity('#infomajEN');
            }
        }
    }

    function oldtonew(e) {
        if (!localStorage.getItem('updatesave')) {
            var listcbx = ['castle','tower','sidequest','altarofmemories','signpost','historicsite','occupiedsite','drogon',
							'bountie','banditcamp','enemyhideout','gerociousbeast','echoesofthepast','godhaven','lostletter','citymysteries','beyondthewall','wormwalks',

						'castlereach','towerreach','sidequestreach','altarofmemoriesreach','signpostreach','historicsitereach','occupiedsitereach',
						'bountiereach','banditcampreach','enemyhideoutreach','gerociousbeastreach','echoesofthepastreach','godhavenreach','lostletterreach','citymysteriesreach',

						'castleredkeep','signpostredkeep',
];
            var newusermarkers = [];
            listcbx.forEach(function(e){
                markers = (localStorage.getItem('chkbox'+e)) ? JSON.parse(localStorage.getItem('chkbox'+e)) : [];
                markers.forEach(function(nb){
                    newusermarkers.push(e+nb);
                });
                localStorage.removeItem('chkbox'+e);
            });
            localStorage.setItem('userMarkers', JSON.stringify(newusermarkers));
            localStorage.updatesave = "1";
            userMarkers = newusermarkers;
        }
    };

    function sanityze (e) {
        if (e) {
            t1 = e.replace('"[','[');
            t2 = t1.replaceAll('\\','');
            t3 = t2.replace(']"',']')
            return t3;
        };
    };

    function mergesave(servmarkers) {
        var localmarkers = (localStorage.userMarkersTeyvat) ? JSON.parse(sanityze(localStorage.userMarkersTeyvat)) : [];
        localmarkers.forEach(function(e){
            if(servmarkers.indexOf(e)<0)
                servmarkers.push(e);
        });

        $.post('api/t/mergemarkers', {data : JSON.stringify(servmarkers)}, function(res) {
            if(typeof(res.error) !== 'undefined') {
                alert('Vous avez été déconnecté. La page va se rafraîchir.');
                window.location.reload();
            };
        });
        alert(langue["ui-mergedone"]);
        window.location.reload();
    };

    function saveDBUserMarkers(idm, checked) {

        if(checked) {
            $.post('api/t/addmarker/'+idm, function(res) {
                if(typeof(res.error) !== 'undefined') {
                    alert('Vous avez été déconnecté. La page va se rafraîchir.');
                    window.location.reload();
                };

                if (hideMarkers) {
                    currentMarker.setIcon(Null);
                } else {
                    currentMarker.setOpacity(0.35);
                };

                userMarkers = res.markers;
            });
        } else {
            $.post('api/t/removemarker/'+idm, function(res) {
                if(typeof(res.error) !== 'undefined') {
                    alert('Vous avez été déconnecté. La page va se rafraîchir.');
                    window.location.reload();
                };

                if (hideMarkers)
                    currentMarker.setIcon(currentMarker.options.grpicon);

                currentMarker.setOpacity(1);
                userMarkers = res.markers;
            });
        };
    };

    function saveLocalUserMarkers(idm, checked) {

        var markers = getUserMarkers();

        if(checked) {
            if(markers.indexOf(idm) < 0) {
                markers.push(""+idm);
            };

            if (hideMarkers) {
                currentMarker.setIcon(Null);
            } else {
                currentMarker.setOpacity(0.35);
            };
        } else {
            if(markers.indexOf(idm) >= 0) {
                markers.splice(markers.indexOf(""+idm), 1);
            };

            if (hideMarkers)
                currentMarker.setIcon(currentMarker.options.grpicon);

            currentMarker.setOpacity(1);
        };

        localStorage.setItem('userMarkersTeyvat', JSON.stringify(markers));
        // userMarkers = JSON.stringify(markers); //??? pkoi ?
        userMarkers = markers;
    };

    function getUserOptions(option) {
		var options = sanityze(localStorage.getItem('userOptions'));
		options = (options)?JSON.parse(options):{}
		if (option)
			return (options[option])?options[option]:null;
		else
			return options;
	}

	function setUserOptions(option,valeur) {
		var options = getUserOptions()
		if (valeur) {
			options[option] = valeur;
		} else {
			if (options[option])
				delete options[option]
		}
		if (Object.keys(options).length)
			localStorage.setItem('userOptions', JSON.stringify(options))
		else
			localStorage.removeItem('userOptions')
		return true
	}

    function getUserMarkers() {
        var markers = sanityze(localStorage.getItem('userMarkersTeyvat'));

        if(!markers) {
          markers = [];
        } else {
          markers = JSON.parse(markers);
        }

        return markers;
    };

    function popUpOpen(e) {
        var content = e.popup.getContent();

        if($(content).find('input#mapbox').length > 0) {
          if(userMarkers.indexOf( ""+$(content).find('input#mapbox').first().data('cbxid') ) >= 0) {
            $('input#mapbox[data-cbxid="'+$(content).find('input#mapbox').first().data('cbxid')+'"]').prop('checked', 'checked');
            $('#cbxtxt'+$(content).find('input#mapbox').first().data('cbxid')).html(langue['ui-found']);
          }
        }
    }

    function resetmarkers() {
        if(userLocal) {
            localStorage.removeItem('userMarkersTeyvat');
        } else {
            $.post('api/t/resetmarkers', function(res) {
                if(typeof(res.error) !== 'undefined') {
                  alert('Vous avez été déconnecté. La page va se rafraîchir.');
                  window.location.reload();
                }
            });
        };
        alert(langue["ui-reset"]);
        window.location.reload();
    };

    function loadusermarkers(lstmrk) {
        if (lstmrk[0] == "v2") {
            var i = 1, cbx, markers = [];
            while (lstmrk[i]) {
                cbx = lstmrk[i];
                lstmrk[i+1].forEach(function(e){
                    markers.push(cbx + e);
                });
                if (localStorage.getItem('chkbox'+cbx))
                    localStorage.removeItem('chkbox'+cbx);
                i = i + 2;
            };
            localStorage.setItem('userMarkers', JSON.stringify(markers));
        } else if (lstmrk[0] == "Game of Throne - Kingsroad") {
            lstmrk.splice(0,1);
            localStorage.setItem('userMarkersTeyvat', JSON.stringify(lstmrk));
        } else {
            localStorage.setItem('userMarkers', JSON.stringify(lstmrk));
        };
        alert(langue["ui-import"]);
        window.location.reload();
    };

    function reselectmenu(itemdb, btndb, regiondb, chestdb){

        if (!localStorage.getItem("menuclear") || !(localStorage.menuclear === "1")) {
            localStorage.MenumapgenshinItem = [];
            localStorage.menuclear = "1";
        };

        var itemlocal = (localStorage.MenumapgenshinItem) ? JSON.parse(localStorage.MenumapgenshinItem) : [];
        var btnlocal = (localStorage.MenumapgenshinBtn) ? JSON.parse(localStorage.MenumapgenshinBtn) : [];
        var regionlocal = (localStorage.MenumapgenshinRegion) ? JSON.parse(localStorage.MenumapgenshinRegion) : [];
        var chestlocal = (localStorage.MenumapgenshinChest) ? JSON.parse(localStorage.MenumapgenshinChest) : [];

        var item = (userLocal) ? itemlocal : itemdb;
        var btn = (userLocal) ? btnlocal : btndb;
        var region = (userLocal) ? regionlocal : regiondb;
        var chest = (userLocal) ? chestlocal : chestdb;

        if(item){
            item.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
            });
        };
        if (btn){
            btn.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active').attr('src', "media/icones/" + element + "on.png");
            });
        };
        if (region){
            region.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
            });
        };
        if (chest){
            chest.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
            });
        };

        initMarkers(item,btn,region,chest);
        updatenbtmark();
    };

// Variables générales

var mymap;
var currentMarker;
var userMarkers = getUserMarkers();
var olduserMarkers = (localStorage.getItem('userMarkers')) ? JSON.parse(localStorage.userMarkers) : [] ;
var userLocal = true;
var hideMarkers = false;
var underGround = false;
var nbtmark = 0;
var langue, lgmenu;

// Initialisation et chargement de la Map

mymap = L.map('mapid', {
    center : [0,0],
    zoom : 3
});

teyvatMap = L.tileLayer('media/kingsroad/{z}/{x}/{y}.png', {
    attribution: '<a>GilloDaby</a>',
    maxZoom: 6,
    minZoom: 2,
    continuousWorld: true,
    maxBoundsViscosity: 0.8,
    noWrap: true,
    edgeBufferTiles: 1
});
teyvatMap.addTo(mymap);

mymap.zoomControl.setPosition('topright')

teyvatarray.forEach(function(e){
    window[e+'Group'] = L.layerGroup();
});

// Affichage du Bouton Menu

var BoutonMenu = L.easyButton({
    states : [{
        stateName: 'close-menu',
        icon: '<img src="media/icones/menuoff.png">',
        title: langue["ui-close"],
        onClick: function(btn, mymap){
            $('body').toggleClass('show-menu');
            mymap.invalidateSize();
            btn.state('open-menu')
            }
        },{
            stateName: 'open-menu',
            icon: '<img src="media/icones/menuon.png">',
            title: langue["ui-open"],
            onClick: function(btn, mymap){
                $('body').toggleClass('show-menu');
                mymap.invalidateSize();
                btn.state('close-menu')
            }
        }]
    });

BoutonMenu.addTo(mymap);

// Initialisation des marqueurs

function reloadMarkers () {
    var item=[], btn=[], region=[], chest=[];

    $('.itembtn').each(function(){
        if ($(this).hasClass('active') && (item.indexOf($(this).data('type')) < 0)) {
            item.push($(this).data('type'));
        };
    });

    $('.matbtn').each(function(){
        if ($(this).hasClass('active') && (btn.indexOf($(this).data('type')) < 0)) {
            btn.push($(this).data('type'));
        };
    });

    $('.region' + lgmenu).each(function(){
        if ($(this).hasClass('active') && (region.indexOf($(this).data('type')) < 0)) {
            region.push($(this).data('type'));
        };
    });

    $('.chest' + lgmenu).each(function(){
        if ($(this).hasClass('active') && (chest.indexOf($(this).data('type')) < 0)) {
            chest.push($(this).data('type'));
        };
    });

    initMarkers(item,btn,region,chest);
    updatenbtmark();
};

function initMarkers (item,btn,region,chest) {

    if(item){
        item.forEach(function(element) {
            loadmarker(initDatas[element]);
            mymap.addLayer(window[element + 'Group']);
        });
    };

    if (btn){
        btn.forEach(function(element) {
            loadmarker(initDatas[element]);
            mymap.addLayer(window[element + 'Group']);
        });
    };

    region.forEach(function(r){
        chest.forEach(function(c) {
            if(typeof window[c + r + 'Group'] !=='undefined') {
                loadmarker(initDatas[c + r]);
                mymap.addLayer(window[c + r + 'Group']);
            };
        });
    });
};

//    function loadmarker(marklist, markico, grp, marktitle, filename, cbxname) {
    function loadmarker(data) {
        var marq = [], nfichier, i, mtype, checkbox='', popup='', curmarker, txt, minfo, micon;
        var lgrp = window[data.Grp + 'Group'];
        var marklist = window['list' + data.List];
        for (i=0; i<marklist.length; i++) {
            marq = marklist[i];
            mtype = marq[0];
            minfo = marq[2];
            nfichier = data.Filename + minfo.mid;
            txt = "";
            let skip = false, skipu = false;

            if (typeof minfo.icon !=='undefined') {
                micon = (typeof minfo.under !=='undefined') ? window[minfo.icon +'u'] : window[minfo.icon];
            } else {
                micon = (typeof minfo.under !=='undefined') ? window[data.Icon +'u'] : window[data.Icon];
            };

            if(typeof data.Cbx !== 'undefined')
            checkbox = '<br><h2><label class="switch"><input type="checkbox" id="mapbox" data-cbxid="'+minfo.id+'" /><span class="cursor"></span><span id="cbxtxt'+minfo.id+'" class="texte">'+langue['ui-tofind']+'</span></label></h2>';

            if(typeof minfo.title !== 'undefined')
            txt += '<h2>'+minfo.title+'</h2>';

            switch (mtype) {
                case 0 : // Img (txt+cb)
                    txt += (typeof minfo.text !=='undefined') ? "<br><h1>"+minfo.text+"</h1>" : "";
                    popup = '<a href="media/'+nfichier+'.jpg" data-lity><img class="thumb" src="media/'+nfichier+'.jpg"/></a>'+txt+checkbox;
                    break;
                case 3 : // Gif (txt+cb)
                    txt += (typeof minfo.text !=='undefined') ? "<br><h1>"+minfo.text+"</h1>" : "";
                    popup = '<a href="media/'+nfichier+'.gif" data-lity><img class="thumb" src="media/'+nfichier+'.gif"/></a>'+txt+checkbox;
                    break;
                case 5 : // Video (txt+cb)
                    txt += (typeof minfo.text !=='undefined') ? "<br><h1>"+minfo.text+"</h1>" : "";
                    popup = '<iframe width="480" height="270" src="//www.youtube.com/embed/'+minfo.video+'?autoplay=1&rel=0&loop=1&suggestedQuality=hd1080" frameborder="0" allowfullscreen="1"></iframe>'+txt+checkbox;
                    break;
                case 7 : // Todo
                    txt = "<br><h1><b>"+data.Title+" "+minfo.mid+"</b><br>"+langue['ui-todo']+"</h1>";
                    popup = '<a href="media/todo.gif" class="items-center" data-lity><img class="thumb2" src="media/todo.gif"/></a>'+txt+checkbox;
                    break;
                case 12 : // sans popup (sauf temporaire)
                    popup = '<h1>'+checkbox+'</h1>';
                    // Have a break, have a Kitkat
            };

            titlem = (typeof minfo.title !=='undefined') ? minfo.title : data.Title;
            titlem += " Id:"+minfo.mid;

            if(typeof data.Cbx !== 'undefined') {
                    curmarker = L.marker(unproject(marq[1]), {icon: micon, grpicon: micon, title: titlem, riseOnHover: true}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
            } else {
                if (mtype !== 12) {
                    curmarker = L.marker(unproject(marq[1]), {icon: micon, title: titlem, riseOnHover: true}).bindPopup(popup, popupOptions);
                } else {
                    curmarker = L.marker(unproject(marq[1]), {icon: micon, title: titlem, riseOnHover: true});
                }
            };

            if((olduserMarkers.indexOf(data.Cbx+minfo.mid) >= 0) || (userMarkers.indexOf(minfo.id) >=0)) {
                if (hideMarkers) {
                    skip = true;
                } else {
                    curmarker.setOpacity(0.35);
                };

                if(userMarkers.indexOf(minfo.id) < 0) {
                    userMarkers.push(minfo.id);
                    olduserMarkers.splice(olduserMarkers.indexOf(data.Cbx+minfo.mid), 1);
                }
            }

            skipu = (underGround && (data.Grp !=="grotte") && !(minfo.under)) ? true : false;
            // curmarker.setOpacity(0);
            if (!(skip || skipu))
                curmarker.addTo(lgrp);

        };

        console.log(data.Title + " : " + marklist.length + langue["ui-load"]);
    };

// Fonctions Interaction Map

    mymap.on("click", onMapClick);
    mymap.on('popupopen', popUpOpen);

// Gestion du Menu

    $('.itembtn').on('click', function(e){
        e.preventDefault();

        var type = $(this).data('type');
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            loadmarker(initDatas[type]);
            mymap.addLayer(window[type+'Group']);
            updatenbtmark();
            if(!userLocal)
            $.post('api/t/addmenu/'+type);
        } else {
            mymap.removeLayer(window[type+'Group']);
            window[type+'Group'].clearLayers();
            updatenbtmark();
            if(!userLocal)
            $.post('api/t/removemenu/'+type);
        };

        if(userLocal) {
            var itemstatut = [];
            $('.itembtn').each(function(){
                if ($(this).hasClass('active') && (itemstatut.indexOf($(this).data('type')) < 0)) {
                    itemstatut.push($(this).data('type'));
                };
            });
            localStorage.MenumapgenshinItem = JSON.stringify(itemstatut);
        };
    });

    $('.chest' + lgmenu).on('click', function(e) {
        e.preventDefault();
        var type = $(this).data('type');
        var obj = this;
        $(obj).toggleClass('active');
        var cheststate = ($(obj).hasClass('active')) ? true : false
        $('.region' + lgmenu).each(function(){
            region = $(this).data('type');
            if(typeof window[type + region + 'Group'] !=='undefined') {
                if($(this).hasClass('active') && cheststate) {
                    loadmarker(initDatas[type + region]);
                    mymap.addLayer(window[type + region + 'Group']);
                    updatenbtmark();
                } else {
                    mymap.removeLayer(window[type + region + 'Group']);
                    window[type + region +'Group'].clearLayers();
                    updatenbtmark();
                };
            };
        });

        if(!userLocal) {
            if (cheststate) {
                $.post('api/t/addchest/'+type);
            } else {
                $.post('api/t/removechest/'+type);
            }
        } else {
        var cheststatut = [];
        $('.chest' + lgmenu).each(function(){
            if ($(this).hasClass('active') && (cheststatut.indexOf($(this).data('type')) < 0)) {
                cheststatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinChest = JSON.stringify(cheststatut);
        };
    });

    $('.region' + lgmenu).on('click',function(e) {
        e.preventDefault();
        var type = $(this).data('type');
        var obj = this;
        $(obj).toggleClass('active');
        var regionstate = ($(obj).hasClass('active')) ? true : false
        $('.chest' + lgmenu).each(function(){
            chest = $(this).data('type');
            if(typeof window[chest + type + 'Group'] !=='undefined') {
                if($(this).hasClass('active') && regionstate) {
                    loadmarker(initDatas[chest + type]);
                    mymap.addLayer(window[chest + type + 'Group']);
                    updatenbtmark();
                } else {
                    mymap.removeLayer(window[chest + type + 'Group']);
                    window[chest + type +'Group'].clearLayers();
                    updatenbtmark();
                };
            };
        });

        if(!userLocal) {
            if (regionstate) {
                $.post('api/t/addregion/'+type);
            } else {
                $.post('api/t/removeregion/'+type);
            }
        } else {
        var regionstatut = [];
        $('.region' + lgmenu).each(function(){
            if ($(this).hasClass('active') && (regionstatut.indexOf($(this).data('type')) < 0)) {
                regionstatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinRegion = JSON.stringify(regionstatut);
        };
    });

    $('.matbtn').on('click', function() {
        var ndf = $(this).data('type');
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).attr('src', "media/icones/" + ndf + "on.png");
            loadmarker(initDatas[ndf]);
            mymap.addLayer(window[ndf+'Group']);
            updatenbtmark();
            if(!userLocal)
                $.post('api/t/addbtn/'+ndf);
        } else {
            $(this).attr('src', "media/icones/" + ndf + "off.png");
            mymap.removeLayer(window[ndf+'Group']);
            window[ndf+'Group'].clearLayers();
            updatenbtmark();
            if(!userLocal)
                $.post('api/t/removebtn/'+ndf);
        };

        if(userLocal) {
            var btnstatut = [];
            $('.matbtn').each(function(){
                if ($(this).hasClass('active') && (btnstatut.indexOf($(this).data('type')) < 0)) {
                    btnstatut.push($(this).data('type'));
                };
            });
            localStorage.MenumapgenshinBtn = JSON.stringify(btnstatut);
        };
    });

// Gestion des Boutons Menu Haut

    $('.btninfo').on('click', function(){
        if (localStorage.MapLng === "FR") {
            var infobox = lity('#infoFR');
        } else {
            var infobox = lity('#infoEN');
        }
    });

    $('.btnreset').on('click', function() {
        if (confirm(langue["ui-prereset"])) {
            resetmarkers()
        }
    });

    $('.btnlg').on('click', function() {
        if (localStorage.MapLng === "FR") {
            localStorage.MapLng = "EN";
        } else {
            localStorage.MapLng = "FR";
        };
        window.location.reload();
    });

    $('.btnmerge').on('click', function() {
        if (confirm(langue["ui-mergeteyvat"])) {
             mergesave(userMarkers);
         }
    });

    $('.btnsave').on('click', function() {
        var arr1 = ['Game of Throne - Kingsroad'];
        var save = arr1.concat(userMarkers);
        this.href=URL.createObjectURL(new Blob([JSON.stringify(save)]));
        alert(langue["ui-exportteyvat"]);
    });

    $('.btnload').on('click', function (e) {
        var fileElem = document.getElementById("ImportBox");
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault();
    });

    $('#ImportBox').on('change', function(ev_) {
        var fr_;
        (fr_=new FileReader()).onload=function(ev_) {
            loadusermarkers(JSON.parse(sanityze(this.result)));
        };
        fr_.readAsText(this.files[0]);
    });

// Fin Fonction globale

$(document).ready(function() {

    var heightmenu = window.innerHeight - $("#topmenu" + lgmenu).outerHeight(true);
    $("#MarkerSelect" + lgmenu).css("max-height", heightmenu + 'px');

    // Update de l'ancien système de sauvegarde
    oldtonew();

    // Récupération des info users
    $.get('api/t/user', function(res) {
        if(typeof res.users !== 'undefined')
        console.log("u: "+res.users);

        if(typeof res.visits !== 'undefined')
        console.log("v: "+res.visits);

        if(typeof res.login !== 'undefined') {
          $('#discord' + lgmenu).attr('href', res.login).attr('target', (window.location !== window.parent.location) ? '_blank' : '_self');
          $('#goggle' + lgmenu).attr('href', res.loging).attr('target', (window.location !== window.parent.location) ? '_blank' : '_self');
          let options = getUserOptions()
          if (options.oemt) {
			  $('#hidemark' + lgmenu).prop("checked",true)
              hideMarkers = true;
            };
          if (options.oeau) {
			  $('#underground' + lgmenu).prop("checked",true);
              underGround = true;
              teyvatMap.setOpacity(0.35);
              for (let i=1; i<= overlaysBounds.length; i++) {
                  window['sumeruUnderground'+i].setOpacity(1);
              };
            }
          reselectmenu();
          localStorage.setItem('userMarkersTeyvat',JSON.stringify(userMarkers));
          localStorage.setItem('userMarkers',JSON.stringify(olduserMarkers));
        }

        if(typeof res.uid !== 'undefined') {
          $('#logged' + lgmenu)
              .html('<strong>'+langue["ui-deco"]+'</strong><img src="'+res.avatar+'" onerror="this.src=\''+res.avatar_default+'\'" class="mr-1 ml-1 h-6 rounded-full" /><strong>'+res.username+'</strong>')
              .attr('href', res.logout);
          $('#logincontainer' + lgmenu).toggleClass('hidden flex');
          $('#loggedcontainer' + lgmenu).toggleClass('hidden flex');
          $('#local' + lgmenu).toggleClass('hidden flex');
          $('#distant' + lgmenu).toggleClass('hidden flex');
          userLocal = false;
          userMarkers = (res.markers !== null) ? res.markers : [];
          olduserMarkers = (res.oldmarkers !== null) ? res.oldmarkers : [];
          itemload = (res.menu !== null) ? res.menu : [];
          btnload = (res.btn !== null) ? res.btn : [];
          regionload = (res.region !== null) ? res.region : [];
          chestload = (res.chest !== null) ? res.chest : [];
          updatemv3 = (res.updatemv3 !== null) ? res.updatemv3 : [];
          $.post('api/t/getoption', {data : JSON.stringify(['oemt','oeau','oear'])}, function(res) {
            if(typeof(res.error) !== 'undefined') {
                alert('Vous avez été déconnecté. La page va se rafraîchir.');
               	window.location.reload();
            };
            if (res["oemt"] == "true") {
				$('#hidemark' + lgmenu).prop("checked",true);
                hideMarkers = true;
			}
			if (res["oeau"] == "true") {
				$('#underground' + lgmenu).prop("checked",true);
                underGround = true;
                teyvatMap.setOpacity(0.35);
                for (let i=1; i<= overlaysBounds.length; i++) {
                    window['sumeruUnderground'+i].setOpacity(1);
                };
			}
			// TODO : gérer l'affichage des régions
              reselectmenu(itemload, btnload, regionload, chestload);
	      });
          if (updatemv3.indexOf('teyvat') < 0) {
            $.post('api/t/updatemarkers', {newm : JSON.stringify(userMarkers), oldm : JSON.stringify(olduserMarkers)}, function(res) {
                if(typeof(res.error) !== 'undefined') {
                    alert('Vous avez été déconnecté. La page va se rafraîchir.');
                    window.location.reload();
                };
            });
          }
        }
    });

    // Utilisation pour debug en local
    // initMarkers();
    // reselectmenu();

    $(document).on('change', 'input[type="checkbox"]', function() {

        if ($(this).hasClass('option')) {
            switch ($(this).data('option')) {
                case "hideswitch":
                    hideMarkers = ($(this).is(':checked')) ? true : false;
                    if (userLocal) {
                    	setUserOptions('oemt', hideMarkers);
                    } else {
						$.post('api/t/putoption', {data : JSON.stringify({'oemt':hideMarkers})})
					}
                    clearGroup();
                    reloadMarkers();
                    break;

                case "underground":
                    underGround = ($(this).is(':checked')) ? true : false;
                    if (underGround) {
                        teyvatMap.setOpacity(0.35);
                        for (let i=1; i<= overlaysBounds.length; i++) {
                            window['sumeruUnderground'+i].setOpacity(1);
                        };
                    } else {
                        teyvatMap.setOpacity(1);
                        for (let i=1; i<= overlaysBounds.length; i++) {
                            window['sumeruUnderground'+i].setOpacity(0);
                        };
                    }
                    if (userLocal) {
						setUserOptions('oeau', underGround);
					} else {
                    	$.post('api/t/putoption', {data : JSON.stringify({'oeau':underGround})})
                	}
                    clearGroup();
                    reloadMarkers();
                    break;

                default:
                    break;
            }
            return;
        };

        var cbxid = $(this).data('cbxid');

        if ($(this).is(':checked')) {
            $('#cbxtxt'+cbxid).html(langue['ui-found']);
        } else {
            $('#cbxtxt'+cbxid).html(langue['ui-tofind']);
        };

        if(userLocal) {
          saveLocalUserMarkers($(this).data('cbxid'), $(this).is(':checked'));
        } else {
          saveDBUserMarkers($(this).data('cbxid'), $(this).is(':checked'));
        };

    });

    $(window).resize(function() {
        var heightmenu = window.innerHeight - $("#topmenu" + lgmenu).outerHeight(true);
        $("#MarkerSelect" + lgmenu).css("max-height", heightmenu + 'px');
    });

});
    checkinfo();

// Fin Windows load