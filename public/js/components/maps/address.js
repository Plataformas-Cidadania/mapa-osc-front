var group = L.layerGroup();
var group2 = L.layerGroup();

L.marker([-22.90193745979269, -43.18279841993748]).bindPopup('Ipea - Rio de Janeiro').addTo(group), L.marker([-15.79829061538301, -47.8825063229858]).bindPopup('Ipea - Brasília').addTo(group2);

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
    streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

var map = L.map('mapa', {
    center: [-19.015415342710046, -45.76785477428655],
    zoom: 5,
    layers: [streets, group, group2]
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