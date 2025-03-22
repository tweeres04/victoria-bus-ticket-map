import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import '../lib/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
	const cityName =
		process.env.NEXT_PUBLIC_CITY === 'kelowna' ? 'Kelowna' : 'Victoria'
	const title = `A Map of Where to Buy ${cityName} Bus Tickets and Passes`
	const description = `Easily find the nearest place to buy bus passes and tickets in ${cityName}. Every spot easily findable on a map. Umo locations labeled.`
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
			{/* Global site tag (gtag.js) - Google Analytics */}
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_KEY}`}
			></Script>
			<script
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', '${process.env.NEXT_PUBLIC_GA_KEY}');`,
				}}
			></script>
			{/* Ahrefs analytics */}
			<script
				src="https://analytics.ahrefs.com/analytics.js"
				data-key={process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY}
				async
			></script>
		</>
	)
}

export default MyApp
