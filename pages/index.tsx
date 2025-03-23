import Image from 'next/image'
import Link from 'next/link'

import heroImage from '../public/hero.png'
import kelownaHeroImage from '../public/kelowna-hero.png'

function Home() {
	const cityName =
		process.env.NEXT_PUBLIC_CITY === 'kelowna' ? 'Kelowna' : 'Victoria'
	const heroImageUrl =
		process.env.NEXT_PUBLIC_CITY === 'kelowna' ? kelownaHeroImage : heroImage
	return (
		<>
			<div className="hero is-halfheight is-primary">
				<div className="hero-body">
					<div className="container">
						<div className="columns is-vcentered">
							<div className="column">
								<h1 className="title">
									Easily find the nearest place to buy Umo cards in {cityName}
								</h1>
								<h2 className="subtitle">
									Every spot quickly findable on a map.
								</h2>
								{cityName === 'Victoria' ? (
									<p className="mb-5">
										Helping bus riders find umo cards 125+ times per month
									</p>
								) : null}
								<Link
									href="/map"
									className="button is-primary is-large is-inverted"
								>
									See the map →
								</Link>
							</div>
							<div className="column has-text-centered">
								<Link href="/map">
									<Image
										src={heroImageUrl}
										alt={`Map with markers showing where to buy bus tickets in ${cityName}`}
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer className="footer">
				<div className="content has-text-centered">
					<p>
						{cityName} Bus Ticket Map by{' '}
						<a href="https://tweeres.ca">Tyler Weeres</a>
					</p>
					<p>
						<a href="https://github.com/tweeres04/victoria-bus-ticket-map">
							Source code
						</a>
					</p>
					<p>Icon by Smashicons</p>
				</div>
			</footer>
		</>
	)
}

export default Home
