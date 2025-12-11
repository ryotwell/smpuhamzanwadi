'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '../../header'
import { config } from '@/config'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Calendar, FileText, HelpCircle } from 'lucide-react'

export default function PPDBInfoPage() {
    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
            <Header />

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-56 lg:px-8 pb-16 flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-transparent dark:from-primary/5">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl mb-6">
                        Informasi Pendaftaran (PPDB)
                    </h1>
                    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Bergabunglah dengan {config.appName} dan jadilah bagian dari generasi unggul, berkarakter, dan berprestasi.
                        Simak informasi lengkap mengenai alur pendaftaran, persyaratan, dan jadwal penting di bawah ini.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild size="lg">
                            <Link href="/ppdb/register">Daftar Sekarang</Link>
                        </Button>
                        <a href="#alur" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                            Pelajari Alurnya <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-6 py-12 space-y-24">

                {/* Alur Pendaftaran */}
                <section id="alur" className="scroll-mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Alur Pendaftaran</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Ikuti langkah-langkah mudah berikut untuk mendaftarkan putra-putri Anda di {config.appName}.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2" />

                        {[
                            { step: 1, title: 'Isi Formulir', desc: 'Lengkapi formulir pendaftaran secara online melalui website ini.', icon: FileText },
                            // { step: 2, title: 'Pembayaran', desc: 'Lakukan pembayaran biaya pendaftaran sesuai instruksi.', icon: CheckCircle2 },
                            { step: 2, title: 'Verifikasi', desc: 'Panitia akan memverifikasi data dan berkas yang Anda kirimkan.', icon: Calendar }, // Using Calendar as placeholder
                            { step: 3, title: 'Seleksi & Pengumuman', desc: 'Ikuti tes seleksi (jika ada) dan tunggu pengumuman hasil.', icon: HelpCircle },
                        ].map((item) => (
                            <div key={item.step} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative">
                                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-md z-10">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Persyaratan */}
                <section className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 md:p-12">
                    <div className="md:flex gap-12 items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Persyaratan Umum</h2>
                            <ul className="space-y-4">
                                {[
                                    'Mengisi formulir pendaftaran.',
                                    'Pas foto berwarna ukuran 3x4 (2 lembar).',
                                    'Fotokopi Akta Kelahiran.',
                                    'Fotokopi Kartu Keluarga (KK).',
                                    'Fotokopi Rapor kelas 4, 5, dan 6 (semester 1).',
                                    'Surat Keterangan Sehat dari Dokter.',
                                ].map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-200">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Catatan Penting</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Pastikan semua berkas yang diunggah atau diserahkan adalah dokumen yang valid dan masih berlaku.
                                Kesalahan data dapat mempengaruhi proses seleksi.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                <Calendar className="w-4 h-4" />
                                <span>Periode Pendaftaran: 1 Januari - 30 April 2025</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ / Pertanyaan Umum */}
                <section className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pertanyaan Umum</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Beberapa pertanyaan yang sering ditanyakan oleh calon wali siswa.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: 'Apakah ada tes masuk?', a: 'Ya, terdapat tes potensi akademik dan wawancara untuk calon siswa dan orang tua.' },
                            { q: 'Apakah menyediakan beasiswa?', a: 'Kami menyediakan beasiswa prestasi dan beasiswa bagi siswa kurang mampu yang memenuhi syarat.' },
                            { q: 'Berapa biaya pendaftarannya?', a: 'Biaya pendaftaran dapat dilihat pada menu rincian biaya saat mengisi formulir.' },
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-gray-400" />
                                    {faq.q}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 pl-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Final */}
                <section className="text-center py-12">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Siap Mendaftar?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                            Jangan lewatkan kesempatan untuk bergabung dengan {config.appName}. Kuota terbatas!
                        </p>
                        <Button size="lg" className="font-semibold px-8" asChild>
                            <Link href="/ppdb/register">Daftar Sekarang</Link>
                        </Button>
                    </div>
                </section>

            </main>

            <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} {config.appName}. All rights reserved.
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link href="/terms" className="hover:underline">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
