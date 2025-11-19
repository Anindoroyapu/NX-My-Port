"use client";
import { AuthProvider } from '@/hooks/CheckAuth';

import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {

  return (

    <main className=' bg-white'>
       
            <AuthProvider>{children}</AuthProvider>
       
    </main>

  )
}

