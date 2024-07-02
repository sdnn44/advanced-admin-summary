"use client";
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { FaBars } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { useGlobalState } from '@/app/context/globalContextProvider';
type Props = {}

export default function Sidebar({ }: Props) {

    const { isLoading, collapsed, collapseMenu, adminDashboard } = useGlobalState();


    // adminPlaytime.map(entry => entry.playtime);

    // if (!token) {
    //     redirect("/signin");
    // }

    return (
        // <div className="w-40 bg-[#020817] hidden md:flex flex-col border-r-2 relative">
        <div className={`h-screen md:h-full md:w-40 w-52 z-40 bg-[#020817] md:flex flex-col border-r-2 fixed md:relative transition-transform duration-300 ${collapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'} rounded-l-lg`}>
            <button className="absolute top-16 right-[-2rem] p-2 rounded-r-xl border-r-2 border-t-2 border-b-2 md:hidden bg-[#020817]" onClick={collapseMenu}>
                {collapsed ? <FaBars /> : <FaArrowLeft />}
            </button>
            <div className='flex items-center h-full flex-col gap-5 my-1 pb-20 md:my-5 md:pb-16 overflow-y-scroll md:overflow-visible'>
                <AnimatedTooltip items={adminDashboard} />
            </div>
        </div>
    )
}