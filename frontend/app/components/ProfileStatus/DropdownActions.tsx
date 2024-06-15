import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaAngleDown } from "react-icons/fa";
import Link from 'next/link';

interface DropdownActionsProps {
    steamURL: string;
    csarchiveURL: string;
    strefaskillaURL: string;
}

export default function DropdownActions({ steamURL, csarchiveURL, strefaskillaURL }: DropdownActionsProps) {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <FaAngleDown size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Konto</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={steamURL}><DropdownMenuItem>Konto Steam</DropdownMenuItem></Link>
                    <Link href={strefaskillaURL}><DropdownMenuItem>Konto Forum</DropdownMenuItem></Link>
                    <Link href={csarchiveURL}><DropdownMenuItem>Sprawdź kto to</DropdownMenuItem></Link>
                    {/* <Link href="http://banycs16.strefaskilla.pl/search.php"><DropdownMenuItem>Bany</DropdownMenuItem></Link> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
