'use client'

import React, { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// Import shadcn navigation menu components
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'
import { Button } from '@/components/ui/button'
import { ImageSlider } from '@/components/ui/ImageSlider'
import { config } from '@/config'

const slides = [
    {
        image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
        title: "Lingkungan Belajar Nyaman",
        desc: "Fasilitas sekolah yang mendukung proses belajar mengajar secara optimal.",
        cta: { label: "Lihat Fasilitas", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        title: "Kegiatan Ekstrakurikuler",
        desc: "Beragam kegiatan untuk mengembangkan bakat dan minat siswa.",
        cta: { label: "Ekstrakurikuler", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        title: "Prestasi Siswa",
        desc: "Siswa kami berprestasi di tingkat lokal, nasional, dan internasional.",
        cta: { label: "Lihat Prestasi", href: "#" }
    }
]

const unggulanSlides = [
    // Bahasa Inggris
    {
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
        title: "Pembelajaran Bahasa Inggris",
        desc: "Program intensif Bahasa Inggris untuk meningkatkan kemampuan komunikasi global siswa.",
        cta: { label: "Selengkapnya", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
        title: "English Club",
        desc: "Kegiatan English Club untuk melatih speaking, listening, dan writing secara menyenangkan.",
        cta: { label: "Gabung English Club", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        title: "Kompetisi Bahasa Inggris",
        desc: "Siswa berpartisipasi dalam lomba debat, pidato, dan olimpiade Bahasa Inggris.",
        cta: { label: "Lihat Prestasi", href: "#" }
    },
    // Pendidikan Karakter
    {
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80",
        title: "Pembentukan Karakter",
        desc: "Menanamkan nilai-nilai kejujuran, disiplin, dan tanggung jawab dalam keseharian siswa.",
        cta: { label: "Pelajari Program", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
        title: "Kegiatan Sosial",
        desc: "Kegiatan bakti sosial dan gotong royong untuk membangun empati dan kepedulian.",
        cta: { label: "Lihat Kegiatan", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1200&q=80",
        title: "Pembiasaan Positif",
        desc: "Pembiasaan salam, senyum, sapa, sopan, dan santun di lingkungan sekolah.",
        cta: { label: "Baca Selengkapnya", href: "#" }
    },
    // Al-Qur'an
    {
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
        title: "Tahfidz Al-Qur'an",
        desc: "Program menghafal Al-Qur'an dengan bimbingan guru berpengalaman.",
        cta: { label: "Program Tahfidz", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        title: "Tartil & Tilawah",
        desc: "Pembelajaran membaca Al-Qur'an dengan tartil dan tajwid yang benar.",
        cta: { label: "Pelajari Tartil", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
        title: "Kegiatan Keagamaan",
        desc: "Kegiatan tadarus, kultum, dan peringatan hari besar Islam.",
        cta: { label: "Lihat Kegiatan", href: "#" }
    }
]

function ListItem({ title, href, children }: { title: string, href: string, children: React.ReactNode }) {
    return (
        <li>
            <a
                href={href}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-primary/10 dark:hover:bg-white/10"
            >
                <div className="font-semibold dark:text-white text-gray-900">{title}</div>
                <div className="text-sm dark:text-gray-300 text-gray-600">{children}</div>
            </a>
        </li>
    )
}

// Menu utama sekolah
const navigation = [
    { name: 'Beranda', href: '#' },
    { name: 'Profil', href: '#' },
    { name: 'Guru & Staf', href: '#' },
    { name: 'Kontak', href: '#' },
]

// Dropdown menu sekolah
const components = [
    {
        title: "Visi & Misi",
        href: "#",
        description: "Tujuan dan cita-cita sekolah untuk masa depan.",
    },
    {
        title: "Sejarah Sekolah",
        href: "#",
        description: "Perjalanan dan perkembangan sekolah dari masa ke masa.",
    },
    {
        title: "Ekstrakurikuler",
        href: "#",
        description: "Kegiatan tambahan untuk mengembangkan bakat dan minat siswa.",
    },
    {
        title: "Prestasi",
        href: "#",
        description: "Daftar penghargaan dan pencapaian sekolah.",
    },
]

// Dummy data untuk berita, artikel & informasi
const newsArticles = [
    {
        id: 1,
        title: "Siswa SMP Unggulan Hamzanwadi Raih Juara Olimpiade Sains",
        date: "10 Juni 2025",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
        excerpt: "Prestasi membanggakan diraih oleh siswa SMP Unggulan Hamzanwadi dalam ajang Olimpiade Sains tingkat nasional.",
        href: "#"
    },
    {
        id: 2,
        title: "Workshop Guru: Inovasi Pembelajaran Digital",
        date: "5 Juni 2025",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
        excerpt: "Para guru mengikuti workshop untuk meningkatkan kompetensi dalam pembelajaran berbasis digital.",
        href: "#"
    },
    {
        id: 3,
        title: "Penerimaan Peserta Didik Baru (PPDB) 2025 Dibuka",
        date: "1 Juni 2025",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
        excerpt: "Pendaftaran siswa baru tahun ajaran 2024/2025 telah resmi dibuka. Segera daftarkan diri Anda!",
        href: "#"
    },
]

// Data Ekstrakurikuler
const ekstrakurikulerList = [
    {
        name: "Pramuka",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        desc: "Kegiatan kepramukaan untuk membentuk karakter, kepemimpinan, dan kemandirian siswa."
    },
    {
        name: "Paskibra",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        desc: "Pasukan Pengibar Bendera, melatih kedisiplinan dan rasa cinta tanah air."
    },
    {
        name: "Seni Musik",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
        desc: "Ekstrakurikuler musik untuk menyalurkan bakat seni dan kreativitas siswa."
    },
    {
        name: "Olahraga (Futsal, Basket, dll)",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        desc: "Berbagai pilihan olahraga untuk menjaga kebugaran dan semangat sportivitas."
    },
    {
        name: "Karya Ilmiah Remaja (KIR)",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        desc: "Mengembangkan minat dan bakat siswa dalam bidang penelitian dan karya ilmiah."
    },
    {
        name: "Seni Tari",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
        desc: "Ekstrakurikuler tari tradisional dan modern untuk menumbuhkan kecintaan pada budaya."
    },
]

// Data Fasilitas Sekolah
const fasilitasList = [
    {
        name: "Ruang Kelas Nyaman",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
        desc: "Setiap ruang kelas dilengkapi dengan fasilitas modern, pencahayaan baik, dan ventilasi udara yang optimal."
    },
    {
        name: "Laboratorium IPA",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
        desc: "Laboratorium sains lengkap untuk mendukung pembelajaran praktikum Biologi, Fisika, dan Kimia."
    },
    {
        name: "Perpustakaan",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
        desc: "Perpustakaan dengan koleksi buku pelajaran, referensi, dan literatur penunjang yang beragam."
    },
    {
        name: "Lapangan Olahraga",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
        desc: "Lapangan multifungsi untuk kegiatan olahraga seperti futsal, basket, dan upacara."
    },
    {
        name: "Ruang Komputer",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
        desc: "Ruang komputer dengan perangkat terbaru untuk mendukung pembelajaran teknologi informasi."
    },
    {
        name: "Musholla",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80",
        desc: "Tempat ibadah yang nyaman dan bersih untuk mendukung kegiatan keagamaan siswa."
    },
]

// Data Sambutan Kepala Sekolah
const sambutanKepalaSekolah = {
    nama: "Drs. H. Ahmad Zainuddin, M.Pd.",
    foto: "/assets/images/kepala-sekolah.png",
    sambutan: `Sebagai lembaga pendidikan, SMP Unggulan Hamzanwadi tanggap dengan perkembangan teknologi tersebut. Dengan dukungan SDM yang di miliki sekolah ini`
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white dark:bg-gray-950 mb-28 transition-colors duration-300 min-h-screen flex flex-col">

            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex items-center gap-3 lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5 flex items-center gap-3">
                            <span className="sr-only">{config.appName}</span>
                            <img
                                alt={config.appName}
                                src={config.appLogo}
                                className="h-8 w-auto"
                            />
                            <span className="ml-2 text-gray-900 dark:text-white sm:text-white font-semibold text-base hidden sm:inline">{config.appName}</span>
                        </a>
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
                    <div className="hidden lg:flex lg:gap-x-12">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navigation.map((item) => (
                                    <NavigationMenuItem key={item.name}>
                                        <NavigationMenuLink
                                            href={item.href}
                                            className="text-sm font-semibold text-gray-900 dark:text-white px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 sm:text-white transition-colors"
                                        >
                                            {item.name}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                            <NavigationMenuItem className="list-none">
                                <NavigationMenuTrigger className="text-sm font-semibold text-gray-900 dark:text-white px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 sm:text-white transition-colors bg-transparent">
                                    Tentang Sekolah
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
                        </NavigationMenu>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-end gap-4">
                        <ThemeToggleButton />
                        <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white sm:text-white">
                            PPDB <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-700/30">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-3">
                                <span className="sr-only">{config.appName}</span>
                                <img
                                    alt={config.appName}
                                    src={config.appLogo}
                                    className="h-8 w-auto"
                                />
                                <span className="ml-2 text-gray-900 dark:text-white font-semibold text-base">{config.appName}</span>
                            </a>
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
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                    {/* Dropdown menu for mobile */}
                                    <div className="mt-4">
                                        <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2">Tentang Sekolah</div>
                                        <ul>
                                            {components.map((component) => (
                                                <li key={component.title}>
                                                    <a
                                                        href={component.href}
                                                        className="block rounded-md px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <div className="font-semibold">{component.title}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{component.description}</div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        PPDB
                                    </a>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            {/* Hero */}
            <div className="relative isolate px-6 pt-14 lg:px-8 h-svh flex items-center">
                {/* Full background video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                    poster="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                >
                    <source src="/assets/images/hero.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support the video tag */}
                </video>
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 -z-10" />
                {/* <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 bg-accent"> */}
                <div className="mx-auto max-w-2xl">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-100 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-700 bg-black/30 dark:bg-black/40 hover:ring-gray-300 dark:hover:ring-gray-500">
                            Penerimaan Peserta Didik Baru (PPDB) Tahun 2024.{' '}
                            <a href="#" className="font-semibold text-primary">
                                <span aria-hidden="true" className="absolute inset-0" />
                                Info Selengkapnya <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-primary sm:text-7xl drop-shadow-lg">
                            SMP Unggulan Hamzanwadi
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-100 dark:text-gray-200 sm:text-xl/8 drop-shadow">
                            Temukan informasi seputar profil sekolah, kegiatan, prestasi, dan pendaftaran siswa baru di sini.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Daftar Sekarang
                            </a>
                            <a href="#" className="text-sm/6 font-semibold text-white dark:text-white hover:underline">
                                Lihat Profil Sekolah <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 translate-x-[-50%] mb-4 flex justify-center md:hidden">
                    <Button className="flex flex-col items-center justify-center gap-1 text-primary/80" variant="ghost">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 animate-bounce"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                                />
                            </svg>
                        </div>
                        {/* <div>
                            Scrolldown
                        </div> */}
                    </Button>
                </div>
            </div>

            {/* Section Sambutan Kepala Sekolah */}
            <section className="max-w-3xl mx-auto mt-24 px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Sambutan Kepala Sekolah
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-4 border-primary shadow overflow-hidden flex items-center justify-center bg-white dark:bg-gray-900">
                            <img
                                src={sambutanKepalaSekolah.foto}
                                alt={sambutanKepalaSekolah.nama}
                                className="w-full h-full object-cover rounded-full"
                                style={{ aspectRatio: "1 / 1" }}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-700 dark:text-gray-200 text-lg whitespace-pre-line mb-4">
                            {sambutanKepalaSekolah.sambutan}
                        </p>
                        <div className="font-semibold text-primary text-lg">{sambutanKepalaSekolah.nama}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">Kepala Sekolah</div>
                        <div className="mt-4">
                            <a
                                href="#"
                                className="inline-block text-primary font-semibold hover:underline text-base"
                            >
                                Selengkapnya &rarr;
                            </a>
                        </div>
                    </div>
                </div>
                {/* Statistik Data Sekolah */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
                        <div className="text-4xl font-bold text-primary mb-2">172</div>
                        <div className="text-gray-700 dark:text-gray-200 text-lg font-medium">Guru &amp; Staf</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
                        <div className="text-4xl font-bold text-primary mb-2">1588</div>
                        <div className="text-gray-700 dark:text-gray-200 text-lg font-medium">Siswa</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
                        <div className="text-4xl font-bold text-primary mb-2">64</div>
                        <div className="text-gray-700 dark:text-gray-200 text-lg font-medium">Rombel</div>
                    </div>
                </div>
            </section>

            {/* Section Sorotan Sekolah */}
            <div className="max-w-3xl mx-auto mt-24">
                <div className="px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                        Sorotan Sekolah
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        Lihat berbagai kegiatan, prestasi, dan momen terbaik di SMP Unggulan Hamzanwadi melalui galeri sorotan berikut.
                    </p>
                </div>
                <ImageSlider slides={slides} />
            </div>

            {/* Section Unggulan */}
            <div className="relative max-w-3xl mx-auto mt-24 isolate">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                    />
                </div>
                <div className="px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                        Program Unggulan
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        Tiga program unggulan SMP Unggulan Hamzanwadi: Bahasa Inggris, Pendidikan Karakter, dan Al-Qur'an. Membekali siswa dengan kemampuan global, karakter mulia, dan kecintaan pada Al-Qur'an.
                    </p>
                </div>
                <ImageSlider slides={unggulanSlides} />
            </div>

            {/* Section Fasilitas Sekolah */}
            <section className="max-w-5xl mx-auto mt-24">
                <div className="px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                        Fasilitas Sekolah
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        SMP Unggulan Hamzanwadi menyediakan berbagai fasilitas modern dan lengkap untuk mendukung proses belajar mengajar dan pengembangan diri siswa.
                    </p>
                </div>
                <div className="flex gap-8 overflow-x-auto pb-4 px-4">
                    {fasilitasList.map((fasilitas) => (
                        <div
                            key={fasilitas.name}
                            className="min-w-[320px] max-w-sm flex-shrink-0 group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
                        >
                            <div className="h-64 w-full overflow-hidden">
                                <img
                                    src={fasilitas.image}
                                    alt={fasilitas.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-7">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                    {fasilitas.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">{fasilitas.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section Ekstrakurikuler */}
            <section className="max-w-5xl mx-auto mt-24 px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    Ekstrakurikuler
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                    SMP Unggulan Hamzanwadi menyediakan berbagai pilihan ekstrakurikuler untuk mengembangkan bakat, minat, dan karakter siswa.
                </p>
                <div className="grid gap-8 md:grid-cols-3">
                    {ekstrakurikulerList.map((ekskul) => (
                        <div
                            key={ekskul.name}
                            className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
                        >
                            <div className="h-40 w-full overflow-hidden">
                                <img
                                    src={ekskul.image}
                                    alt={ekskul.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                    {ekskul.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{ekskul.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section Berita, Artikel & Informasi */}
            <section className="max-w-5xl mx-auto mt-24 px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    Berita, Artikel &amp; Informasi
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                    Dapatkan update terbaru seputar kegiatan, prestasi, dan informasi penting di SMP Unggulan Hamzanwadi.
                </p>
                <div className="grid gap-8 md:grid-cols-3">
                    {newsArticles.map((news) => (
                        <a
                            key={news.id}
                            href={news.href}
                            className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
                        >
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{news.date}</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                    {news.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{news.excerpt}</p>
                                <span className="inline-block text-primary font-semibold text-sm group-hover:underline">
                                    Baca Selengkapnya &rarr;
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* <section className="p-10">
                <div
                    className="bg-red-500 h-32 w-32 relative overflow-hidden group rounded-md cursor-pointer"
                    tabIndex={0}
                    onClick={e => {
                        // Toggle the show state on click (for mobile)
                        e.currentTarget.classList.toggle('show-overlay')
                    }}
                    onBlur={e => {
                        // Remove overlay when focus is lost
                        e.currentTarget.classList.remove('show-overlay')
                    }}
                >
                    <div className="absolute left-0 right-0 bottom-[-100%] group-hover:bottom-0 group-hover:translate-y-0 transition-all duration-700 ease-in-out flex items-center justify-center h-full w-full pointer-events-none show-overlay:bottom-0 show-overlay:translate-y-0">
                        <span className="text-white">Hello World</span>
                    </div>
                    <style jsx>{`
                        .show-overlay .absolute {
                            bottom: 0 !important;
                            transform: translateY(0) !important;
                        }
                    `}</style>
                </div>
            </section> */}

            <footer className="mt-32 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <img
                            src={config.appLogo}
                            alt={config.appName}
                            className="h-10 w-10 object-contain rounded bg-white p-1 shadow"
                        />
                        <span className="font-semibold text-lg text-gray-900 dark:text-white">{config.appName}</span>
                    </div>
                    <div className="flex flex-wrap gap-6 text-gray-700 dark:text-gray-300 text-sm font-medium justify-center">
                        <a href="#" className="hover:underline">Beranda</a>
                        <a href="#" className="hover:underline">Profil</a>
                        <a href="#" className="hover:underline">Guru &amp; Staf</a>
                        <a href="#" className="hover:underline">Kontak</a>
                        <a href="#" className="hover:underline">PPDB</a>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} {config.appName}.</div>
                        <div className="text-xs text-gray-400 dark:text-gray-600">Dibuat dengan <span role="img" aria-label="love">❤️</span> di Lombok Timur.</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}