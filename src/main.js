/* global google */

if (process.env.NODE_ENV == 'production' && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then(() => {
				console.log('service worker registered');
			})
			.catch(err => {
				console.log('service worker registration failed', err);
			});
	});
}

const locations = require('../locations.json');
const locationImage = require('./location.png');

const locationSize = 32;
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
					icon: {
						url: locationImage,
						scaledSize: {
							width: locationSize,
							height: locationSize
						}
					}
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
