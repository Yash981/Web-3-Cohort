"use client"
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { CopyIcon, Trash2 } from "lucide-react";


interface address {
    toBase58(): string;
    balance?: string;

}
const API = process.env.NEXT_PUBLIC_API_URL!

const getBalance = async (address: string) => {
    console.log(API, 'API');
    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: 1,
                jsonrpc: "2.0",
                method: "eth_getBalance",
                params: [address, "latest"],
            }),
        });

        const data = await response.json();
        console.log(data, 'data');
        const balanceInWei = data.result;
        const balanceInEther = parseFloat(balanceInWei) / 1e18;
        return balanceInEther.toString();
    } catch (error) {
        console.error("Error fetching balance:", error);
        return "Error";
    }
};

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState<address[]>([]);
    const [checkBalance, setCheckBalance] = useState<boolean>(false);
    const [balanceMap, setBalanceMap] = useState<{[key: string]: string }>({});
    const [fetchingAddress, setFetchingAddress] = useState<string | null>('');
    const HandleEthWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        setCurrentIndex(currentIndex + 1);

        setAddresses([...addresses, { toBase58: () => wallet.address }]);
    }
    const handleFetchBalance = async (address: string) => {
        console.log(address, 'address');
        setFetchingAddress(address);
        const balance = await getBalance(address);
        setCheckBalance(!checkBalance);
        console.log(balance, 'balanceeeee');
        setBalanceMap((prevMap) => ({ ...prevMap, [address]: balance }));
        setFetchingAddress(null);
        return balance;
    }

    return (
        <div className="w-full mt-10 ">
            <div className="w-full flex justify-between">
                <button onClick={HandleEthWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                    Add ETH wallet
                </button>
                {addresses.length > 0 && <button onClick={() => setAddresses([])} disabled={addresses.length === 0} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 disabled:cursor-not-allowed">Delete All Wallets</button>}
            </div>

            <div className="flex flex-col gap-2 overflow-auto max-h-48 overflow-x-hidden ">
                {addresses.map((p, idx) => <div key={idx} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5 justify-between">
                    <div className="w-full flex">
                        ETH -
                        <span >{p.toBase58()}</span>
                    </div>
                    <div className="flex gap-4">
                    {fetchingAddress === p.toBase58() ? (
                            <span className="flex w-28">Loading...</span>
                        ) : balanceMap[p.toBase58()] ? (
                            <span className="flex w-28">{balanceMap[p.toBase58()]} ETH</span>
                        ) : (
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-32 justify-center flex" onClick={() => handleFetchBalance(p.toBase58())}>
                                Check balance
                            </button>
                        )}

                        <CopyIcon className="ml-2 cursor-pointer hover:text-blue-500 active:text-blue-700" onClick={() => navigator.clipboard.writeText(p.toBase58())} />
                        <Trash2 className="ml-2 cursor-pointer hover:text-red-500 active:text-red-700" onClick={() => setAddresses(addresses.filter((_, i) => i !== idx))} />
                    </div>
                </div>)}
            </div>

        </div>
    )
}