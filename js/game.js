// game.js
// (c) 2017 by Milan Gruner

// constants
var startCoords = new L.LatLng(52.3929931,13.0934414);
var startZoom = 14.91;

var minZoom = 6;
var maxZoom = 19;

// globals
var map;
var posPopup;

function init() {
	console.log('init');
	map = L.map('map').setView(startCoords, 13);

	var mapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var attribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var mapLayer = new L.TileLayer(mapUrl, {minZoom: minZoom, maxZoom: maxZoom, attribution: attribution});

	// set starting position
	map.setView(startCoords, startZoom);
	map.addLayer(mapLayer);

	// examples of decoration elements
	var marker = L.marker(startCoords).addTo(map);

	var circle = L.circle(startCoords, {
		color: '#2f8',
		fillColor: '#6fb',
		fillOpacity: 0.5,
		radius: 100
	}).addTo(map);

	var polygon = L.polygon([
		[51, 0],
		[51, 0.01],
		[51.01, 0.01],
		[51.01, 0]
	]).addTo(map);

	// popups for markers and elements
	marker.bindPopup("<b>This is a test</b><br>Testerino 3000").openPopup();
	circle.bindPopup("Circling around");
	polygon.bindPopup("Polygon schmolygon");

	posPopup = L.popup();

	// event bindings
	map.on('click', onMapClick);
}

function onMapClick(e) {
	var text = "You clicked the map at<br><b>" + e.latlng.lat + ", " + e.latlng.lng + "</b>";

	console.log("Map clicked at: ", e.latlng);

	// move marker and popup
	posPopup
		.setLatLng(e.latlng)
		.setContent(text)
		.openOn(map);
}
