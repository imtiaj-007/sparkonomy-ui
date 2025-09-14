import { generateMonthlyData } from '@/lib/utils'
import type { MonthlyData, TimeFilter } from '@/types/invoice'
import { CalendarSearch } from 'lucide-react'

export const filterOptions: TimeFilter[] = [
    { label: '1 Month', value: '1m', icon: null, pro: false },
    { label: '3 Month', value: '3m', icon: null, pro: false },
    { label: '6 Month', value: '6m', icon: null, pro: false },
    { label: '1 Year', value: '12m', icon: null, pro: true },
    { label: 'Custom', value: 'custom', icon: CalendarSearch, pro: false },
]

export const monthlyData: MonthlyData[] = generateMonthlyData()
