'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { ImageSlider } from '@/components/ui/ImageSlider'
import { config } from '@/config'
import { Header } from './header'
import Link from 'next/link'
import { cn, formatDateWithDayName } from '@/lib/utils'
import { usePostStore } from '@/store/usePostStore'
import { useCurriculumStore } from '@/store/useCurriculumStore'
import { useFacilityStore } from '@/store/useFacilityStore'
import { Curriculum } from '@/types/model'
import { ArrowRight } from 'lucide-react'

export default function Content() {
    const { posts, getPosts } = usePostStore()
    const { curriculums, getCurriculums } = useCurriculumStore()
    const { facilities, getFacilities } = useFacilityStore()

    useEffect(() => {
        getPosts({ limit: 3 });
        getCurriculums({ limit: '100' }); // Fetch enough to cover all categories
        getFacilities({ limit: '100' });
    }, []);

    // Helper to group curriculums by category
    const getCurriculumsByCategory = (category: string) => {
        return curriculums.filter((item) => item.category === category)
    }

    const dynamicUnggulanSlides = getCurriculumsByCategory("PROGRAM UNGGULAN").map(item => ({
        image: item.image || "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
        title: item.name,
        desc: item.description || "Program unggulan sekolah.",
        cta: { label: "Selengkapnya", href: "#" }
    }));

    const dynamicKurikulumData = [
        {
            id: "ekstrakurikuler",
            category: "Ekstrakurikuler",
            data: getCurriculumsByCategory("EXTRACURRICULAR").map(item => ({
                name: item.name,
                image: item.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Fallback image
                desc: item.description || "Kegiatan kepramukaan untuk membentuk karakter, kepemimpinan, dan kemandirian siswa."
            }))
        },
        {
            id: "kokulikuler",
            category: "KO-Kulikuler",
            data: getCurriculumsByCategory("KO-CULLICULAR").map(item => ({
                name: item.name,
                image: item.image || "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
                desc: item.description || "Kegiatan praktikum laboratorium sains & teknologi bagi pengembangan kompetensi siswa."
            }))
        },
    ].filter(cat => cat.data.length > 0); // Only show categories with data

    return (
        <>
            {/* Hero */}
            <div className="relative isolate px-6 pt-14 lg:px-8 h-svh flex items-center">
                {/* Full background video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                    // poster="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    poster="/assets/images/hero-image-coba.jpg"
                >
                    {/* <source src="/assets/images/hero.mp4" type="video/mp4" /> */}
                    <source src="hero-coba.MOV" type="video/mp4" />
                </video>
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/70 -z-10" />
                <div className="mx-auto max-w-2xl">
                    <Link href="/ppdb/info" className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-100 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-700 bg-black/30 dark:bg-black/40 hover:ring-gray-300 dark:hover:ring-gray-500">
                            Penerimaan Peserta Didik Baru (PPDB) Tahun {new Date().getFullYear()}.&nbsp;
                        </div>
                    </Link>
                    <div className="text-center">
                        <Image
                            src={config.appLogoPanjang}
                            alt={config.appName}
                            width={500}
                            height={100}
                            className="w-full"
                        />
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-100 dark:text-gray-200 sm:text-xl/8 drop-shadow">
                            Temukan informasi seputar profil sekolah, kegiatan, prestasi, dan pendaftaran siswa baru di sini.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/ppdb/info"
                                className="rounded-md bg-primary px-3.5 py-2.5 text-base font-semibold text-white shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Daftar Sekarang
                            </Link>
                            <a href="#" className="text-base font-semibold text-white dark:text-white hover:underline">
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
                            <Image
                                src={config.kepalaSekolahPhoto}
                                alt={config.kepalaSekolah}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover rounded-full"
                                style={{ aspectRatio: "1 / 1" }}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-700 dark:text-gray-200 text-lg whitespace-pre-line mb-4">
                            {config.sambutan?.split(' ').slice(0, 20).join(' ') + (config.sambutan?.split(' ').length > 20 ? '...' : '')}
                        </p>
                        <div className="font-semibold text-primary text-lg">{config.kepalaSekolah}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-base">Kepala Sekolah</div>
                        <div className="mt-4">
                            <a
                                href="/sambutan"
                                className="inline-block text-primary font-semibold hover:underline text-base"
                            >
                                Selengkapnya &rarr;
                            </a>
                        </div>
                    </div>
                </div>
                {/* Statistik Data Sekolah */}
                {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
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
                </div> */}
            </section>

            <div className="relative max-w-3xl mx-auto mt-24 isolate" id="unggulan">
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
                        Tiga program unggulan {config.appName}: Bahasa Inggris, Pendidikan Karakter, dan Al-Qur&apos;an. Membekali siswa dengan kemampuan global, karakter mulia, dan kecintaan pada Al-Qur&apos;an.
                    </p>
                </div>
                <ImageSlider slides={dynamicUnggulanSlides} />
            </div>

            {/* Section Kurikulum */}
            <section id="kurikulum" className="max-w-5xl mx-auto mt-24 px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    Kurikulum
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                    {config.appName} memiliki tiga kategori utama pada Kurikulum: Ekstrakurikuler, Program Unggulan, dan KO-Kulikuler. Setiap kategori berisi kegiatan dan program untuk mendukung bakat, minat, dan kompetensi siswa secara optimal.
                </p>
                <div className="space-y-14">
                    {dynamicKurikulumData.map((kategori) => (
                        <div key={kategori.id} id={kategori.id}>
                            <h3 className="text-2xl font-bold mb-4 text-primary">{kategori.category}</h3>
                            <div className="grid gap-8 md:grid-cols-3">
                                {
                                    kategori.data.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
                                        >
                                            <div className="h-40 w-full overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={800}
                                                    height={600}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300 text-base">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div >
            </section >

            {/* Section Fasilitas Sekolah */}
            <section id="fasilitas" className="max-w-5xl mx-auto mt-24 px-4">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                        Fasilitas Sekolah
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        {config.appName} menyediakan berbagai fasilitas modern dan lengkap untuk mendukung proses belajar mengajar dan pengembangan diri siswa.
                    </p>
                </div>
                {/* Responsive grid for Fasilitas Sekolah */}
                <div
                    className={cn([
                        'grid gap-8',
                        'grid-cols-1',
                        'sm:grid-cols-2',
                        'md:grid-cols-3',
                        'xl:grid-cols-3',
                        '2xl:grid-cols-3',
                    ])}
                >
                    {facilities.map((fasilitas) => (
                        <div
                            key={fasilitas.name}
                            className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
                        >
                            <div className="h-64 w-full overflow-hidden">
                                <Image
                                    src={fasilitas.image || "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80"}
                                    alt={fasilitas.name}
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-7">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                    {fasilitas.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">{fasilitas.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section >

            {/* Section Berita, Artikel & Informasi */}
            <section id="posts" className="max-w-5xl mx-auto mt-24 px-4" >
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    Berita, Artikel &amp; Informasi
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                    Dapatkan update terbaru seputar kegiatan, prestasi, dan informasi penting di {config.appName}.
                </p>
                <div className="grid gap-8 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/posts/${post.slug}`}
                            className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
                        >
                            {post.thumbnail && (
                                <div className="h-48 w-full overflow-hidden">
                                    <Image
                                        src={post.thumbnail}
                                        alt={post.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <div className="p-5">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{formatDateWithDayName(post.created_at)}</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-base mb-4">{post.description}</p>
                                <span className="inline-block text-primary font-semibold text-base group-hover:underline">
                                    Baca Selengkapnya &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/posts" className="flex items-center gap-2">
                            Lihat Semua <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section >

            <footer className="mt-32 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <Image
                            src={config.appLogo}
                            alt={config.appName}
                            width={40}
                            height={40}
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
                        <div className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} {config.appName}.</div>
                        <div className="text-sm text-gray-400 dark:text-gray-600">Dibuat dengan <span role="img" aria-label="love">❤️</span> di Lombok Timur.</div>
                    </div>
                </div>
            </footer>
        </>
    )
}