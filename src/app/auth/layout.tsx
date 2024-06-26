import { redirect } from 'next/navigation'
import Image from 'next/image'
import welcome_img from './img.svg'
import { getServerSessionUser } from '@/lib/action'

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await getServerSessionUser()
    if (user) {
        redirect('/')
    }
    return (
        <section className="flex h-screen w-full items-center justify-center">
            <div className="back-rectangle relative flex h-fit min-h-[430px] w-9/12 max-w-3xl items-center justify-center border-2 border-gray-dark bg-gray-light py-6">
                <div className="flex justify-between space-x-11">
                    <Image
                        src={welcome_img}
                        width={350}
                        height={340}
                        alt="MetaWall"
                        className=""
                    />
                    {children}
                </div>
            </div>
        </section>
    )
}
