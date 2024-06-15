"use client"
import adminData from '@/app/utils/admins-data';
import { AnimatePresence, motion } from 'framer-motion'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useClickOutside } from 'react-click-outside-hook';
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import AdminCard from '../Card/AdminCard';
import { useDebounce } from '@/app/hooks/debounceHook';
import Loader from '../Loader/Loader';
import { AdminType } from '@/app/types/AdminType';


type Props = {}

export default function Searchbar({ }: Props) {

    const [isExpanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [parentRef, isClickedOutside] = useClickOutside();
    const inputRef = useRef<HTMLInputElement>(null);

    const [isLoadingAdmin, setIsLoadingAdmin] = useState<boolean>(true);

    const [adminList, setAdminList] = useState<AdminType[]>([]);
    const [noAdmins, setNoAdmins] = useState(false);

    const isEmpty = !adminList || adminList.length === 0;

    const clearInput = () => {
        if (inputRef.current)
            inputRef.current.value = "";
    }

    const collapse = () => {
        setExpanded(false);
        setSearchQuery("");
        setAdminList([]);
        setNoAdmins(false);
        clearInput();
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    const searchAdmin = async () => {
        setIsLoadingAdmin(true);
        if (!searchQuery || searchQuery.trim() === "")
            return;
        console.log(isLoadingAdmin);
        // const response = await fetchAdminByName(searchQuery);
        const response = { data: adminData.filter(admin => admin.nickname.toLowerCase().includes(searchQuery.toLowerCase())) };
        console.log(response);
        if (response.data && response.data.length === 0) {
            setNoAdmins(true)
        }
        setAdminList(response.data);
        console.log(response.data);
        setIsLoadingAdmin(false);
        console.log(isLoadingAdmin);
    }

    useEffect(() => {
        if (isClickedOutside) {
            collapse();
        }
    }, [isClickedOutside]);

    useDebounce(searchQuery, 1500, searchAdmin);

    return (
        <motion.div
            layout
            transition={{ type: "spring", damping: 22, stiffness: 150 }}
            // transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{ height: isExpanded ? "15rem" : "2.2rem" }}/*position: isExpanded ? "absolute" : "relative" }*/
            // transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            onClick={() => {
                setExpanded(!isExpanded);
                setAdminList([]);
                setNoAdmins(false);
            }}
            ref={parentRef}
            className="hidden md:flex md:flex-col lg:w-[26rem] sm:w-full h-10 bg-[#0F1117ee] rounded-lg shadow-sm shadow-slate-500 z-20">
            <div className="w-full min-h-10 flex items-center px-4">
                <span className="text-white align-middle mr-5 cursor-pointer">
                    <CiSearch size={20} />
                </span>
                <input
                    className="w-full outline-none border-none text-sm font-light text-white rounded-2xl bg-transparent placeholder-white placeholder:opacity-50 focus:placeholder-transparent focus:outline-none"
                    placeholder="Wyszukaj admina..."
                    ref={inputRef}
                    value={searchQuery}
                    onChange={changeHandler}
                />
                <AnimatePresence>
                    {isExpanded && (
                        <motion.span
                            className="text-white align-middle cursor-pointer transition-all duration-300 hover:text-violet-300"
                            key="close-icn"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => collapse()}
                            transition={{ duration: 0.2 }}
                        >
                            <IoCloseOutline size={20} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            {isExpanded && (<span className="flex min-w-full min-h-[2px] bg-slate-500" />)}
            {isExpanded && (<div className="flex flex-col h-full w-full overflow-hidden overflow-y-auto scrollbar-style">
                {/* <div className="flex border-2 w-full h-full items-center justify-center"> */}
                {isLoadingAdmin && isExpanded && (<Loader />)}
                {!isLoadingAdmin && isEmpty && !noAdmins && <span className='flex h-full justify-center items-center text-sm opacity-60'>Start typing to search</span>}
                {!isLoadingAdmin && noAdmins && <span className='flex h-full justify-center items-center text-sm opacity-60'>No Admin found!</span>}
                {!isLoadingAdmin && !isEmpty && adminList.map((item: AdminType, index: number) => (
                    <AdminCard key={item.id} admin={item} index={index} />
                ))}
            </div>
            )}
        </motion.div>
    )
}
