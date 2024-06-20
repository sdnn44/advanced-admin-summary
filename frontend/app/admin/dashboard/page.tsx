"use client";
import React, { useEffect, useRef, useState } from 'react'
import { redirect } from 'next/navigation';
import { useGlobalState } from '@/app/context/globalContextProvider';
import axiosClient from '@/app/utils/axios-client';


const Page = () => {
    const { user, token, setUser, setToken, adminDashboard, setAdminDashboard } = useGlobalState();
    const [isLoading, setLoading] = useState<boolean>(false);

    if (!token) {
        redirect("/signin");
    }

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            console.log(data);
            setUser(data);
        });

        axiosClient.get('/admins').then(({ data }) => {
            console.log(data);
            setAdminDashboard(data);
        });

    }, []);


    return (
        <div className='w-full h-full'>
        </div>
    )
}

export default Page