import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
	return (
		<Html>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="theme-color" content="#EA4335" />
				<link rel="shortcut icon" href="/bus-stop.png" type="image/x-icon" />
				<link rel="manifest" href="/manifest.json" />

				<meta property="og:title" content="Victoria Bus Ticket Map" />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://victoriabusticketmap.tweeres.ca"
				/>
				<meta
					property="og:image"
					content="https://victoriabusticketmap.tweeres.ca/bus-stop.png"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
				{/* Global site tag (gtag.js) - Google Analytics */}
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-PLDECJ37ZE"
				></Script>
				<Script
					id="google-analytics-inline"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-PLDECJ37ZE');`,
					}}
				></Script>
			</body>
		</Html>
	)
}
