// game.js
// (c) 2017 by Milan Gruner

// constants
var startPos = [52.3929931, 13.0934414];
var startZoom = 17;
var startCoords = new L.LatLng(startPos[0], startPos[1], startZoom);

var minZoom = 6;
var maxZoom = 19;

var testPoly = [
    [52.3929931, 13.0934414],
    [52.3929940, 13.0934412],
    [52.3929940, 13.0934000],
    [52.3929931, 13.0934000]
];

// game settings
var enemyCount = 8;
var enemyDist = 0.0005;

// colors
var primaryCircleColor = '#3af';
var darkerCircleColor = '#16a';

// globals
var map;
var posPopup;
var enemies = [];
var enemyPositions = [];

function init() {
	map = L.map('map').setView(startCoords, 13);

	var mapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var attribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var mapLayer = new L.TileLayer(mapUrl, {minZoom: minZoom, maxZoom: maxZoom, attribution: attribution});

	// set starting position
	map.setView(startCoords, startZoom);
	map.addLayer(mapLayer);

	// create enemies
	var angleSlice = (2 * Math.PI) / enemyCount;
	var currentAngle = 0;
	for(var i = 0; i < enemyCount; i++) {
		var xDiff = Math.sin(currentAngle) * enemyDist;
		var yDiff = Math.cos(currentAngle) * enemyDist;
		var enemyPos = [startPos[0]+xDiff, startPos[1]+yDiff];
		enemies[i] = L.marker(enemyPos).addTo(map);
		enemyPositions[i] = enemyPos;

		currentAngle += angleSlice;
	}

	// render enemy polygon
	var enemyPolygon = L.polygon(enemyPositions).addTo(map);

	// examples of decoration elements
	var marker = L.marker(startCoords).addTo(map);

	var circle = L.circle(startCoords, {
		color: primaryCircleColor,
		fillColor: darkerCircleColor,
		fillOpacity: 0.5,
		radius: 100
	}).addTo(map);

	var polygon = L.polygon(testPoly).addTo(map);

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
