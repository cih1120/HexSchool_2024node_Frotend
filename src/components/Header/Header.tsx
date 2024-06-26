import Link from 'next/link'
import DropMenu from './DropMenu'

export default function Header() {
    return (
        <header className="fixed top-0 z-50 w-full border-0 border-b-3 border-gray-dark bg-white px-2 py-4">
            <div className="mx-auto flex max-w-[872px] justify-between">
                <Link href="/">
                    <h1 className="font-paytoneOne text-2xl">MetaWall</h1>
                </Link>
                <DropMenu />
            </div>
        </header>
    )
}
