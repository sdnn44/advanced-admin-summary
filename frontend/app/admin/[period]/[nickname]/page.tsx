import React from 'react'
import { DataTable } from '@/app/bans/data-table';
import { columns } from '@/app/bans/columns';
import ProfileCard from '@/app/components/Card/ProfileCard';
import BanCard from '@/app/components/Card/BanCard';
import { PlaytimeType } from '@/app/types/PlaytimeType';
import { BanType } from '@/app/types/BanType';
import axios from 'axios';
import Link from 'next/link';

async function getAdminData(adminNickname: string, period: string) {
    const res = await axios.get(`https://strefaskilla-helper.vercel.app/api/admins/${period}/${adminNickname}`);
    return res.data;
}

async function getAdminPlaytime(adminNickname: string, period: string) {
    const res = await axios.get(`http://strefaskilla-helper.vercel.app/api/playtimes/${period}/${adminNickname}`);
    return res.data;
}

export default async function AdminDetails({ params }: { params: { nickname: string; period: string } }) {


    const PERIOD = [
        {
            id: 1,
            periodLabel: "maj",
        },
        {
            id: 2,
            periodLabel: "czerwiec",
        }
    ];

    const adminData = await getAdminData(params.nickname, params.period);
    const adminPlaytime: PlaytimeType[] = await getAdminPlaytime(params.nickname, params.period);

    const getNumberOfAdminBans = () => {
        return adminData.length;
    }

    const getNumberOfGivenDemos = () => {
        let numberOfGivenDemos = adminData.filter((ban: BanType) => {
            const reasonLower = ban.Reason ? ban.Reason.toLowerCase() : "";
            return reasonLower.includes("demko") || reasonLower.includes("demo") || reasonLower.includes("pov");
        }).length;
        return numberOfGivenDemos;
    }

    const getNumberOfGivenScreenshots = () => {
        let numberOfGivenScreenshots = adminData.filter((ban: BanType) => {
            const reasonLower = ban.Reason ? ban.Reason.toLowerCase() : "";
            return reasonLower.includes("wstaw_screeny") || reasonLower.includes("screenshooty");
        }).length;
        return numberOfGivenScreenshots;
    }

    return (
        <div className='md:h-screen p-4 md:flex md:flex-col'>
            <div className='flex flex-col w-full md:h-1/3'>
                <div className='flex flex-col md:flex-row  gap-6 md:gap-3'>
                    <BanCard playtime={adminPlaytime} adminNickname={params.nickname} />
                    <ProfileCard numberOfGivenBans={getNumberOfAdminBans()} numberOfGivenDemos={getNumberOfGivenDemos()} numberOfGivenScreenshots={getNumberOfGivenScreenshots()} />
                </div>
                <div className='flex flex-row px-8 pt-2 z-50'>
                    {PERIOD.map((option) => (
                        <Link
                            key={option.id}
                            className={`flex w-24 justify-center text-sm font-bold rounded-xl p-1 px-3 mx-1 cursor-pointer border-2 border-violet-400 hover:bg-violet-300 transition duration-300 ease-in hover:text-violet-800 ${option.periodLabel === params.period
                                ? 'bg-violet-300 text-violet-800'
                                : 'hover:bg-violet-300 hover:text-violet-800'
                                }
                            `}
                            href={`/admin/${option.periodLabel}/${params.nickname}`}
                        >
                            {option.periodLabel}
                        </Link >
                    ))}
                </div>
            </div>
            <div className='w-full h-1/2'>
                <section className='py-4 md:py-24'>
                    <div className='container'>
                        <DataTable columns={columns} data={adminData} />
                    </div>
                </section>
            </div>
        </div>
    )
}