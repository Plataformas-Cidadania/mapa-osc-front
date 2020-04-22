var group = L.layerGroup();
var group2 = L.layerGroup();

L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(group), L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(group), L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(group2), L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(group2);

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
    streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

var map = L.map('mapa', {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [grayscale, group, group2]
});

var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

var overlays = {
    "Rio de Janeiro": group,
    "Brasília": group2
};

L.control.layers(baseLayers, overlays).addTo(map);