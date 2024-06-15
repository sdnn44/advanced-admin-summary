import React from 'react'
import Image from 'next/image';
import { useGlobalState, useGlobalUpdate } from '@/app/context/globalContextProvider';
import { AdminType } from '@/app/types/AdminType';
import { useRouter } from 'next/navigation';

interface Prop {
    admin: AdminType;
    index: number;
}

function AdminCard({ admin, index }: Prop) {

    const router = useRouter();
    const { setSearchedAdmin, setIsLoading, collapseMenu } = useGlobalState();

    return (
        <div
            className='w-full flex flex-row m-1 hover:bg-violet-700/15 cursor-pointer gap-3 items-center p-2'
            onClick={() => {
                router.push(`/admin/${encodeURIComponent(admin.nickname)}`);
                // getSpecificAdmin(admin.nickname);
                // getSpecificAdminPlaytime(admin.nickname);
                setSearchedAdmin(admin);
                setIsLoading(true);
                collapseMenu();
            }
            }>
            <Image src={admin.img} width={50} height={50} className="flex rounded-full" alt={''} />
            <div className='flex flex-col'>
                <div className="flex items-center">
                    <span className="font-semibold">{admin.nickname}</span>
                </div>
                <div className="flex text-[12px] font-semibold text-[#8884d8]">
                    {admin.status}
                </div>
            </div>
        </div>
    )
}

export default AdminCard