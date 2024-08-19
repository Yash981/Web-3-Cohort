"use client"
import { generateMnemonic } from "bip39";
import { useState } from "react";
import { SolanaWallet } from "@/components/SolanaWallet";
import { EthWallet } from "@/components/EthereumWallet";

export default function Home() {
  const [mnemonic, setMnemonic] = useState('');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={async function () {
        const mn = generateMnemonic();
        setMnemonic(mn)
      }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Seed Phrase
      </button>
      <p className="blur-sm hover:blur-none mt-2">{mnemonic}</p>

      {mnemonic && <div className="w-full flex flex-col gap-2">
        <SolanaWallet mnemonic={mnemonic} />
        <EthWallet mnemonic={mnemonic} />
      </div>}
    </main>
  );
}
