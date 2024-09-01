import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import AirDrop from './AirDrop';
import ShowBalance from './showBalance';
import { SignMessage } from './signMessage';
import SendTokens from './sendTokens';
import { Buffer } from 'buffer';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useMemo } from 'react';
window.Buffer = Buffer;



function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <div>
            <AirDrop />
            <ShowBalance />
            <SignMessage />
            <SendTokens />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
