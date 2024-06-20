import DashboardHeader from "@/app/components/Header/DashboardHeader";
import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import React from "react";

export const metadata: Metadata = {
    title: 'Panel administracyjny - StrefaSkilla-Helper',
    description: 'Dodawaj, edytuj lub usuwaj graczy z flagami admina.',
}

const AdminDashboardLayout = ({
    children,
}: { children: React.ReactNode }) => {
    return (
        <>
            <NextTopLoader color="#000" showSpinner={true} />
            <DashboardHeader />
            {children}
        </>
    );
};

export default AdminDashboardLayout;