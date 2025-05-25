'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    DepreciationCalculation,
    calculateStraightLineDepreciation,
} from '@/lib/depreciation-calculator'
import calculatorFormSchema from '@/schema/calculator-schema'

import { Button } from '../button'
import DepreciationResults from '../depreciation-results'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../form'
import { Input } from '../input'

const CalculatorForm = () => {
    const [calculation, setCalculation] =
        useState<DepreciationCalculation | null>(null)

    const form = useForm<z.infer<typeof calculatorFormSchema>>({
        resolver: zodResolver(calculatorFormSchema),
        defaultValues: {
            assetValue: 0,
            salvageValue: 0,
            usefulLife: 0,
            year: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof calculatorFormSchema>) {
        const result = calculateStraightLineDepreciation({
            assetValue: values.assetValue,
            salvageValue: values.salvageValue,
            usefulLife: values.usefulLife,
            year: values.year,
        })
        setCalculation(result)
    }

    function handleReset() {
        setCalculation(null)
        form.reset()
    }

    // Show results if calculation is complete
    if (calculation) {
        return (
            <DepreciationResults
                calculation={calculation}
                onReset={handleReset}
            />
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='assetValue'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Asset Value</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter asset value'
                                    type='number'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                Total purchase price of the asset (e.g.
                                ₱1,000,000).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='salvageValue'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Salvage Value</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter salvage value'
                                    type='number'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                Estimated value of the asset at the end of its
                                useful life (e.g. ₱100,000).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='usefulLife'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Useful Life</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter useful life'
                                    type='number'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                Estimated number of years the asset will be in
                                use (e.g. 10 years).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='year'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter specific year (optional)'
                                    type='number'
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        field.onChange(
                                            value ? parseInt(value) : undefined
                                        )
                                    }}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormDescription>
                                Specific year to view depreciation up to that
                                point (e.g. Year 3). Leave empty to see full
                                schedule.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full'>
                    Calculate Depreciation
                </Button>
            </form>
        </Form>
    )
}

export default CalculatorForm
