'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import DarkModeButton from '@/components/ui/buttons/dark-mode-btn'

import { NAV_LINKS } from '@/constant/nav-links'

const MainHeader = () => {
    const pathname = usePathname()

    return (
        <header className='sticky top-0 bg-background/90 backdrop-blur-sm z-10'>
            <div className='max-w-7xl mx-auto flex flex-row justify-between items-center px-4 py-8 z-50'>
                <div>
                    <Link
                        href='/'
                        className='text-3xl font-[family-name:var(--font-bebas-neue)] font-bold'
                    >
                        Tax Depreciation Calculator
                    </Link>
                </div>
                <nav>
                    <ul className='flex flex-row space-x-6'>
                        {NAV_LINKS.map((link) => (
                            <li
                                key={link.href}
                                className={`px-2 py-1 ${pathname === link.href ? 'font-bold text-primary' : 'hover:underline'} `}
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                        <li>
                            <DarkModeButton />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default MainHeader
