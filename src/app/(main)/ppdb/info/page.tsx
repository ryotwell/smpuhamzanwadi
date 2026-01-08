'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '../../header'
import { config } from '@/config'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Calendar, FileText, HelpCircle, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'
import { useRequirementStore } from '@/store/useRequirementStore'
import { useFaqStore } from '@/store/useFaqStore'

export default function PPDBInfoPage() {
    const { requirements, getRequirements } = useRequirementStore()
    const { faqs, getFaqs } = useFaqStore()

    useEffect(() => {
        getRequirements()
        getFaqs()
    }, [getRequirements, getFaqs])

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
                                {requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-200">{req.description}</span>
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
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-gray-400" />
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 pl-7">{faq.answer}</p>
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

            <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 mt-auto">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* School Info */}
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{config.appName}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                                Membentuk generasi unggul yang berkarakter islami, cerdas, dan kompetitif di era global.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors text-gray-600 dark:text-gray-400 shadow-sm border border-gray-200 dark:border-gray-700">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors text-gray-600 dark:text-gray-400 shadow-sm border border-gray-200 dark:border-gray-700">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors text-gray-600 dark:text-gray-400 shadow-sm border border-gray-200 dark:border-gray-700">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Hubungi Kami</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-primary" />
                                    <span>
                                        Jln. Dr. Ciptomangun Kusumo Sawing, Majidi,<br />
                                        Selong, Lombok Timur, NTB
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                    <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                                    <span>(0376) 2991000</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                    <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                                    <span>info@smpuhamzanwadi.sch.id</span>
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Tautan</h4>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                                <li><Link href="/ppdb/info" className="hover:text-primary transition-colors">PPDB</Link></li>
                                <li><Link href="/about-us" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
                                <li><Link href="/posts" className="hover:text-primary transition-colors">Berita</Link></li>
                                <li><Link href="/contact" className="hover:text-primary transition-colors">Kontak</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} {config.appName}. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
