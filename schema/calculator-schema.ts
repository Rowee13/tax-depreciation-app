'use client'

import { z } from 'zod'

const calculatorFormSchema = z
    .object({
        assetValue: z
            .number({ required_error: 'Asset cost is required' })
            .min(1, { message: 'Asset cost must be at least ₱1' }),

        salvageValue: z
            .number({ required_error: 'Salvage value is required' })
            .min(0, { message: 'Salvage value cannot be negative' }),

        usefulLife: z
            .number({ required_error: 'Useful life is required' })
            .int({ message: 'Useful life must be a whole number' })
            .min(1, { message: 'Useful life must be at least 1 year' })
            .max(100, {
                message: 'Useful life seems too long (max 100 years)',
            }),

        year: z
            .number()
            .int({ message: 'Year must be a whole number' })
            .min(1, { message: 'Year must be at least 1' })
            .optional(),
    })
    .refine((data) => data.salvageValue < data.assetValue, {
        message: 'Salvage value must be less than asset cost',
        path: ['salvageValue'],
    })
    .refine((data) => !data.year || data.year <= data.usefulLife, {
        message: 'Year must be within the useful life range',
        path: ['year'],
    })

export default calculatorFormSchema
