import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import '../lib/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<title>A Map of Where to Buy Victoria Bus Tickets and Passes</title>
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
			{/* Global site tag (gtag.js) - Google Analytics */}
			<Script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-PLDECJ37ZE"
			></Script>
			<Script
				id="google-analytics-inline"
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-PLDECJ37ZE');`,
				}}
			></Script>
		</>
	);
}

export default MyApp;
