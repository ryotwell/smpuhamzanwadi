'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '../header'
import { config } from '@/config'
import { usePostStore } from '@/store/usePostStore'
import { formatDateWithDayName } from '@/lib/utils'

export default function PostsPage() {
    const { posts, getPosts, loading } = usePostStore()

    useEffect(() => {
        getPosts({ limit: 12 })
    }, [])

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
            <Header />

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-52 lg:px-8 pb-16 flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-transparent dark:from-primary/5">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl mb-6">
                        Berita & Kegiatan
                    </h1>
                    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Informasi terbaru seputar kegiatan sekolah, prestasi siswa, dan artikel menarik lainnya.
                    </p>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-6 py-12">
                {loading && posts.length === 0 ? (
                    <div className="grid gap-8 md:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-900">
                                <div className="h-48 bg-gray-300 dark:bg-gray-800"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-1/4"></div>
                                    <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/posts/${post.slug}`}
                                className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
                            >
                                {post.thumbnail && (
                                    <div className="h-56 w-full overflow-hidden">
                                        <Image
                                            src={post.thumbnail}
                                            alt={post.title}
                                            width={800}
                                            height={600}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                                        <span>{formatDateWithDayName(post.created_at)}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                        {post.description}
                                    </p>
                                    <span className="inline-block text-primary font-semibold text-sm group-hover:underline">
                                        Baca Selengkapnya &rarr;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                        Belum ada berita atau kegiatan yang ditampilkan.
                    </div>
                )}
            </main>
        </div>
    )
}
