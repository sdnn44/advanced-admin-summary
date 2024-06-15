import { AdminType } from "@/app/types/AdminType";
import Image from "next/image";
import DropdownActions from "./DropdownActions";

type Props = {
  user: AdminType;
}

export default function ProfileStatus({ user }: Props) {
  const { img, nickname, status, steamURL, csarchiveURL, strefaskillaURL } = user;
  return (
    <div className='flex flex-row justify-center items-center gap-2 md:gap-4 md:min-w-64 h-full'>
      <Image src={`${img}`} width={50} height={50} alt='avatar' className="rounded-xl w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
      <div>
        <h2 className="text-[12px] font-bold whitespace-nowrap">{nickname}</h2>
        <span className="text-[10px] md:text-sm text-[#8884d8]">{status}</span>
      </div>
      <DropdownActions steamURL={steamURL} csarchiveURL={csarchiveURL} strefaskillaURL={strefaskillaURL} />
    </div>
  )
}