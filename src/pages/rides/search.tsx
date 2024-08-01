import { ethers } from 'ethers';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { abi } from '../../constants/abi';

export default function Search() {
	const { isConnected } = useAccount();
	const [origin, setOrigin] = useState('');
	const [destination, setDestination] = useState('');
	const [loading, setLoading] = useState(false);
	const [rides, setRides] = useState<any[]>([]);

	const searchRides = async () => {
		setLoading(true);
		const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');

		const contract = new ethers.Contract('0xa60E34BcA5C6754Cd7e8DE227c7F9402AD5AC580', abi, provider);

		const rideCount = await contract.ridecount();
		console.log(Number(rideCount));

		let validRides = [];

		for (let i = 0; i < rideCount; i++) {
			const ride = await contract.rides(i);
			console.log('1:' + ride.origin);

			// validRides.push(ride);

			if (ride.origin === origin && ride.destination === destination && Number(ride.seats._hex.toString()) > 0) {
				validRides.push(ride);
			}
			console.log('2:' + validRides);
		}

		if (validRides.length === 0) {
			toast('No rides found');
		}
		setRides(validRides);
		setLoading(false);
	};

	const bookRide = async (rideId: Number) => {
		const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');
		const signer = await provider.getSigner();
		const contract = new ethers.Contract('0xa60E34BcA5C6754Cd7e8DE227c7F9402AD5AC580', abi, signer);

		const _bookRide = await contract.bookRide(rideId);
		await _bookRide.wait();
		console.log(_bookRide);
		toast('Ride booked successfully');
	};

	console.log(rides);

	return (
		<div className="search_page py-20 overflow-hidden min-h-screen">
			<div className="max-w-4xl relative mx-auto bg-white shadow-md p-8 rounded-lg text-gray-900 pt-10 z-50 ">
				<h2 className="text-2xl font-semibold mb-4">Search Ride</h2>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						searchRides();
					}}
					className="flex items-center space-x-5"
				>
					<div className="mb-4 flex-1">
						<label htmlFor="origin" className="block font-semibold mb-1">
							Origin:
						</label>
						<input
							type="text"
							id="origin"
							name="origin"
							className="w-full border rounded py-2 px-3"
							placeholder="Enter origin"
							value={origin}
							onChange={(e) => setOrigin(e.target.value)}
						/>
					</div>
					<div className="mb-4  flex-1">
						<label htmlFor="destination" className="block font-semibold mb-1">
							Destination:
						</label>
						<input
							type="text"
							id="destination"
							name="destination"
							className="w-full border rounded py-2 px-3"
							placeholder="Enter destination"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`w-full  flex-1 ${
							loading ? 'bg-gray-100 text-gray-500' : 'bg-blue-500 text-white'
						} py-2 px-4 rounded-lg`}
					>
						{loading ? 'Searching...' : 'Search'}
					</button>
				</form>

				{rides.length > 0 && (
					<>
						<div className="relative overflow-x-auto">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-lg">
									<tr>
										<th className="px-6 py-3">Origin</th>
										<th className="px-6 py-3">Destination</th>
										<th className="px-6 py-3">Departure Time</th>
										<th className="px-6 py-3">Price (Rs)</th>
										<th className="px-6 py-3">Seats</th>
										<th className="px-6 py-3"></th>
									</tr>
								</thead>
								<tbody>
									{rides.map((ride, index) => {
										return (
											<tr
												key={index}
												className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
											>
												<td className="px-6 capitalize py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{ride[1]}
												</td>
												<td className="px-6 capitalize py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{ride[2]}
												</td>
												<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{Number(ride[3]._hex.toString())}
												</td>
												<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{Number(ride[4]._hex.toString())}
												</td>
												<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{Number(ride[5]._hex.toString())}
												</td>
												<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
													<button
														className="bg-white text-gray-900 px-4 py-1 rounded-lg text-center "
														onClick={() => {
															bookRide(ride[0]._hex.toString());
														}}
													>
														Book
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
