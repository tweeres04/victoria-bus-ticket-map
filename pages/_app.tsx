import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../lib/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<title>Where to Buy Victoria Bus Tickets and Passes</title>
				<meta
					name="description"
					content="I got annoyed with BC Transit's dumb page for where to buy bus tickets and passes in Victoria, so I scraped all their data and threw it on a map. Icon made by Smashicons"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#EA4335" />
				<link rel="shortcut icon" href="/bus-stop.png" type="image/x-icon" />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
