import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Rocket } from 'lucide-react'
import { navItems } from '@/constants/uiConstants'

const Navbar: React.FC = () => {
    return (
        <nav className="grid grid-cols-12 md:flex flex-col justify-between items-center p-2 md:py-2">
            {/* Desktop Nav */}
            <div className="hidden md:flex flex-col items-center justify-center w-16">
                <a
                    href="#"
                    target="_self"
                    className="bg-(--brand-p1)/25 p-2.5 rounded-lg mb-4">
                    <Rocket
                        size={28}
                        className="text-(--brand-p3)"
                    />
                </a>
                {navItems.map(nItem => (
                    <div
                        key={nItem.title}
                        className="flex flex-col items-center justify-center gap-1 hover:bg-(--brand-p1)/25 transition-all duration-300 p-2 rounded-lg">
                        <nItem.icon />
                        <span className="font-normal text-xs">
                            {nItem.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Mobile Nav */}
            <span className="col-span-2 md:hidden">
                <Button
                    variant="link"
                    className="gap-1 items-center">
                    <ChevronLeft />
                    Back
                </Button>
            </span>
            <h3 className="col-span-8 text-center md:hidden font-medium">
                Dashboard
            </h3>

            <Avatar className="col-span-2 justify-self-end">
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Avatar Image"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </nav>
    )
}

export default Navbar
