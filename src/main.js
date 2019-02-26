/* global google */

const locations = require('../locations.json');
const locationImage = require('./location.png');

const victoriaLatLng = { lat: 48.425278, lng: -123.3651478 };

window.initMap = function initMap() {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lng } }) => {
				const infoWindow = new google.maps.InfoWindow({
					content: '<p><strong>Your location</strong></p>'
				});
				const locationMarker = new google.maps.Marker({
					map,
					position: { lat, lng },
					title: 'Your location',
					icon: locationImage
				});
				locationMarker.addListener('click', () => {
					infoWindow.open(map, locationMarker);
				});

				map.setCenter({ lat, lng });
			}
		);
	}

	const map = new google.maps.Map(document.getElementById('map'), {
		center: victoriaLatLng,
		zoom: 15
	});

	locations.forEach(({ lat, lng, name, address }) => {
		const infoWindow = new google.maps.InfoWindow({
			content: `<p><strong>${name}</strong></p><p>${address}</p>`
		});
		const marker = new google.maps.Marker({
			map,
			position: { lat, lng },
			title: `${name}\n${address}`
		});
		marker.addListener('click', () => {
			infoWindow.open(map, marker);
		});
	});
};
