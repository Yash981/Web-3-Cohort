import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import './App.css';
const ShowBalance = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [ShowBalance, setShowBalance] = useState(false);
    const [balance, setBalance] = useState(0);
    const handleClick = async()=>{
        setShowBalance(!ShowBalance);
    }
    useEffect(()=>{
        if (wallet.publicKey) {
            const getBalance = async () =>{
                const balance = await connection.getBalance(wallet.publicKey!);
                setBalance(balance/LAMPORTS_PER_SOL);
            }
            getBalance();
        }


    },[connection, wallet.publicKey])
    console.log(balance,wallet.publicKey,'olkkkk')
    return(
        <section style={{ marginTop: '100px'}}>
            <div style={{backgroundColor: 'transparent', color: 'white',textAlign: 'center'}}>
                {wallet.publicKey && <div style={{ width:"600px", backgroundColor: 'transparent', color: 'white',display:"flex", justifyContent:"center",alignItems:"center"}}><h3 style={{ display:"flex"}}>Show Balance of user &nbsp;</h3>{wallet.publicKey ? <p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{wallet.publicKey?.toBase58()}</p>:null}</div>}
                {wallet.publicKey ? <button onClick={handleClick}>{!ShowBalance ? 'Show Balance' : 'Hide Balance'}</button>:null}
                <div>
                    {wallet.publicKey ? (
                        <div style={{backgroundColor: 'transparent', color: 'white',textAlign: 'center'}}>
                            <p style={{backgroundColor: 'transparent', color: 'white'}}  className={!ShowBalance ? 'blurred' : ''}>Balance: {balance} SOL</p>
                        </div>
                    ): null}
                </div>
            </div>
        </section>
    );
}

export default ShowBalance;