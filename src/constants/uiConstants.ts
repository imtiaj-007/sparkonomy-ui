import type { NavItem } from '@/types/general'
import { CreditCard, FileText, Layout, ShoppingCart } from 'lucide-react'

export const navItems: NavItem[] = [
    { title: 'Home', icon: Layout, href: '#' },
    { title: 'Invoice', icon: FileText, href: '#' },
    { title: 'Order', icon: ShoppingCart, href: '#' },
    { title: 'Payment', icon: CreditCard, href: '#' },
]
