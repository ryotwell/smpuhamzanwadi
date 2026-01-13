'use client'

import React from 'react'
import { Header } from '../header'
import { config } from '@/config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Send } from 'lucide-react'

export default function Contact() {
    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
            <Header />

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-52 lg:px-8 pb-16 flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-transparent dark:from-primary/5">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl mb-6">
                        Hubungi Kami
                    </h1>
                    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui informasi kontak di bawah ini atau kirimkan pesan langsung.
                    </p>
                </div>
            </div>

            {/* Content Container */}
            <main className="flex-grow container mx-auto px-6 py-12 space-y-24">

                {/* Contact Information & Form */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Informasi Kontak</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                                Kunjungi sekolah kami atau hubungi kami melalui saluran resmi berikut.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Alamat</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {config.contactAddress}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Telepon</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {config.contactPhone}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {config.contactEmail}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Media Sosial</h3>
                            <div className="flex gap-4">
                                <a href={config.contactSocialMediaFacebook} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href={config.contactSocialMediaInstagram} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href={config.contactSocialMediaYoutube} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Kirim Pesan</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-gray-300">Nama Lengkap</label>
                                    <Input id="name" placeholder="Nama Anda" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <Input id="email" type="email" placeholder="email@contoh.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-900 dark:text-gray-300">Subjek</label>
                                <Input id="subject" placeholder="Perihal pesan" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-900 dark:text-gray-300">Pesan</label>
                                <Textarea id="message" placeholder="Tulis pesan Anda di sini..." className="min-h-[150px]" />
                            </div>
                            <Button type="submit" size="lg" className="w-full font-semibold">
                                <Send className="w-4 h-4 mr-2" />
                                Kirim Pesan
                            </Button>
                        </form>
                    </div>
                </section>

                {/* Map Section */}
                <section className="h-[450px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                    <iframe
                        src={config.contactMap}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>

            </main>
        </div>
    )
}