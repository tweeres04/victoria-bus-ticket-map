import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import '../lib/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>A Map of Where to Buy Victoria Bus Tickets and Passes</title>
				<meta
					name="description"
					content="Easily find the nearest place to buy bus passes and tickets in Greater Victoria. Every spot easily findable on a map. Umo locations labeled."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
			{/* Global site tag (gtag.js) - Google Analytics */}
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-PLDECJ37ZE"></Script>
			<script
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-PLDECJ37ZE');`,
				}}
			></script>
		</>
	)
}

export default MyApp
