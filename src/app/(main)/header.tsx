"use client"

import React from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'
import { config } from '@/config'

function ListItem({ title, href, children }: { title: string, href: string, children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-primary/10 dark:hover:bg-white/10"
            >
                <div className="font-semibold dark:text-white text-gray-900">{title}</div>
                <div className="text-sm dark:text-gray-300 text-gray-600">{children}</div>
            </Link>
        </li>
    )
}

// Menu utama sekolah
const navigation = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'News and Event', href: '#' },
    { name: 'Achievements', href: '#' },
]

// Dropdown menu sekolah
const components = [
    {
        title: "Ekstrakurikuler",
        href: "#",
        description: "Kegiatan tambahan di luar jam pelajaran untuk mengembangkan bakat, minat, dan karakter siswa.",
    },
    {
        title: "Program Unggulan",
        href: "#",
        description: "Program-program utama sekolah yang menjadi keunggulan dan ciri khas SMP Unggulan Hamzanwadi.",
    },
    {
        title: "KO-Kulikuler",
        href: "#",
        description: "Kegiatan pendukung pembelajaran yang menunjang kompetensi siswa di berbagai bidang.",
    },
]

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex flex-col gap-0 p-6 lg:px-8">
                {/* Bar Atas: Logo & tombol mobile/menu */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                            <span className="sr-only">{config.appName}</span>
                            <Image
                                alt={config.appName}
                                src={config.appLogoPanjang}
                                width={100}
                                height={100}
                                className="h-13 w-auto"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 lg:hidden">
                        <ThemeToggleButton />
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-500 dark:text-gray-400"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-end gap-4">
                        <ThemeToggleButton />
                        <Link href="/ppdb/register" className="text-sm/6 font-semibold text-gray-900 dark:text-white sm:text-white">
                            PPDB <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
                {/* Menu Desktop Bar (row baru di bawah logo) */}
                <div className="hidden lg:flex w-full mt-4 justify-start">
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-row items-center gap-x-8">
                            {navigation.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuLink
                                        asChild
                                        className="text-sm font-semibold text-gray-900 dark:text-white px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 sm:text-white transition-colors"
                                    >
                                        <Link href={item.href}>
                                            {item.name}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                            <NavigationMenuItem className="list-none">
                                <NavigationMenuTrigger className="text-sm font-semibold text-gray-900 dark:text-white px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 sm:text-white transition-colors bg-transparent">
                                    Kurikulum
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-white dark:bg-gray-900 ring-0">
                                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4 m-0 list-none">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-700/30">
                    {/* ...mobile nav... */}
                    <div className="flex items-center justify-between">
                        <Link href="#" className="-m-1.5 p-1.5 flex items-center gap-3">
                            <span className="sr-only">{config.appName}</span>
                            <Image
                                alt={config.appName}
                                src={config.appLogo}
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />
                            <span className="ml-2 text-gray-900 dark:text-white font-semibold text-base">{config.appName}</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <ThemeToggleButton />
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {/* Dropdown menu for mobile */}
                                <div className="mt-4">
                                    <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2">Kurikulum</div>
                                    <ul>
                                        {components.map((component) => (
                                            <li key={component.title}>
                                                <Link
                                                    href={component.href}
                                                    className="block rounded-md px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                                >
                                                    <div className="font-semibold">{component.title}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{component.description}</div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="py-6">
                                <Link
                                    href="/ppdb/register"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    PPDB
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
