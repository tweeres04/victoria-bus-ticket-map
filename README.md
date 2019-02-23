# victoria-bus-ticket-map

Everywhere you can buy bus tickets and passes in Victoria on a map

### What's this?

I got annoyed with the dumb list at https://bctransit.com/victoria/fares/where-to-buy, so I scraped all their data and threw it on a map

### How do I use it?

##### API Keys

Get a Google Maps API key and enable Google Maps and Geocoding in your project. Put your API key in a `.env` file in the root of the project and call it `GOOGLE_MAPS_KEY`

##### Scraping

Scrape their page with `yarn start:scrape`. It'll generate `addresses.json` in the root of the project.

##### The map

The map needs the `addresses.json` file from scraping, so do that first.

Build the site with `yarn build`

Start the dev server with `yarn start`
