import type { Metadata } from 'next'
import { Azeret_Mono, Noto_Sans, Paytone_One } from 'next/font/google'
import './globals.css'

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
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                className={`${notoSans.className} ${azeretMono.variable} ${paytoneOne.variable}`}
            >
                {children}
            </body>
        </html>
    )
}
