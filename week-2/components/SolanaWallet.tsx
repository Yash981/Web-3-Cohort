"use client"

import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl"
import { useState } from "react";
import { CopyIcon, Trash2 } from "lucide-react";


type Props = {
    mnemonic: string
}
interface publicKeyInterface {
    toBase58(): string;
    balance: string
}
export const SolanaWallet = ({ mnemonic }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState<publicKeyInterface[]>([]);
    console.log(publicKeys)
    const handleSolanaWallet = async () => {
        const seed = mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        //@ts-ignore
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        let wallet = new PublicKey(keypair.publicKey);

        const balance = `${(await connection.getBalance(wallet)) / LAMPORTS_PER_SOL} SOL`

        const walletInfo: publicKeyInterface = {
            toBase58: wallet.toBase58.bind(wallet),
            balance: balance,
        };
    
        setCurrentIndex(currentIndex + 1);

        setPublicKeys([...publicKeys, walletInfo]);
    }
    return (
        <div className="w-full mt-10">
            <div className="w-full flex justify-between">
            <button onClick={handleSolanaWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                Add SOL wallet
            </button>
           {publicKeys.length > 0 && <button onClick={() => setPublicKeys([])} disabled={publicKeys.length === 0} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 disabled:cursor-not-allowed">Delete All Wallets</button>}
            </div>
            <div className="flex flex-col gap-2 overflow-auto max-h-48 overflow-x-hidden ">
                {publicKeys.map((p, idx) => <div key={idx} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5 justify-between">
                    <div className="w-full">
                        SOL -
                        <span >{p.toBase58()}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="flex w-32">{p.balance}</span>
                        <CopyIcon className="ml-2 cursor-pointer hover:text-blue-500 active:text-blue-700" onClick={() => navigator.clipboard.writeText(p.toBase58())} />
                        <Trash2 className="ml-2 cursor-pointer hover:text-red-500 active:text-red-700" onClick={() => setPublicKeys(publicKeys.filter((_, i) => i !== idx))} />
                    </div>

                </div>)}
            </div>
        </div>
    );
}