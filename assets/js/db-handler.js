// assets/js/db-handler.js
document.addEventListener('DOMContentLoaded', function() {
    let currentMarker = null;
    let dbMarkers = [];
    const map = L.map('devmap').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Synchroniser la sélection de catégorie avec les radios existants
    function syncCategorySelection() {
        const selectedRadio = document.querySelector('input[name="markselect"]:checked');
        if (selectedRadio) {
            document.getElementById('marker-category').value = selectedRadio.dataset.type;
        }
    }

    // Écouteurs pour synchroniser les changements
    document.querySelectorAll('input[name="markselect"]').forEach(radio => {
        radio.addEventListener('change', syncCategorySelection);
    });

    // Initialiser la sélection
    syncCategorySelection();

    // Gestion du clic sur la carte
    map.on('click', function(e) {
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
        
        const selectedType = document.querySelector('input[name="markselect"]:checked').dataset.type;
        currentMarker = L.marker(e.latlng, {
            draggable: true,
            icon: getIconByType(selectedType)
        }).addTo(map);
        
        currentMarker.bindPopup(`<b>Nouveau ${selectedType}</b>`);
    });

    // Sauvegarde du marqueur
    document.getElementById('save-marker').addEventListener('click', function() {
        if (!currentMarker) {
            alert('Placez d\'abord un marqueur sur la carte');
            return;
        }

        const selectedType = document.querySelector('input[name="markselect"]:checked').dataset.type;
        const markerData = {
            latitude: currentMarker.getLatLng().lat,
            longitude: currentMarker.getLatLng().lng,
            title: document.getElementById('marker-title').value || selectedType,
            description: document.getElementById('marker-desc').value || '',
            category: selectedType,
            icon: `media/icones/${selectedType}.png`
        };

        fetch('/api/save-marker.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(markerData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentMarker.setPopupContent(`
                    <b>${markerData.title}</b>
                    <p>${markerData.description}</p>
                    <small>ID: ${data.id}</small>
                `);
                dbMarkers.push(currentMarker);
                currentMarker = null;
            }
        });
    });

    // Chargement des marqueurs depuis la DB
    document.getElementById('load-db-markers').addEventListener('click', loadMarkersFromDB);

    function loadMarkersFromDB() {
        fetch('/api/markers.php')
            .then(response => response.json())
            .then(markers => {
                clearDbMarkers();
                
                markers.forEach(marker => {
                    const markerObj = L.marker(
                        [marker.latitude, marker.longitude],
                        { icon: getIconByType(marker.category) }
                    )
                    .addTo(map)
                    .bindPopup(`
                        <b>${marker.title}</b>
                        <p>${marker.description}</p>
                        <small>Catégorie: ${marker.category}</small>
                    `);
                    
                    dbMarkers.push(markerObj);
                });
            });
    }

    function clearDbMarkers() {
        dbMarkers.forEach(marker => map.removeLayer(marker));
        dbMarkers = [];
    }

    function getIconByType(type) {
        // Utilise vos icônes existantes définies dans icondev.js
        return window[type] || L.divIcon({
            className: 'custom-marker',
            html: `<img src="media/icones/${type}.png" width="30" height="30">`,
            iconSize: [30, 30]
        });
    }
});