"use client"
import React from 'react';

interface Props {
    children: React.ReactNode
}
const GlobalStyleProvider = ({ children }: Props) => {
    return <div className='h-full flex'>{children}</div>
}

export default GlobalStyleProvider