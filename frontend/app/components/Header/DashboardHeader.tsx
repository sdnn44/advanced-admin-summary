"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import { Button } from "@/components/ui/button";
import axiosClient from '@/app/utils/axios-client';

type Props = {}

export default function Header({ }: Props) {
    const { user, token, setUser, setToken } = useGlobalState();
    console.log(user);
    const onLogout = (e: any) => {
        e.preventDefault();
        axiosClient.post('/logout').then(() => {
            setUser(null);
            setToken(null);
        })
    }

    return (
        <div className='flex flex-row bg-[#020817] border-b-2 h-16'>
            <div className='flex justify-end w-full'>
                <div className='flex items-center gap-4 p-3 mx-5'>
                    <h1 className="text-xl">
                        Witaj,
                    </h1>
                    <h2 className='text-[#8884d8] text-xl font-semibold'>{user?.name}</h2>
                    <Button className="rounded-xl bg-[#8884d8] hover:bg-[#a6a1f7] text-white hover:text-white/90 duration-300 ease-in-out" onClick={onLogout}>Wyloguj</Button>
                </div>
            </div>
        </div>
    )
}