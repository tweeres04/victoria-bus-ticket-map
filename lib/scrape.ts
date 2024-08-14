import scrapeIt from 'scrape-it'
import axios from 'axios'
import { startCase } from 'lodash'

type Location = {
	name: string
	address: string
	isUmo: boolean
}

const greaterVictoriaBounds = '48.298154,-123.811626|48.719870,-123.224317'
const kelownaBounds = '50.086336,-119.804995|49.765464, -119.146236'

const bounds =
	process.env.NEXT_PUBLIC_CITY === 'kelowna'
		? kelownaBounds
		: greaterVictoriaBounds

export default async function scrape() {
	const cityUrlPart =
		process.env.NEXT_PUBLIC_CITY === 'kelowna' ? 'kelowna' : 'victoria'
	try {
		let {
			data: { locations },
		} = await scrapeIt(
			`https://bctransit.com/${cityUrlPart}/fares/where-to-buy`,
			{
				locations: {
					listItem: 'tr',
					data: {
						name: {
							selector: 'td.column-1',
							convert: (n: string) =>
								startCase(n.replace('Umo', '').trim().toLowerCase()),
						},
						address: { selector: 'td.column-2' },
						isUmo: {
							selector: 'td.column-1',
							convert: (n: string) => n.includes('Umo'),
						},
					},
				},
			}
		)
		locations = locations.filter((l: Location) => l.address !== '')
		locations = await Promise.all(
			locations.map(async (l: Location) => {
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
						`https://maps.googleapis.com/maps/api/geocode/json?address=${l.address}&region=ca&bounds=${bounds}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
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
