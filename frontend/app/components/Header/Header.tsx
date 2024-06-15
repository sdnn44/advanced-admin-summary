"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import Searchbar from "../Searchbar/Searchbar";

type Props = {}

export default function Header({ }: Props) {
  const { searchedAdmin } = useGlobalState();

  return (
    <div className='flex flex-row bg-[#020817] border-b-2 h-16'>
      <div className='flex justify-between w-full'>
        <p className='ml-5 md:mx-10 text-[12px] md:text-xl font-bold text-white self-center tracking-widest'><span className="text-[#8884d8]">ADMIN</span> DASHBOARD</p>
        <div className='flex justify-between gap-16 p-3'>
          <Searchbar />
          {searchedAdmin && <ProfileStatus user={searchedAdmin}/>}
        </div>
      </div>
    </div>
  )
}