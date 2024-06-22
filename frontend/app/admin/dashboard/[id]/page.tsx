"use client";

import { useGlobalState } from '@/app/context/globalContextProvider';
import { AdminType } from '@/app/types/AdminType';
import axiosClient from '@/app/utils/axios-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function EditAdminPage({ params }: { params: { id: string } }) {

    const router = useRouter();

    const [user, setUser] = useState<AdminType>({
        id: null,
        name: '',
        img: '',
        status: '',
        steam_url: '',
        csarchive_url: '',
        strefaskilla_url: ''
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState(null)

    if (params.id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/admins/${params.id}`)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault()
        if (user.id) {
            axiosClient.put(`/admins/${user.id}`, user)
                .then(() => {
                    //   setNotification('User was successfully updated')
                    router.push('/admin/dashboard')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/admins', user)
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
                    <form onSubmit={onSubmit} className='p-10'>
                        <Label className='mb-10' htmlFor="name">Nickname</Label>
                        <Input className='p-4 mb-4 border-[#8884d882]' value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="ALCMDZ" />

                        <Label htmlFor="img">Avatar</Label>
                        <Input className='p-4 mb-4 border-[#8884d882]' value={user.img} onChange={ev => setUser({ ...user, img: ev.target.value })} placeholder="https://avatars.akamai.steamstatic.com/f638f5d9127c470acb405b7d3d9580a23119a1ef_full.jpg" />

                        <Label htmlFor="status">Status</Label>
                        <Input className='p-4 mb-4 border-[#8884d882]' value={user.status} onChange={ev => setUser({ ...user, status: ev.target.value })} placeholder="Support" />

                        <Label htmlFor="steam_url">Profil Steam</Label>
                        <Input className='p-4 mb-4 border-[#8884d882]' value={user.steam_url} onChange={ev => setUser({ ...user, steam_url: ev.target.value })} placeholder="https://steamcommunity.com/id/cozamixtape" />

                        <Label htmlFor="csarchive_url">Profil cs-archive</Label>
                        <Input className='p-4 mb-4 border-[#8884d882]' value={user.csarchive_url} onChange={ev => setUser({ ...user, csarchive_url: ev.target.value })} placeholder="https://cs-archive.vercel.app/sprawdz/STEAM_0:1:31181111" />

                        <Label htmlFor="strefaskilla_url">Konto na forum</Label>
                        <Input className='p-4 mb-4 border-[#8884d882]' value={user.strefaskilla_url} onChange={ev => setUser({ ...user, strefaskilla_url: ev.target.value })} placeholder="https://strefaskilla.pl/profile/14984-alcmdz/" />

                        <div className='w-full flex justify-end'>
                            <Button className="flex  rounded-xl bg-[#8884d8] hover:bg-[#a6a1f7] text-white hover:text-white/90 duration-300 ease-in-out">Edytuj</Button>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}
