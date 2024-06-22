import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import React from "react";

export const metadata: Metadata = {
    title: 'Edytowanie admina - StrefaSkilla-Helper',
    description: 'Skorzystaj z formularza, aby edytować dane admina',
}

const SignInLayout = ({
    children,
}: { children: React.ReactNode }) => {
    return (
        <>
            <NextTopLoader color="#000" showSpinner={true} />
            {children}
        </>
    );
};

export default SignInLayout;