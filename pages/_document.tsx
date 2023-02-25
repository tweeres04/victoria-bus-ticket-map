import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
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
			</body>
		</Html>
	)
}
