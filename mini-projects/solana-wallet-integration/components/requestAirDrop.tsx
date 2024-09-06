"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
const FormSchema = z.object({
    amount: z.number().min(1, { message: "Amount is required." }),
})
const RequestAirDrop = () => {
    const [isLoading, setIsLoading] = useState(false);
    const wallet = useWallet();
    const { connection } = useConnection()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            amount: 0,
        },
    })
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!wallet.publicKey) {
            toast.error("Please connect your wallet",{
                duration: 2000,
                onDismiss: () => console.log("Dismissed")

            });
            return;
        }
        try {
            setIsLoading(true);
            await connection.requestAirdrop(wallet.publicKey, data.amount * LAMPORTS_PER_SOL);

            toast.success(`Airdrop successful ${data.amount} SOL sent to ${wallet.publicKey.toString()}`,{
                duration: 2000,
                onDismiss: () => console.log("Dismissed")

            });
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            toast.error(`Request Airdrop failed: ${error}`,{
                duration: 2000,
                onDismiss: () => console.log("Dismissed")

            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Request Airdrop</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">Amount (SOL)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter amount"
                                        {...field}
                                        className="text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (!isNaN(value)) {
                                                field.onChange(value);
                                            }
                                        }}
                                        value={field.value === 0 ? "" : field.value}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-teal-400 text-black font-semibold py-2 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Requesting...' : 'Request Airdrop'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default RequestAirDrop;