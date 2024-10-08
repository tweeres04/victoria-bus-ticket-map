declare const google
declare const gtag: Gtag.Gtag

import Link from 'next/link'
import Head from 'next/head'

import { Loader } from '@googlemaps/js-api-loader'

import scrape from '../../lib/scrape'
import locationImage from '../../assets/location.png'
import { RefObject, useEffect, useRef } from 'react'

type Location = {
	lat: number
	lng: number
	name: string
	address: string
	isUmo: boolean
}

function useSendDisplayModeToAnalytics() {
	// From https://web.dev/customize-install/#detect-launch-type
	function getPWADisplayMode() {
		const isStandalone = window.matchMedia('(display-mode: standalone)').matches
		if (document.referrer.startsWith('android-app://')) {
			return 'twa'
		} else if (navigator.standalone || isStandalone) {
			return 'standalone'
		}
		return 'browser'
	}

	useEffect(() => {
		const displayMode = getPWADisplayMode()

		gtag('set', 'user_properties', {
			display_mode: displayMode,
		})
	}, [])
}

function useMap(locations: Location[], mapRef: RefObject<HTMLDivElement>) {
	useEffect(() => {
		async function initializeMap() {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
				version: 'weekly',
			})

			await loader.load()

			const locationSize = 32
			const victoriaLatLng = { lat: 48.425278, lng: -123.3651478 }
			const kelownaLatLng = { lat: 49.886335, lng: -119.496603 }
			const latLng =
				process.env.NEXT_PUBLIC_CITY === 'kelowna'
					? kelownaLatLng
					: victoriaLatLng

			let openInfoWindows: google.maps.InfoWindow[] = []

			const map = new google.maps.Map(mapRef.current, {
				center: latLng,
				zoom: 15,
			})

			locations.forEach(({ lat, lng, name, address, isUmo }) => {
				const infoWindow = new google.maps.InfoWindow({
					content: `
						<div class="mb-3" style="display: flex; gap: 1rem; place-items: center;">
							<h1 class="title" style="flex-grow: 1; margin-bottom: 0;">
								<strong>${name}</strong>
							</h1>
							${
								isUmo
									? ' <span class="tag is-primary is-large" title="Umo available here">Umo</span>'
									: ''
							}
						</div>
						<h3 class="subtitle">
							<a class="directions-link" href="https://google.ca/maps/place/${address}" target="_blank" data-location="${name}">${address}</a>
						</h3>
					`,
				})
				const marker = new google.maps.Marker({
					map,
					position: { lat, lng },
					title: `${name}\n${address}`,
				})
				marker.addListener('click', () => {
					infoWindow.open(map, marker)
					openInfoWindows.forEach((openInfoWindow) => {
						openInfoWindow.close()
					})
					openInfoWindows = []
					openInfoWindows.push(infoWindow)
					gtag('event', 'click_marker', {
						location_name: name,
						location_address: address,
					})
				})
			})

			if ('geolocation' in navigator) {
				let locationMarker: google.maps.Marker
				navigator.geolocation.watchPosition(
					({ coords: { latitude: lat, longitude: lng } }) => {
						if (locationMarker) {
							locationMarker.setPosition({ lat, lng })
						} else {
							const infoWindow = new google.maps.InfoWindow({
								content: '<p>Your location</p>',
							})
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
							})
							locationMarker.addListener('click', () => {
								infoWindow.open(map, locationMarker)
								gtag('event', 'click_user_location')
							})
							map.setCenter({ lat, lng })
						}
						gtag('set', 'user_properties', {
							lat,
							lng,
						})
					},
					(error) => {
						if (error.code === GeolocationPositionError.PERMISSION_DENIED) {
							gtag('set', 'user_properties', {
								geo_location_permission_denied: true,
							})
							return
						}

						gtag('event', 'exception', {
							description: error,
						})
					}
				)
			}

			document.addEventListener('click', (event) => {
				const origin = event?.target?.closest('a.directions-link')

				if (origin) {
					gtag('event', 'click_directions_link', {
						location_name: origin.dataset.location,
						location_address: origin.textContent,
					})
				}
			})
		}

		initializeMap()
	}, [locations, mapRef])
}

export default function Map({ locations }: { locations: Location[] }) {
	const mapRef = useRef<HTMLDivElement>(null)
	useMap(locations, mapRef)
	useSendDisplayModeToAnalytics()

	const city =
		process.env.NEXT_PUBLIC_CITY === 'kelowna' ? 'Kelowna' : 'Victoria'
	const title = `${city} Bus Ticket Map`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="robots" content="noindex" />
			</Head>
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
			<Link href="/" id="backLink">
				Back to homepage
			</Link>
		</>
	)
}

export async function getStaticProps() {
	const locations = await scrape()

	return {
		props: {
			locations,
		},
	}
}
