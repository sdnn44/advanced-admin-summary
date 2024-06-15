"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { db } from '../utils/firebase';
import { child, get, ref } from "firebase/database";
import { BanType } from '../types/BanType';

// const fetchDataFromFirebase = async () => {
//     try {
//         const dbRef = ref(db);
//         const snapshot = await get(child(dbRef, `admins/newbansdd2/Komornik`));

//         if (snapshot.exists()) {
//             // setDataFunction(snapshot.val());
//             // console.log(snapshot.val());
//             return snapshot.val;
//         } else {
//             console.log("Player has no active bans");
//         }
//     } catch (error) {
//         console.error(error);
//     }

// };

export default function Page() {
    const [adminData, setAdminData] = useState<BanType[]>([]);
    // const [bannedUsers, setBannedUsers] = useState<any[]>([]);

    useEffect(() => {
        const adminRef = ref(db, 'admins/newbansdd2/Axel')
        get(adminRef).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val())
                const adminObject: Record<string, BanType> = snapshot.val();
                const adminArray = Object.entries(adminObject).map(([id, data]) =>  ({
                    id,
                    ...data,
                }));
                console.log(adminArray);
                setAdminData(adminArray);
            } else {
                console.log("No data avaiable");
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    
    return (
        <section className='py-24'>
            <div className='container'>
                <h1 className='mb-6 text-3xl font-bold'>All Users</h1>
                <DataTable columns={columns} data={adminData} />
            </div>
        </section>
    );
}

