import scrapeIt from 'scrape-it'
import axios from 'axios'

const greaterVictoriaBounds = '48.298154,-123.811626|48.719870,-123.224317'
const kelownaBounds = '49.7679093,-119.6519788|49.7549032,-119.6507995'
const kitimatBounds = '53.9530151,-128.8626743|53.9530151,-128.8626743'
const nanaimoBounds = '49.400393, -124.542531|49.114119, -123.785385'

export default async function scrape() {
	try {
		let {
			data: { locations },
		} = await scrapeIt('https://bctransit.com/nanaimo/fares', {
			locations: {
				listItem: '#wheretobuy tr:not(.title-row)',
				data: {
					name: 'th',
					address: 'td:nth-of-type(1)',
				},
			},
		})
		locations = locations.filter((l) => l.address)
		locations = await Promise.all(
			locations.map(async (l) => {
				try {
					const {
						data: {
							results: [
								{
									geometry: { location },
								},
							],
						},
					} = await axios.get(
						`https://maps.googleapis.com/maps/api/geocode/json?address=${l.address}&region=ca&bounds=${nanaimoBounds}}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
					)

					return {
						...location,
						...l,
					}
				} catch (err) {
					console.log("Couldn't get a location for", l)
				}
			})
		)
		locations = locations.filter((l) => l)

		return locations
	} catch (err) {
		console.error(err)
	}
}
