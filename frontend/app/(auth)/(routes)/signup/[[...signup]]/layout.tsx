import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import React from "react";

export const metadata: Metadata = {
    title: 'Zarejestruj się - StrefaSkilla-Helper',
    description: 'Załóż konto, żeby korzystać z wszystkich funkcjonalności aplikacji',
}

const SignUpLayout = ({
    children,
}: { children: React.ReactNode }) => {
    return (
        <>
            <NextTopLoader color="#000" showSpinner={true} />
            {children}
        </>
    );
};

export default SignUpLayout;