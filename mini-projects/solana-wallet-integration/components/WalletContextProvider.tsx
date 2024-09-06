"use client"
import { FC, ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
 
const WalletContextProvider: FC<{ children: ReactNode,ApiKey: string }> = ({ children, ApiKey }) => {
  return (
    <ConnectionProvider endpoint={`https://solana-devnet.g.alchemy.com/v2/${ApiKey}`}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
 
export default WalletContextProvider;