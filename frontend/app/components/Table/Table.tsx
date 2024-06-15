"use client";
import { columns } from '@/app/bans/columns';
import { DataTable } from '@/app/bans/data-table';
import { useGlobalState, useGlobalUpdate } from '@/app/context/globalContextProvider';
import React from 'react'

export default function Table() {

    const { admin } = useGlobalState();

    return (
        <section className='py-24'>
            <div className='container'>
                <DataTable columns={columns} data={admin} />
            </div>
        </section>
    );
}
