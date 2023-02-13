import "./App.css";
import { Header, Footer, SendTransaction } from "./components";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum, goerli],
    [
        alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
        publicProvider(),
    ]
);

const { connectors } = getDefaultWallets({
    appName: "Simple Dapp",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

function App() {
    const { isConnected } = useAccount();
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <div className="flex flex-col justify-between h-screen">
                    <Header />
                    <main className="flex justify-center items-center">
                        {isConnected ? (
                            <SendTransaction />
                        ) : (
                            <div className="text-center">
                                <h1 className="text-2xl">Connect Wallet</h1>
                                <p className="text-gray-500">
                                    Connect your wallet to send transactions
                                </p>
                            </div>
                        )}
                    </main>
                    <Footer />
                </div>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;
