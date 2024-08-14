import Image from 'next/image'
import Link from 'next/link'

import heroImage from '../public/hero.png'

function Home() {
	return (
		<>
			<div className="hero is-halfheight is-primary">
				<div className="hero-body">
					<div className="container">
						<div className="columns is-vcentered">
							<div className="column">
								<h1 className="title">
									Easily find the nearest place to buy bus passes and tickets in
									Greater Victoria
								</h1>
								<h2 className="subtitle">
									Every spot easily findable on a map. Umo locations clearly
									labeled.
								</h2>
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
										src={heroImage}
										alt="Map with markers showing where to buy bus tickets in Victoria"
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
						Victoria Bus Ticket Map by{' '}
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
