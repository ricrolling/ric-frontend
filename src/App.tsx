import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  darkTheme,
  RainbowKitProvider,
  Theme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  goerli,
  sepolia,
  taikoTestnetSepolia,
  lineaTestnet,
  foundry,
  optimismGoerli,
  polygonMumbai,
  polygonZkEvmTestnet,
  zkSyncTestnet,
} from 'wagmi/chains';
import merge from 'lodash.merge';
import {
  injectedWallet,
  metaMaskWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { publicProvider } from 'wagmi/providers/public';
import { Layout } from './Layout';
import { RollupList } from './pages/RollupList';
import '@rainbow-me/rainbowkit/styles.css';
import './App.css';
import { Landing } from './pages/Landing';
import { ProviderList } from './pages/ProviderList';

const { chains, publicClient } = configureChains(
  [
    foundry,
    lineaTestnet,
    taikoTestnetSepolia,
    goerli,
    sepolia,
    polygonMumbai,
    polygonZkEvmTestnet,
    zkSyncTestnet,
    optimismGoerli
  ],
  [publicProvider()],
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: connectorsForWallets([
    {
      groupName: 'Reccomended',
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({ chains, projectId: 'RicRolling' }),
        safeWallet({ chains }),
      ],
    },
  ]),
  publicClient,
});

const customTheme = merge(darkTheme({ fontStack: 'system' }), {
  fonts: {
    body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
  },
} as Theme);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={customTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<Layout />}>
              <Route path="/rollups" element={<RollupList />} />
              <Route path="/providers" element={<ProviderList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
