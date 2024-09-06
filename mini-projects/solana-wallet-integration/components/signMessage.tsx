"use client"
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Input } from './ui/input';
const FormSchema = z.object({
    message: z.string().min(1, { message: "Message is required." }),
})
const SignMessageComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { publicKey, signMessage } = useWallet();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: '',
        },
    })
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!publicKey) {
            return toast.error("Please connect your wallet",{
                duration: 2000,
            })
        }
        if(!signMessage) {
            return toast.error("Please connect your wallet",{
                duration: 2000,
            })
        }
        try {
            setIsLoading(true);
            const signature = await signMessage(new TextEncoder().encode(data.message));
            const signedMessage = bs58.encode(signature);
            toast.success(`Signature: ${signedMessage}`,{
                duration: 2000,
            })
        } catch (error) {
            console.error(error);
            toast.error(`Sign Message failed: ${error}`,{
                duration: 2000,
            })
        } finally {
            setIsLoading(false);
        }
    }
    return ( 
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Sign Message</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">Message</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Message"
                                        {...field}
                                        className="text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                        type="text"
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
                        {isLoading ? 'Signing the message...' : 'Sign Message'}
                    </Button>
                </form>
            </Form>
        </div>
     );
}
 
export default SignMessageComponent;