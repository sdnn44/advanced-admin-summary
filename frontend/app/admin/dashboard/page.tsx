"use client";
import React, { useEffect, useRef, useState } from 'react'
import { redirect } from 'next/navigation';
import { useGlobalState } from '@/app/context/globalContextProvider';
import axiosClient from '@/app/utils/axios-client';
import Link from 'next/link';
import { AdminType } from '@/app/types/AdminType';
import { DataTable } from '@/app/admins/data-table';
import { columns } from '@/app/admins/columns';
import { Button } from '@/components/ui/button';


const Page = () => {
    const { user, token, isLoading, setUser, setToken, adminDashboard } = useGlobalState();
    // const [isLoading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState(null);

    if (!token) {
        redirect("/signin");
    }

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data);
        });
    }, [adminDashboard]);

    return (
        <div className='p-3'>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1 className='p-1 px-4 text-3xl font-bold text-[#8884d8]'>Administracja:</h1>
            </div>
            <div className='p-4'>
                <DataTable columns={columns} data={adminDashboard} />
            </div>
        </div>
    )
}

export default Page

