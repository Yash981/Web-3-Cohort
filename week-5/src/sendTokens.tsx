import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";

const SendTokens = () => {
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(0);
    const wallet = useWallet();
    const { connection } = useConnection();

    const handleSendTokens = async () => {
        if(!wallet.publicKey) return alert('Please connect your wallet');
        console.log(wallet.publicKey,'wallet.publicKey');
        const transaction = new Transaction()
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(to),
                lamports: amount * LAMPORTS_PER_SOL
            })
        )
        try {
            const signature = await wallet.sendTransaction(transaction, connection);
            console.log(`Transaction successful with signature: ${signature}`);
        } catch (error) {

            console.error('Transaction failed:', error);
        }

    }
    return ( 
        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column",marginTop: "20px" }}>
            <h1>Send Tokens</h1>
            <input type="text" onChange={(e)=>setTo(e.target.value)} placeholder="Enter Address" style={{ width: "300px" , height: "30px", borderRadius: "5px", border: "1px solid #fff", padding: "10px", outline: "none", textAlign: "center", marginBottom: "10px" }} />
            <input type="text" onChange={(e)=>setAmount(Number(e.target.value))} placeholder="Enter Amount" style={{ width: "300px" , height: "30px", borderRadius: "5px", border: "1px solid #fff", padding: "10px", outline: "none", textAlign: "center", marginBottom: "10px" }}/>
            <button onClick={handleSendTokens}>Send</button>
        </section>
     );
}
 
export default SendTokens;