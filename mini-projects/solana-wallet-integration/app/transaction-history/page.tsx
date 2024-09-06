
import TransactionHistoryComponent from "@/components/transactionHistory";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";

const TransactionHistory = () => {
    const API_KEY = process.env.ALCHEMY_API_KEY;
    
    return ( 
        <section className="flex min-h-screen flex-col items-center justify-start bg-gray-900 p-6 pt-28">
            <TransactionHistoryComponent ApiKey={API_KEY!} key={API_KEY}/>
        </section>
     );
}
 
export default TransactionHistory;