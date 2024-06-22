"use client";
import React, { useEffect, useRef, useState } from 'react'
import { redirect } from 'next/navigation';
import { useGlobalState } from '@/app/context/globalContextProvider';
import axiosClient from '@/app/utils/axios-client';
import Link from 'next/link';
import { AdminType } from '@/app/types/AdminType';


const Page = () => {
    const { user, token, setUser, setToken, adminDashboard, setAdminDashboard } = useGlobalState();
    const [isLoading, setisLoading] = useState<boolean>(false);

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

    function onDeleteClick(u: AdminType): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Users</h1>
                <Link className="btn-add" href={"/users/new-admin"}>Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nickname</th>
                            <th>Status</th>
                            <th>Steam URL</th>
                            <th>cs-archive</th>
                            <th>Konto na forum</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    {isLoading &&
                        <tbody>
                            <tr>
                                <td colSpan={5} className="text-center">
                                    isLoading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!isLoading &&
                        <tbody>
                            {adminDashboard?.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.status}</td>
                                    <td>{u.steam_url}</td>
                                    <td>{u.csarchive_url}</td>
                                    <td>{u.strefaskilla_url}</td>
                                    <td>
                                        <Link className="btn-edit" href={'/admin/dashboard/' + u.id}>Edit</Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

export default Page

