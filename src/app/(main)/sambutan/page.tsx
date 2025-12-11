'use client'

import React from 'react'
import Image from 'next/image'
import { Header } from '../header'
import { config } from '@/config'

export default function SambutanPage() {
    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
            <Header />

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-32 lg:px-8 pb-16 flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-transparent dark:from-primary/5">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl mb-6">
                        Sambutan Kepala Sekolah
                    </h1>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-gray-100 dark:bg-gray-800 p-8 flex flex-col items-center justify-start text-center border-r border-gray-200 dark:border-gray-700">
                            <div className="w-48 h-48 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden mb-6">
                                <Image
                                    src={config.kepalaSekolahPhoto}
                                    alt={config.kepalaSekolah}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{config.kepalaSekolah}</h2>
                            <p className="text-sm text-primary font-medium mb-4">Kepala Sekolah</p>
                            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700 my-4"></div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                "{config.appName} berkomitmen mencetak generasi unggul dan berkarakter."
                            </p>
                        </div>
                        <div className="md:w-2/3 p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 border-gray-100 dark:border-gray-800">
                                Assalamu'alaikum Warahmatullahi Wabarakatuh
                            </h3>
                            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 space-y-4 text-justify leading-relaxed">
                                {config.sambutan?.split('\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                                <p className="font-semibold text-gray-900 dark:text-white">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} {config.appName}. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
