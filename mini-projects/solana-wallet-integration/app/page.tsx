"use client";
import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [ShowBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showCopyIcon, setShowCopyIcon] = useState(false);

  const handleClick = async () => {
    if (!wallet.publicKey) return toast.error("Wallet not connected",{
      duration: 2000,

    });
    setShowBalance(!ShowBalance);
  };

  useEffect(() => {
    if (!wallet.publicKey) return;
    if (wallet.publicKey) {
      const getBalance = async () => {
        const balance = await connection.getBalance(wallet.publicKey!);
        setBalance(balance / LAMPORTS_PER_SOL);
      };
      getBalance();
    }
  }, [connection, wallet.publicKey]);
  const handleCopy = () => {
    if (!wallet.publicKey) return;
    navigator.clipboard.writeText(wallet.publicKey!.toBase58());
    setShowCopyIcon(true);
    setTimeout(() => setShowCopyIcon(false), 2000)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-900 p-6 pt-28">
      <div className="bg-zinc-600 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-200 mb-8 text-center">Solana Wallet Dashboard</h1>

        
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-200">Wallet Address:</h3>
            <div className="flex">
              <p className={`text-gray-200 text-lg font-mono truncate hover:cursor-copy ${!wallet.publicKey ? "blur-sm" : ""}`} onClick={handleCopy}>
                {wallet.publicKey ? wallet.publicKey.toBase58(): "svhjkjhgshghj282682bs82tgs-1bsh52hs91vssw"}
              </p>
              {!showCopyIcon ? (<Copy className={`inline-block ml-2 text-white hover:cursor-copy ${!wallet.publicKey ? "blur-sm" : ""}`} size={20} onClick={handleCopy}/>) : (<Check className={`inline-block ml-2 text-white ${!wallet.publicKey ? "blur-sm" : ""}`}  size={20} />)}
            </div>
          </div>
        

        
          <Button
            onClick={handleClick}
            className="w-full py-3 px-6 mb-6 bg-teal-400 hover:bg-teal-400 text-black font-semibold rounded-lg transition duration-300"
          >
            {!ShowBalance ? "Show Balance" : "Hide Balance"}
          </Button>
        

        
          <div className="mt-4 text-gray-100 text-xl text-center">
            <p className={`${!ShowBalance ? "blur-md" : ""}`}>Balance: {balance} SOL</p>
          </div>
      
      </div>
    </main>
  );
}
