import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useState } from 'react';


export function SignMessage(){
    const [inputValue, setInputValue] = useState('');
    const { publicKey,signMessage } = useWallet();

    const handleClick = async () =>{
        if(!publicKey) return alert('Please connect your wallet');
        if(!signMessage) return alert('Please connect your wallet');

        const endcodedMessage = new TextEncoder().encode(inputValue);
        const signature = await signMessage(endcodedMessage);

        if(!ed25519.verify(signature, endcodedMessage,publicKey.toBytes() )) {
            throw new Error('Invalid signature');
        }
        alert(`Signature verified: Success, ${bs58.encode(signature)}`);
        console.log('Signature verified: Success', bs58.encode(signature));
    }
    return (
        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
            <h1>Sign Message</h1>
            <input type="text" value={inputValue} placeholder="Enter Message" onChange={(e) => setInputValue((e.target.value))} style={{ width: "300px" , height: "30px", borderRadius: "5px", border: "1px solid #fff", padding: "10px", outline: "none", textAlign: "center", marginBottom: "10px" }} onKeyDown={(e) => e.key === "Enter" && handleClick()}/>
            <button onClick={handleClick} disabled={!publicKey || !inputValue}style={{ cursor: publicKey && inputValue.length > 0 ? "pointer" : "not-allowed",width:"320px"}} >Sign Message</button>
        </section>
    )
}