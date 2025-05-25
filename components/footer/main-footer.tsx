import Link from 'next/link'

import { FaGithub } from 'react-icons/fa'

const MainFooter = () => {
    return (
        <footer>
            <div className='max-w-7xl mx-auto px-4 py-8 border-t border-foreground/25'>
                <div className='flex flex-row justify-between items-center'>
                    <p className='text-sm text-muted-foreground'>
                        Assessment Task for DuoTax - May 2025
                    </p>
                    <div>
                        <Link
                            href='https://github.com/Rowee13/tax-depreciation-app'
                            passHref
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <FaGithub className='w-5 h-5 hover:text-primary' />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default MainFooter
