import Head from 'next/head';
import { useAccount } from 'wagmi';

import Link from 'next/link';

const RenderCard = ({ label, link, image }: any) => {
	return (
		<div className="border grid place-items-center rounded-lg border-gray-900 relative">
			<img className="relative rounded-lg" src={image} width={300} />
			<Link
				className={
					'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 px-5 py-2 rounded-lg text-center absolute bottom-[-20px]'
				}
				href={link}
			>
				{label}
			</Link>
		</div>
	);
};

export default function Home() {
	const { isConnected } = useAccount();

	const renderButton = () => {
		if (isConnected) {
			return (
				<div className="place-items-center grid grid-cols-2 gap-10 divide-x">
					<RenderCard
						label="Create a Ride"
						link="/rides/create"
						image="https://images.pexels.com/photos/1237528/pexels-photo-1237528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					/>

					<RenderCard
						label="Book a Ride"
						link="/rides/search"
						image="https://images.pexels.com/photos/3593923/pexels-photo-3593923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					/>
				</div>
			);
		}
	};

	return (
		<div>
			<Head>
				<title>RidePool</title>
				<meta name="description" content="RidePool" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				<div className="max-w-5xl mx-auto p-2 text-white rounded-lg  py-8 z-50 relative">
					<div className="text-center">
						<h1 className={'font-bold text-3xl'}>Welcome to RidePool</h1>
						<p className="mb-20 py-2">Your pick of rides at low prices</p>
					</div>

					{renderButton()}
				</div>
			</div>
		</div>
	);
}
