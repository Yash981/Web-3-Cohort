"use client"
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, GetVersionedTransactionConfig } from "@solana/web3.js";
import { useEffect, useState } from "react";


const TransactionHistoryComponent = ({ ApiKey }: { ApiKey: string }) => {

    const { publicKey } = useWallet();
    const [transactions, setTransactions] = useState<any[]>([]);
    useEffect(() => {
        const fetchTransactionsHistory = async () => {
            if (!publicKey) return;
            const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/${ApiKey}`, "confirmed");
            const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });

            const config: GetVersionedTransactionConfig = {
                maxSupportedTransactionVersion: 0, // Adjust based on your requirements
            };

            // Fetch each transaction details based on the signatures
            const transactionPromises = signatures.map(async (signatureInfo) => {
                const transaction = await connection.getTransaction(signatureInfo.signature, config);
                return transaction;
            });

            const fetchedTransactions = await Promise.all(transactionPromises);
            setTransactions(fetchedTransactions);
        }
        fetchTransactionsHistory();
    }, [ApiKey, publicKey])
    console.log(transactions);
    return (
        <>
            {
                transactions.length > 0 ? (
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-100 mb-8 text-center">Transaction History</h1>
                        {transactions.map((currentTransaction: any) => (
                            <>
                                <li key={currentTransaction.blockTime} className="text-gray-300 hover:text-white transition-colors duration-200">
                                    {currentTransaction.blockTime}
                                </li>

                            </>
                        ))
                        }
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-100 mb-8 text-center">No Transaction History</h1>
                    </div>
                )
            }
        </>
    );
}

export default TransactionHistoryComponent;