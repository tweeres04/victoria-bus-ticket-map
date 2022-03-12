declare const google;

import Link from 'next/link';

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
					content: `
						<div class="p-3">
							<h1 class="title">
								<strong>${name}</strong>
							</h1>
							<h3 class="subtitle">
								<a href="https://google.ca/maps/place/${address}" target="_blank">${address}</a>
							</h3>
						</div>
					`,
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
				let locationMarker;
				navigator.geolocation.watchPosition(
					({ coords: { latitude: lat, longitude: lng } }) => {
						locationMarker?.setMap(null);
						const infoWindow = new google.maps.InfoWindow({
							content: '<p>Your location</p>',
						});
						locationMarker = new google.maps.Marker({
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
			#map {
				width: 100%;
				height: 90vh;
			}

			@media (min-width: 1025px), (display-mode: standalone) {
				#map {
					height: 100vh;
				}
			}

			#backLink {
				position: absolute;
				bottom: 1.5rem;
				left: 1rem;
			}
		`}</style>
			<div id="map" ref={mapRef}></div>
			<Link href="/">
				<a id="backLink">Back to homepage</a>
			</Link>
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
