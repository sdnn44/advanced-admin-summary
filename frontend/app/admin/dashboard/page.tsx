"use client";
import React, { useEffect, useRef } from 'react'
import { redirect } from 'next/navigation';
import { useGlobalState } from '@/app/context/globalContextProvider';
import axiosClient from '@/app/utils/axios-client';


const Page = () => {
    const { user, token, setUser, setToken } = useGlobalState();

    if (!token) {
        redirect("/signin");
    }

    const onLogout = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        axiosClient.post('/logout').then(() => {
            setUser(null);
            setToken(null);
        })
    }

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            console.log(data);
            setUser(data);
        })
    }, []);


    return (
        <div className='w-full border-2 border-red-600 h-full'>
            <p className='' onClick={onLogout}>Wyloguj</p>
            <p className='text-xl text-red-500'>{user?.name} dd</p>
            <p className='text-xl text-red-500'>{user?.email} dd</p>
        </div>
    )
}

export default Page