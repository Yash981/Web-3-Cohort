"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { toast } from "sonner"
import { useState } from "react"

const FormSchema = z.object({
    recipientAddress: z.string().min(1, {
        message: "Recipient Address is required.",
    }),
    amount: z.number().min(1, { message: "Amount is required." }),
})

export function SendSOL() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            recipientAddress: "",
            amount: 0,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if(!wallet.publicKey) return toast.error("Please connect your wallet",{
            duration: 2000,
            onDismiss: () => console.log("Dismissed")
        });
        console.log(wallet.publicKey,'wallet.publicKey');
        const transaction = new Transaction()
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(data.recipientAddress),
                lamports: data.amount * LAMPORTS_PER_SOL
            })
        )
        try {
            setIsLoading(true);
            const signature = await wallet.sendTransaction(transaction, connection);
        
            toast.success(`Transaction successful with signature: ${signature}`,{
                duration: 2000,
                onDismiss: () => console.log("Dismissed")

            });
        } catch (error) {
            setIsLoading(false);
            console.error('Transaction failed:', error);
            toast.error(`Transaction failed: ${error}`,{
                duration: 2000,
                onDismiss: () => console.log("Dismissed")

            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Send SOL</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="recipientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800">Recipient Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter recipient address"
                      {...field}
                      className="text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800">Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      {...field}
                      className="text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
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
              className="w-full bg-teal-400 text-black font-semibold py-2 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 hover:text-black"
              variant={"outline"}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send SOL'}
            </Button>
          </form>
        </Form>
      </div>
    )
}
