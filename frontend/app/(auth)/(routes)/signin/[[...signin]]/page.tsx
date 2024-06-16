"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';

const signInSchema = z.object({
    email: z.string().email("Email powinien być prawidłowy."),
    password: z.string().min(6, "Hasło powinno być dłuższe 6 znaków."),
});

const Page = () => {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof signInSchema>) {
    }

    return (
        <>
            <div className='h-screen w-full flex justify-center fixed left-10'>
                <div className='flex items-center shadow-md rounded-lg overflow-hidden justify-center w-[20rem] md-6 md:w-auto my-4'>
                    <div className='hidden md:flex justify-center items-center flex-col w-[48rem] gap-5'>
                        <h3 className='text-2xl font-semibold text-[#8884d8]'>Hej!</h3>
                        <p className='text-sm max-w-[90%] text-center mb-3'>Korzystanie ze strony nie wymaga konta. Jeśli jednak jesteś administratorem serwera i chciałbyś mieć możliwość zarządzania kontami pojawiającymi się w bazie, konieczne jest posiadanie konta.</p>
                        <Link href={"/signup"}>
                            <Button className='border-zinc-500 bg-[#8884d8] text-white hover:bg-[#6764a4] duration-300 ease-in-out border rounded-full px-8'>Zaloguj się</Button>
                        </Link>
                    </div>
                    <div className='px-4 py-4 my-4 mx-4 md:w-1/2 w-[20rem] bg-[#1E293B] rounded-xl gap-5'>
                        <h3 className='text-center text-2xl font-semibold'>Zarejestruj się!</h3>
                        <div className='my-3 flex justify-center items-center'>
                            <Button variant={"outline"} className="rounded-full h-[2.5rem] w-[2.5rem] p-0 mx-2 border-[#8884d8]"><FaGoogle className='h-5 w-5' /></Button>
                            <Button variant={"outline"} className="rounded-full h-[2.5rem] w-[2.5rem] p-0 mx-2 border-[#8884d8]"><FaFacebook className='h-5 w-5' /></Button>
                            <Button variant={"outline"} className="rounded-full h-[2.5rem] w-[2.5rem] p-0 mx-2 border-[#8884d8]"><FaGithub className='h-5 w-5' /></Button>
                        </div>
                        <p className='text-center'>albo użyj formularza</p>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0 mb-2">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder='administrator@poczta.pl' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0 mb-2">
                                            <FormLabel>Hasło</FormLabel>
                                            <FormControl>
                                                <Input placeholder='******' type='password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' className='w-full border-zinc-500 bg-[#8884d8] text-white hover:bg-[#6764a4] duration-300 ease-in-out border rounded-full px-8'>Zaloguj</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page