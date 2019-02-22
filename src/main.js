/* global google */

const locations = require('../locations.json');

window.initMap = function initMap() {
	const victoriaLatLng = { lat: 48.425278, lng: -123.3651478 };

	const map = new google.maps.Map(document.getElementById('map'), {
		center: victoriaLatLng,
		zoom: 15
	});

	locations.forEach(({ lat, lng, name, address }) => {
		const infoWindow = new google.maps.InfoWindow({
			content: `<p>${name}</p><p>${address}</p>`
		});
		const marker = new google.maps.Marker({
			map,
			position: { lat, lng },
			title: `${name}\n${address}`
		});
		marker.addListener('click', () => {
			infoWindow.open(map, marker);
		});
		return marker;
	});
};
