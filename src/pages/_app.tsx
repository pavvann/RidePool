import Header from '@/components/header';
import '@/styles/globals.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseSepolia, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains([baseSepolia], [publicProvider()]);
const { connectors } = getDefaultWallets({
	appName: 'RidePool',
	projectId: '9d76ee4cef7c5b8d16e72986446c7841',
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains} modalSize="compact">
				<Header>
					<Component {...pageProps} />
					<Toaster />
				</Header>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
