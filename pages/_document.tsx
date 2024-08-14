import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	const domain = process.env.NEXT_PUBLIC_DOMAIN
	const heroFilename =
		process.env.NEXT_PUBLIC_CITY === 'kelowna' ? 'kelowna-hero.png' : 'hero.png'
	const heroUrl = `https://${domain}/${heroFilename}`
	const city =
		process.env.NEXT_PUBLIC_CITY === 'kelowna' ? 'Kelowna' : 'Victoria'
	const title = `${city} Bus Ticket Map`
	return (
		<Html lang="en">
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="theme-color" content="#EA4335" />
				<link rel="shortcut icon" href="/bus-stop.png" type="image/x-icon" />
				<link rel="manifest" href="/manifest.json" />

				<meta property="og:title" content={title} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={domain} />
				<meta property="og:image" content={heroUrl} />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
