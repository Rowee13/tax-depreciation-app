export interface DepreciationInput {
    assetValue: number
    salvageValue: number
    usefulLife: number
    year?: number
}

export interface DepreciationResult {
    annualDepreciation: number
    accumulatedDepreciation: number
    bookValue: number
    year: number
}

export interface DepreciationCalculation {
    input: DepreciationInput
    annualDepreciationAmount: number
    results: DepreciationResult[]
    specificYearResult?: DepreciationResult
}

/**
 * Calculate straight-line depreciation
 * Formula: (Asset Value - Salvage Value) / Useful Life
 */
export function calculateStraightLineDepreciation(
    input: DepreciationInput
): DepreciationCalculation {
    const { assetValue, salvageValue, usefulLife, year } = input

    // Calculate annual depreciation amount
    const annualDepreciationAmount = (assetValue - salvageValue) / usefulLife

    // Generate depreciation schedule for all years
    const results: DepreciationResult[] = []
    let accumulatedDepreciation = 0

    for (let currentYear = 1; currentYear <= usefulLife; currentYear++) {
        accumulatedDepreciation += annualDepreciationAmount
        const bookValue = assetValue - accumulatedDepreciation

        results.push({
            year: currentYear,
            annualDepreciation: annualDepreciationAmount,
            accumulatedDepreciation,
            bookValue: Math.max(bookValue, salvageValue), // Ensure book value doesn't go below salvage value
        })
    }

    // Find specific year result if requested
    const specificYearResult = year
        ? results.find((r) => r.year === year)
        : undefined

    return {
        input,
        annualDepreciationAmount,
        results,
        specificYearResult,
    }
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    }).format(amount)
}
