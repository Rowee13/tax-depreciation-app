'use client'

import { Calculator, Calendar, DollarSign, TrendingDown } from 'lucide-react'

import {
    DepreciationCalculation,
    formatCurrency,
} from '@/lib/depreciation-calculator'

import { Button } from './button'

interface DepreciationResultsProps {
    calculation: DepreciationCalculation
    onReset: () => void
}

const DepreciationResults = ({
    calculation,
    onReset,
}: DepreciationResultsProps) => {
    const { input, annualDepreciationAmount, results, specificYearResult } =
        calculation

    return (
        <div className='w-full max-w-4xl mx-auto space-y-6'>
            {/* Summary Section */}
            <div className='bg-card rounded-lg border border-border p-6 shadow-sm transition-colors'>
                <h2 className='text-2xl font-semibold mb-6 text-card-foreground'>
                    Depreciation Summary
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                    <div className='flex items-center space-x-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors'>
                        <div className='flex-shrink-0'>
                            <DollarSign className='h-5 w-5 text-primary' />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm text-muted-foreground'>
                                Asset Value
                            </p>
                            <p className='text-lg font-semibold text-card-foreground'>
                                {formatCurrency(input.assetValue)}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors'>
                        <div className='flex-shrink-0'>
                            <TrendingDown className='h-5 w-5 text-secondary-foreground' />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm text-muted-foreground'>
                                Salvage Value
                            </p>
                            <p className='text-lg font-semibold text-card-foreground'>
                                {formatCurrency(input.salvageValue)}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors'>
                        <div className='flex-shrink-0'>
                            <Calendar className='h-5 w-5 text-secondary-foreground' />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm text-muted-foreground'>
                                Useful Life
                            </p>
                            <p className='text-lg font-semibold text-card-foreground'>
                                {input.usefulLife} years
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3 p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors'>
                        <div className='flex-shrink-0'>
                            <Calculator className='h-5 w-5 text-primary' />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm text-muted-foreground'>
                                Annual Depreciation
                            </p>
                            <p className='text-lg font-semibold text-primary'>
                                {formatCurrency(annualDepreciationAmount)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Specific Year Result */}
                {specificYearResult && (
                    <div className='bg-primary/5 border border-primary/20 rounded-lg p-5 transition-colors'>
                        <h3 className='text-lg font-semibold mb-4 text-primary flex items-center gap-2'>
                            <Calendar className='h-5 w-5' />
                            Year {specificYearResult.year} Details
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='space-y-2 p-3 rounded-md bg-card/50'>
                                <p className='text-sm text-muted-foreground'>
                                    Annual Depreciation
                                </p>
                                <p className='font-semibold text-card-foreground'>
                                    {formatCurrency(
                                        specificYearResult.annualDepreciation
                                    )}
                                </p>
                            </div>
                            <div className='space-y-2 p-3 rounded-md bg-card/50'>
                                <p className='text-sm text-muted-foreground'>
                                    Accumulated Depreciation
                                </p>
                                <p className='font-semibold text-card-foreground'>
                                    {formatCurrency(
                                        specificYearResult.accumulatedDepreciation
                                    )}
                                </p>
                            </div>
                            <div className='space-y-2 p-3 rounded-md bg-card/50'>
                                <p className='text-sm text-muted-foreground'>
                                    Book Value
                                </p>
                                <p className='font-semibold text-card-foreground'>
                                    {formatCurrency(
                                        specificYearResult.bookValue
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Depreciation Schedule Table */}
            <div className='bg-card rounded-lg border border-border shadow-sm overflow-hidden transition-colors'>
                <div className='p-6 border-b border-border'>
                    <h3 className='text-xl font-semibold text-card-foreground flex items-center gap-2'>
                        <Calculator className='h-5 w-5 text-primary' />
                        Complete Depreciation Schedule
                    </h3>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-muted/50'>
                            <tr>
                                <th className='px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                                    Year
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                                    Annual Depreciation
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                                    Accumulated Depreciation
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                                    Book Value
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-card divide-y divide-border'>
                            {/* Initial row (Year 0) */}
                            <tr className='bg-muted/30 hover:bg-muted/50 transition-colors'>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-card-foreground'>
                                    0 (Initial)
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-muted-foreground'>
                                    -
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-muted-foreground'>
                                    {formatCurrency(0)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-card-foreground'>
                                    {formatCurrency(input.assetValue)}
                                </td>
                            </tr>

                            {/* Depreciation years */}
                            {results.map((result) => (
                                <tr
                                    key={result.year}
                                    className={
                                        specificYearResult?.year === result.year
                                            ? 'bg-primary/10 hover:bg-primary/15 transition-colors border-l-4 border-l-primary'
                                            : 'hover:bg-muted/30 transition-colors'
                                    }
                                >
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-card-foreground'>
                                        {result.year}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-card-foreground'>
                                        {formatCurrency(
                                            result.annualDepreciation
                                        )}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-card-foreground'>
                                        {formatCurrency(
                                            result.accumulatedDepreciation
                                        )}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-card-foreground'>
                                        {formatCurrency(result.bookValue)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-center pt-6'>
                <Button
                    onClick={onReset}
                    variant='outline'
                    className='px-8 py-2 font-medium transition-all hover:scale-105 hover:shadow-md'
                >
                    Calculate Again
                </Button>
            </div>
        </div>
    )
}

export default DepreciationResults
