import Image from 'next/image';
import Link from 'next/link';

import 'bulma/css/bulma.min.css';
import heroImage from '../assets/hero.png';

function Home() {
	return (
		<>
			<div className="hero is-halfheight">
				<div className="hero-body">
					<div className="container">
						<div className="columns is-vcentered">
							<div className="column">
								<h1 className="title">
									Easily find the nearest place to buy bus passes and tickets in
									Greater Victoria
								</h1>
								<h2 className="subtitle">
									Every spot easily findable on a map. No more scrolling through
									a huge list.
								</h2>
								<Link href="/map">
									<a className="button is-primary is-large">See the map</a>
								</Link>
							</div>
							<div className="column has-text-centered">
								<a href="/map/">
									<Image
										src={heroImage}
										alt="Map with markers showing where to buy bus tickets in Victoria"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
