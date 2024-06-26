"use client";
import { AdminType } from '@/app/types/AdminType';
import axiosClient from '@/app/utils/axios-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { useGlobalState } from '@/app/context/globalContextProvider';

const signUpSchema = z.object({
    name: z.string().min(3, "Nazwa powinna zawierać więcej niż 3 znaki."),
    img: z.string()
        .min(3, "Nazwa powinna zawierać więcej niż 3 znaki.")
        .refine((value) => /^https:\/\/.*\.(jpg|jpeg|png|gif)$/.test(value), 'URL avatara powinien zaczynać się od https:// i kończyć na .jpg, .jpeg, .png lub .gif'),
    status: z.string().min(3, "Nazwa powinna zawierać więcej niż 3 znaki."),
    steam_url: z.string()
        .min(8, "Adres URL powinnien być dłuższy niż 8 znaków.")
        .refine((value) => /^https:\/\/steamcommunity\.com\//.test(value), 'URL powinien zaczynać się od https://steamcommunity.com/'),
    csarchive_url: z.string().
        min(8, "Adres URL powinnien być dłuższy niż 8 znaków.")
        .refine((value) => /^https:\/\/cs-archive\.vercel\.app\/sprawdz\//.test(value), 'URL powinien zaczynać się od https://cs-archive.vercel.app/sprawdz/'),
    strefaskilla_url: z.string()
        .min(8, "Adres URL powinnien być dłuższy niż 8 znaków.")
        .refine((value) => /^https:\/\/strefaskilla\.pl\/profile\//.test(value), 'URL powinien zaczynać się od https://strefaskilla.pl/profile/'),
    tsarvar_url: z.string()
        .min(8, "Adres URL powinnien być dłuższy niż 8 znaków.")
        .refine((value) => /^https:\/\/tsarvar\.com\/pl\//.test(value), 'URL powinien zaczynać się od https://tsarvar.com/pl/'),
});

export default function EditAdminPage({ params }: { params: { id: string } }) {

    const router = useRouter();
    const { getAllAdmins } = useGlobalState();

    const [user, setUser] = useState<AdminType>({
        id: null,
        name: '',
        img: '',
        status: '',
        steam_url: '',
        csarchive_url: '',
        strefaskilla_url: '',
        tsarvar_url: '',
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState(null)

    const nameRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);
    const steam_urlRef = useRef<HTMLInputElement>(null);
    const csarchive_urlRef = useRef<HTMLInputElement>(null);
    const strefaskilla_urlRef = useRef<HTMLInputElement>(null);
    const tsarvar_urlRef = useRef<HTMLInputElement>(null);


    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: user.name,
            img: user.img,
            status: user.status,
            steam_url: user.steam_url,
            csarchive_url: user.csarchive_url,
            strefaskilla_url: user.strefaskilla_url,
            tsarvar_url: user.tsarvar_url,
        },
    });

    useEffect(() => {
        setLoading(true)
        axiosClient.get(`/admins/${params.id}`)
            .then(({ data }) => {
                console.log(data)
                setLoading(false)
                setUser(data)
                form.reset(data)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [params.id, form]);

    const onSubmit = (values: z.infer<typeof signUpSchema>) => {

        const payload = {
            name: nameRef.current?.value,
            img: imgRef.current?.value,
            status: statusRef.current?.value,
            steam_url: steam_urlRef.current?.value,
            csarchive_url: csarchive_urlRef.current?.value,
            strefaskilla_url: strefaskilla_urlRef.current?.value,
            tsarvar_url: tsarvar_urlRef.current?.value
        }
        console.log(payload);

        if (user.id) {
            axiosClient.put(`/admins/${user.id}`, payload)
                .then(() => {
                    //   setNotification('User was successfully updated')
                    getAllAdmins();
                    router.push('/admin/dashboard')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                });
        } else {
            axiosClient.post('/admins', payload)
                .then(() => {
                    //   setNotification('User was successfully created')
                    router.push('/admin/dashboard')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {params.id && <h1 className='p-5 text-3xl font-bold text-[#8884d8]'>Zaktualizuj admina: <span className='text-white font-semibold'>{user.name}</span></h1>}
            {!params.id && <h1>Dodaj admina</h1>}
            <div className="bg-white rounded-md shadow-sm p-5 mb-4 mt-2 card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='py-4 px-10'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-0 mb-2">
                                        <FormLabel>Nickname</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='p-4 mb-4 border-[#8884d882]' placeholder="ALCMDZ" ref={nameRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="img"
                                render={({ field }) => (
                                    <FormItem className="space-y-0 mb-2">
                                        <FormLabel>Avatar</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='p-4 mb-4 border-[#8884d882]' placeholder="https://avatars.akamai.steamstatic.com/f638f5d9127c470acb405b7d3d9580a23119a1ef_full.jpg" ref={imgRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="space-y-0 mb-2">
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='p-4 mb-4 border-[#8884d882]' placeholder="Support" ref={statusRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="steam_url"
                                render={({ field }) => (
                                    <FormItem className="space-y-0 mb-2">
                                        <FormLabel>Profil Steam</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='p-4 mb-4 border-[#8884d882]' placeholder="https://steamcommunity.com/id/cozamixtape" ref={steam_urlRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="csarchive_url"
                                render={({ field }) => (
                                    <FormItem className="space-y-0 mb-2">
                                        <FormLabel>Profil cs-archive</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='p-4 mb-4 border-[#8884d882]' placeholder="https://cs-archive.vercel.app/sprawdz/STEAM_0:1:31181111" ref={csarchive_urlRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="strefaskilla_url"
                                render={({ field }) => (
                                    <FormItem className="space-y-0 mb-2">
                                        <FormLabel>Konto na forum</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='p-4 mb-4 border-[#8884d882]' placeholder="https://strefaskilla.pl/profile/14984-alcmdz/" ref={strefaskilla_urlRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tsarvar_url"
                                render={({ field }) => (
                                    <FormItem className="space-y-0 mb-2">
                                        <FormLabel>Profil tsarvar</FormLabel>
                                        <FormControl>
                                            <Input {...field} className='p-4 mb-4 border-[#8884d882]' placeholder="https://tsarvar.com/pl/player146582-webster1" ref={tsarvar_urlRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='w-full flex justify-end gap-5 mt-6'>
                                <Button className="flex  rounded-xl bg-[#8884d8] hover:bg-[#a6a1f7] text-white hover:text-white/90 duration-300 ease-in-out" onClick={() => router.push('/admin/dashboard')}>Powrót</Button>
                                <Button className="flex  rounded-xl bg-[#8884d8] hover:bg-[#a6a1f7] text-white hover:text-white/90 duration-300 ease-in-out">Edytuj</Button>
                            </div>

                        </form>
                    </Form>
                )}
            </div>
        </>
    )
}
