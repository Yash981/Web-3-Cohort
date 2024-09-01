import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const AirDrop = () => {
    const [amount, setAmount] = useState(0);
    const wallet = useWallet();
    const { connection } = useConnection()

    const reQuestAirDrop = async () => {
        if (!wallet.publicKey) {
            return;
        }
        try {

            await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);

            console.log(wallet.publicKey.toString());
            alert(`Airdrop successful ${amount} SOL sent to ${wallet.publicKey.toString()}`,);

        } catch (error) {

            console.error(error);
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
            <h1 style={{ textAlign: "center" }}>AirDrop SOL from Devnet</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }} >
                <input type="text" value={amount > 0 ? amount : ""} placeholder="Enter Amount" onChange={(e) => setAmount(Number(e.target.value))} style={{ width: "300px" , height: "30px", borderRadius: "5px", border: "1px solid #fff", padding: "10px", outline: "none", textAlign: "center", }} onKeyDown={(e) => e.key === "Enter" && reQuestAirDrop()}/>
                <button onClick={reQuestAirDrop} disabled={!wallet.publicKey || amount < 1}style={{ cursor: wallet.publicKey && amount > 0 ? "pointer" : "not-allowed"}} >Request Airdrop</button>
            </div>
        </div>
    );
}

export default AirDrop;