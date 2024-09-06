"use client"
import Link from "next/link";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";


const Header = () => {
    const router = useRouter()
    const params = usePathname()
    const { publicKey } = useWallet();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);  
    }, []);

    if (!isClient) return null;
    return (
        <nav className="bg-gray-900 h-16 flex justify-between px-8 border-b border-gray-700 sticky top-0">
            <div className="flex items-center ">
                <p className="text-white text-lg font-semibold cursor-pointer" >
                    <Image src="/solana.svg" alt="Solana Logo" width={100} height={100} onClick={() => router.push("/")}/>
                </p>
            </div>
            <ul className="flex gap-6 items-center">
                <li className="text-gray-300 hover:text-white transition-colors duration-200">
                    <Link href="/" className={params === "/" ? "text-teal-400" : ""}>Home</Link>
                </li>
                <li className="text-gray-300 hover:text-white transition-colors duration-200">
                    <Link href="/send-sol" className={params === "/send-sol" ? "text-teal-400" : ""}>Send SOL</Link>
                </li>
                <li className="text-gray-300 hover:text-white transition-colors duration-200">
                    <Link href="/request-airdrop" className={params === "/request-airdrop" ? "text-teal-400" : ""}>Request AirDrop</Link>
                </li>
                <li className="text-gray-300 hover:text-white transition-colors duration-200">
                    <Link href="/sign-a-message" className={params === "/sign-a-message" ? "text-teal-400" : ""}>Sign a Message</Link>
                </li>
            </ul>
            <div className="flex items-center">
                {!publicKey ? (<WalletMultiButton className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-white transition-colors duration-200" style={{
                    color: "rgb(45, 212, 191)",
                    borderColor: "rgb(45, 212, 191)",
                    backgroundColor: "transparent",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    borderStyle: "solid",
                    borderWidth: "1px",
                }}
                    //@ts-ignore
                    onMouseOver={(e: any) => {
                        e.currentTarget.style.backgroundColor = "rgb(45, 212, 191)";
                        e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e: any) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "rgb(45, 212, 191)";
                    }} />): (
                        <WalletDisconnectButton className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-white transition-colors duration-200" style={{
                            color: "rgb(45, 212, 191)",
                            borderColor: "rgb(45, 212, 191)",
                            backgroundColor: "transparent",
                            transition: "background-color 0.2s ease, color 0.2s ease",
                            borderStyle: "solid",
                            borderWidth: "1px",
                        }}

                             />
                    )}


            </div>
        </nav>
    );
}

export default Header;
