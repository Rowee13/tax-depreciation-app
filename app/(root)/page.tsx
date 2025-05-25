export default function Home() {
    return (
        <section className='flex-grow'>
            <div className='relative isolate px-6 pt-14 lg:px-8'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center'>
                        <h1 className='text-4xl md:text-5xl bg-gradient-to-r from-primary to-cyan-500 bg-clip-text font-extrabold text-transparent'>
                            Tax Depreciation Calculator
                        </h1>
                        <p className='mt-2 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
                            A simple tax depreciation calculator.
                        </p>
                    </div>

                    <div className='flex flex-col items-center justify-center mt-10'>
                        <h3 className='text-xl font-medium text-center'>
                            Input your asset details below
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    )
}
