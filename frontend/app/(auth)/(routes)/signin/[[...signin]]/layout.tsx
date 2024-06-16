import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import React from "react";

export const metadata: Metadata = {
  title: 'Zaloguj się - StrefaSkilla-Helper',
  description: 'Zaloguj się, żeby korzystać ze wszystkich funkcjonalności aplikacji',
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