"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import Searchbar from "../Searchbar/Searchbar";

type Props = {}

export default function Header({ }: Props) {
  const { token, searchedAdmin } = useGlobalState();

  return (
    <div className='flex flex-row bg-[#020817] border-b-2 h-16 w-full justify-between'>
      <div className="flex flex-row items-center w-full justify-between md:justify-start">
        <p className='ml-5 md:mx-3 text-[12px] md:text-xl font-bold text-white tracking-widest flex flex-row gap-1'><Link href="/"><span className="text-[#8884d8]">ADMIN</span> DASHBOARD</Link></p>
        {token ? (
          <Button className="rounded-xl bg-[#8884d8] hover:bg-[#a6a1f7] text-white hover:text-white/90 duration-300 ease-in-out">
            <Link href="/admin/dashboard">Panel admina</Link>
          </Button>
        ) : (
          <Button className="rounded-xl bg-[#8884d8] hover:bg-[#a6a1f7] text-white hover:text-white/90 duration-300 ease-in-out">
            <Link href="/signin">Zaloguj</Link>
          </Button>
        )
        }
      </div>
      <div className='flex'>
        <div className='flex justify-between gap-3 p-3'>
          <Searchbar />
          {searchedAdmin && <ProfileStatus user={searchedAdmin} />}

        </div>
      </div >
    </div >
  )
}