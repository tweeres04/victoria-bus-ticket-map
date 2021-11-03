declare const google;

import { Loader } from '@googlemaps/js-api-loader';

import scrape from '../../lib/scrape';
import locationImage from '../../assets/location.png';
import { useEffect, useRef } from 'react';

export default function Map({ locations }) {
	const mapRef = useRef();
	useEffect(() => {
		async function initializeMap() {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
				version: 'weekly',
			});

			await loader.load();

			const locationSize = 32;
			const victoriaLatLng = { lat: 48.425278, lng: -123.3651478 };

			let openInfoWindows = [];

			const map = new google.maps.Map(mapRef.current, {
				center: victoriaLatLng,
				zoom: 15,
			});

			locations.forEach(({ lat, lng, name, address }) => {
				const infoWindow = new google.maps.InfoWindow({
					content: `<p><strong>${name}</strong></p><p>${address}</p>`,
				});
				const marker = new google.maps.Marker({
					map,
					position: { lat, lng },
					title: `${name}\n${address}`,
				});
				marker.addListener('click', () => {
					infoWindow.open(map, marker);
					openInfoWindows.forEach((openInfoWindow) => {
						openInfoWindow.close();
					});
					openInfoWindows = [];
					openInfoWindows.push(infoWindow);
				});
			});

			if ('geolocation' in navigator) {
				let positionSet = false;
				navigator.geolocation.watchPosition(
					({ coords: { latitude: lat, longitude: lng } }) => {
						const infoWindow = new google.maps.InfoWindow({
							content: '<p>Your location</p>',
						});
						const locationMarker = new google.maps.Marker({
							map,
							position: { lat, lng },
							title: 'Your location',
							icon: {
								url: locationImage.src,
								scaledSize: {
									width: locationSize,
									height: locationSize,
								},
							},
						});
						locationMarker.addListener('click', () => {
							infoWindow.open(map, locationMarker);
						});

						if (!positionSet) {
							map.setCenter({ lat, lng });
							positionSet = true;
						}
					}
				);
			}
		}

		initializeMap();
	}, [locations]);

	return (
		<>
			<style>{`
			body {
				margin: 0;
				font-size: 1.5em;
			}

			#map {
				width: 100%;
				height: 90vh;
			}

			@media (min-width: 1025px), (display-mode: standalone) {
				#map {
					height: 100vh;
				}
			}
		`}</style>
			<div id="map" ref={mapRef}></div>
		</>
	);
}

export async function getStaticProps() {
	const locations = await scrape();

	return {
		props: {
			locations,
		},
	};
}
