import { ethers } from 'ethers';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { abi } from '../../constants/abi';
import { toast } from 'react-hot-toast';


export default function Create() {
	const [origin, setOrigin] = useState('');
	const [destination, setDestination] = useState('');
	const [departuretime, setDeparturetime] = useState('');
	const [fare, setFare] = useState('');
	const [seats, setSeats] = useState('');

	const { isConnected } = useAccount();

	const creatRide = async () => {
		const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');
		const signer = await provider.getSigner();
		const contract = new ethers.Contract('0xa60E34BcA5C6754Cd7e8DE227c7F9402AD5AC580', abi, signer);

		const createARide = await contract.createride(origin, destination, departuretime, fare, seats);
        await createARide.wait()
		console.log(createARide);
        toast("Ride created successfully")
	};

	return (
		<div>
			<div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-lg text-gray-900 mt-10">
				<h2 className="text-2xl font-semibold mb-4">Create Ride</h2>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						creatRide();
					}}
				>
					<div className="mb-4">
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
					<div className="mb-4">
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
					<div className="mb-4">
						<label htmlFor="departuretime" className="block font-semibold mb-1">
							Departure Time:
						</label>
						<input
							type="number"
							id="departuretime"
							name="departuretime"
							className="w-full border rounded py-2 px-3"
							placeholder="Enter departure time (e.g., 1300)"
							value={departuretime}
							onChange={(e) => setDeparturetime(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="fare" className="block font-semibold mb-1">
							Fare:
						</label>
						<input
							type="text"
							id="fare"
							name="fare"
							className="w-full border rounded py-2 px-3"
							placeholder="Enter fare"
							value={fare}
							onChange={(e) => setFare(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="seats" className="block font-semibold mb-1">
							Seats:
						</label>
						<input
							type="number"
							id="seats"
							name="seats"
							className="w-full border rounded py-2 px-3"
							placeholder="Enter number of seats"
							value={seats}
							onChange={(e) => setSeats(e.target.value)}
						/>
					</div>
					<button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
