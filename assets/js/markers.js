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