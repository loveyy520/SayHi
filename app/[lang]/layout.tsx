import type { Metadata } from 'next'
// import { Inter } from "next/font/google";
import './globals.css'

// const inter = Inter({ subsets: ["latin"] });
import Nav from '@/components/nav'
import { defaultRadius, defaultTheme } from '@/styles/themes/consts'

import getCurrentUser from '@/actions/getCurrentUser'
import { Toaster } from '@/components/ui/toaster'
import { CSSProperties, ReactNode } from 'react'
import { i18n, type Locale } from "@/i18n/config"
import { getDictionary } from '@/i18n'

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
    title: 'Amber Chrior',
    description: 'AI tools, chatgpt',
}

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: ReactNode,
    params: { lang: Locale }
}>) {
    const dictionary = await getDictionary(params.lang)
    const currentUser = await getCurrentUser()
    console.log('=====================user:', currentUser)

    return (
        <html
            lang={params.lang}
            style={{ '--radius': `${defaultRadius}em;` } as CSSProperties}
            data-theme={defaultTheme.toLowerCase()}
        >
            <body>
                <Nav dictionary={dictionary} currentUser={currentUser} />
                <Toaster />
                <div className='
                    px-4
                    lg:px-16
                    pt-20
                    lg:pt-28
                    pb-4
                    lg:pb-12
                    h-screen
                    overflow-x-hidden
                '>
                    {children}
                </div>
                {/* /styles/themes/css/background */}
                <div className='texture'></div>
                <div
                    className='
                        dark:bg-[url(/images/bg-color.png)]
                        bg-[-450px_-300px]
                        md:bg-center
                        lg:bg-left
                        dark:h-screen
                        dark:w-screen
                        opacity-90
                        fixed
                        top-0
                        z-[9999]
                        pointer-events-none
                '>
                </div>
            </body>
        </html>
    )
}
