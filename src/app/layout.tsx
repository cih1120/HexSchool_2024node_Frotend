import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Azeret_Mono, Noto_Sans, Paytone_One } from 'next/font/google'
import './globals.css'
import Provider from '@/components/Provider'
import SessionProvider from '@/components/SessionProvider'
import authOptions from './api/auth/[...nextauth]/authOptions'

const azeretMono = Azeret_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-azere-mono',
})
const paytoneOne = Paytone_One({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-paytone-one',
})
const notoSans = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'MetaWall',
    description: '到元宇宙展開全新社交圈！',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getServerSession(authOptions)
    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                className={`${notoSans.className} ${azeretMono.variable} ${paytoneOne.variable}`}
            >
                <SessionProvider session={session}>
                    <Provider>{children}</Provider>
                </SessionProvider>
            </body>
        </html>
    )
}
