require('dotenv').config();
const scrapeIt = require('scrape-it');
const fs = require('fs');
const { promisify } = require('util');
const axios = require('axios');

const writeFileAsync = promisify(fs.writeFile);

const outputFilename = 'locations.json';
const greaterVictoriaBounds = '48.298154,-123.811626|48.719870,-123.224317';

async function scrape() {
	try {
		let {
			data: { locations }
		} = await scrapeIt('https://bctransit.com/victoria/fares/where-to-buy', {
			locations: {
				listItem: 'tr',
				data: {
					name: 'th',
					address: 'td'
				}
			}
		});
		locations = locations.filter(l => l.address);
		locations = await Promise.all(
			locations.map(async l => {
				try {
					const {
						data: {
							results: [
								{
									geometry: { location }
								}
							]
						}
					} = await axios.get(
						`https://maps.googleapis.com/maps/api/geocode/json?address=${
							l.address
						}&region=ca&bounds=${greaterVictoriaBounds}&key=${
							process.env.GOOGLE_MAPS_KEY
						}`
					);

					return {
						...location,
						...l
					};
				} catch (err) {
					console.log("Couldn't get a location for", l);
				}
			})
		);
		locations = locations.filter(l => l);
		await writeFileAsync(outputFilename, JSON.stringify(locations, null, 2));

		console.log(`Wrote to ${outputFilename}`);
	} catch (err) {
		console.error(err);
	}
}

scrape();
