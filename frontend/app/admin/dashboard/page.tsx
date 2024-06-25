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

    // adminPlaytime.map(entry => entry.playtime);

    // if (!token) {
    //     redirect("/signin");
    // }

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            console.log(data);
            setUser(data);
        });
        console.log("Add new admin page");
        console.log(adminDashboard);
        // axiosClient.get(`/admins`)
        //     .then(({ data }) => {
        //         console.log(data);
        //         setAdminDashboard(data);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         const response = err.response;
        //         if (response && response.status === 422) {
        //             console.log(response.data.errors);
        //             setErrors(response.data.errors);
        //         }
        //         setLoading(false);
        //     });
    }, [adminDashboard]);

    return (
        <div className='p-3'>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1 className='p-5 text-3xl font-bold text-[#8884d8]'>Administracja:</h1>
                {/* <Button className="rounded-xl bg-[#8884d8] hover:bg-[#a6a1f7] text-white hover:text-white/90 duration-300 ease-in-out"><Link href={"/users/new-admin"}>Add new</Link></Button> */}
            </div>
            <div className='p-4'>
                <DataTable columns={columns} data={adminDashboard} />
            </div>
        </div>
    )
}

export default Page

