import DashboardHeader from "@/app/components/Header/DashboardHeader";
import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import React from "react";

export const metadata: Metadata = {
    title: 'Dodawanie admina - StrefaSkilla-Helper',
    description: 'Skorzystaj z formularza, aby dodać admina do bazy',
}

const AdminDashboardLayout = ({
    children,
}: { children: React.ReactNode }) => {
    return (
        <>
            <NextTopLoader color="#000" showSpinner={true} />
            {children}
        </>
    );
};

export default AdminDashboardLayout;