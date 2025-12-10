'use client'

import React from 'react'
import Image from 'next/image'
import { Header } from '../header'
import { config } from '@/config'
import { Button } from '@/components/ui/button'

export default function AboutUsPage() {
    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
            <Header />

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-52 lg:px-8 pb-16 flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-transparent dark:from-primary/5">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl mb-6">
                        Tentang Kami
                    </h1>
                    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Mengenal lebih dekat {config.appName}. Sejarah, visi, misi, dan komitmen kami dalam mencerdaskan kehidupan bangsa.
                    </p>
                </div>
            </div>

            {/* Content Container */}
            <main className="flex-grow container mx-auto px-6 py-12 space-y-24">

                {/* School Profile Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/assets/images/gedung-sekolah.jpg"
                            alt="Gedung Sekolah"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Profil Sekolah</h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>
                                {config.appName} adalah lembaga pendidikan menengah pertama yang berdedikasi untuk mencetak generasi muda yang beriman, berilmu, dan berakhlak mulia. Berdiri di bawah naungan Yayasan Pendidikan Hamzanwadi, sekolah kami memadukan kurikulum nasional dengan nilai-nilai keislaman yang kuat.
                            </p>
                            <p>
                                Kami percaya bahwa setiap siswa memiliki potensi unik yang perlu digali dan dikembangkan. Oleh karena itu, kami menyediakan lingkungan belajar yang kondusif, fasilitas modern, dan tenaga pengajar yang profesional untuk mendukung tumbuh kembang siswa secara holistik.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission Section */}
                <section className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Visi & Misi</h2>
                        <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Visi */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Visi</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300 italic">
                                "Terwujudnya Generasi Qur'ani, Berprestasi, Berbudaya, dan Berwawasan Global."
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Misi</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300 list-disc list-inside">
                                <li>Menanamkan nilai-nilai Al-Qur'an dan As-Sunnah dalam kehidupan sehari-hari.</li>
                                <li>Melaksanakan pembelajaran yang aktif, inovatif, kreatif, efektif, dan menyenangkan.</li>
                                <li>Mengembangkan potensi akademik dan non-akademik siswa.</li>
                                <li>Mewujudkan lingkungan sekolah yang bersih, sehat, dan asri.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Headmaster Welcome */}
                <section className="bg-primary/5 rounded-3xl p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                        <div className="flex-shrink-0 relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <Image
                                src={config.kepalaSekolahPhoto}
                                alt={config.kepalaSekolah}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sambutan Kepala Sekolah</h2>
                            <p className="text-primary font-semibold text-lg mb-6">{config.kepalaSekolah}</p>
                            <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                                <p>
                                    Assalamu'alaikum Warahmatullahi Wabarakatuh.
                                </p>
                                <p>
                                    Selamat datang di website resmi {config.appName}. Kami sangat bersyukur dapat menyapa Anda semua melalui media informasi ini. Website ini kami hadirkan sebagai jembatan komunikasi antara sekolah dengan masyarakat luas, khususnya orang tua siswa dan calon siswa.
                                </p>
                                <p>
                                    {config.appName} terus berkomitmen untuk memberikan layanan pendidikan terbaik. Kami menyadari tantangan zaman yang semakin kompleks menuntut kami untuk terus berinovasi dan meningkatkan kualitas pendidikan. Melalui sinergi antara guru, siswa, dan orang tua, kami yakin dapat melahirkan generasi penerus bangsa yang unggul dan berkarakter.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Bergabunglah Bersama Kami</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Jadilah bagian dari keluarga besar {config.appName} dan raih masa depan gemilang.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="font-semibold px-8" asChild>
                            <a href="/ppdb/register">Daftar Sekarang</a>
                        </Button>
                        <Button variant="outline" size="lg" className="font-semibold px-8" asChild>
                            <a href="/contact">Hubungi Kami</a>
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} {config.appName}. All rights reserved.
                    </div>
                    <div className="text-sm text-gray-400 dark:text-gray-600">
                        Sistem Informasi Sekolah
                    </div>
                </div>
            </footer>
        </div>
    )
}
