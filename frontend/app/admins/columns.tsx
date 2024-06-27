"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AdminType } from "../types/AdminType"
import Image from "next/image"
import Link from "next/link"
import axiosClient from "../utils/axios-client"

const onDeleteClick = (adminId: number | null) => {
  if (!window.confirm("Czy jesteś pewny, że chcesz usunąć użytkownika?")) {
    return
  }
  try {
    axiosClient.delete(`/admins/${adminId}`)
    // setNotification('User was successfully deleted')
    // getUsers()
  } catch (error) {
    console.error("Failed to delete user:", error)
  }
}

export const columns: ColumnDef<AdminType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nickname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "img",
    header: "Avatar",
    cell: ({ row }) =>
      <Image
        src={row.getValue("img")}
        alt="Steam Avatar"
        height={50}
        width={50}
      />
  },
  {
    accessorKey: "steam_url",
    header: "Konto Steam",
    cell: ({ row }) => (
      <a href={row.getValue("steam_url")} target="_blank" rel="noopener noreferrer">
        {row.getValue("steam_url")}
      </a>
    )
  },
  {
    accessorKey: "csarchive_url",
    header: "cs-archive",
    cell: ({ row }) => (
      <a href={row.getValue("csarchive_url")} target="_blank" rel="noopener noreferrer">
        Link do cs-archive
      </a>
    )
  },
  {
    accessorKey: "strefaskilla_url",
    header: "Konto forum",
    cell: ({ row }) => (
      <a href={row.getValue("strefaskilla_url")} target="_blank" rel="noopener noreferrer">
        {row.getValue("strefaskilla_url")}
      </a>
    )
  },
  {
    accessorKey: "tsarvar_url",
    header: "Profil tsarvar",
    cell: ({ row }) => (
      <a href={row.getValue("tsarvar_url")} target="_blank" rel="noopener noreferrer">
        Link do tsarvar
      </a>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const details = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Otwórz menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(details.name)}
            >
              Skopiuj nickname
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.location.href = row.original.strefaskilla_url}
            >
              <a href={row.getValue("strefaskilla_url")} target="_blank" rel="noopener noreferrer">
                Odwiedź profil na forum
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={'/admin/dashboard/' + row.original.id}>Edytuj dane</Link></DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteClick(row.original.id)}>Usuń konto</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
