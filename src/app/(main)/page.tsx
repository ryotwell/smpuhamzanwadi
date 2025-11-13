'use client'

import React from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { ImageSlider } from '@/components/ui/ImageSlider'
import { config } from '@/config'
import { Header } from './header'

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
        title: "Tahfidz Al-Qur&apos;an",
        desc: "Program menghafal Al-Qur&apos;an dengan bimbingan guru berpengalaman.",
        cta: { label: "Program Tahfidz", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        title: "Tartil & Tilawah",
        desc: "Pembelajaran membaca Al-Qur&apos;an dengan tartil dan tajwid yang benar.",
        cta: { label: "Pelajari Tartil", href: "#" }
    },
    {
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
        title: "Kegiatan Keagamaan",
        desc: "Kegiatan tadarus, kultum, dan peringatan hari besar Islam.",
        cta: { label: "Lihat Kegiatan", href: "#" }
    }
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

// Data Kurikulum
const kurikulumData = [
    {
        category: "Ekstrakurikuler",
        data: [
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
            }
        ]
    },
    {
        category: "Program Unggulan",
        data: [
            {
                name: "Bahasa Inggris",
                image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
                desc: "Program intensif Bahasa Inggris melalui English Club, pelatihan, dan lomba."
            },
            {
                name: "Pendidikan Karakter",
                image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
                desc: "Mengasah karakter siswa dengan pembiasaan positif, budi pekerti, kegiatan sosial."
            },
            {
                name: "Tahfidz Al-Qur'an",
                image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
                desc: "Membina siswa menghafal Al-Qur'an, serta pembelajaran tartil dan tilawah yang baik."
            }
        ]
    },
    {
        category: "KO-Kulikuler",
        data: [
            {
                name: "Praktikum IPTEK",
                image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
                desc: "Kegiatan praktikum laboratorium sains & teknologi bagi pengembangan kompetensi siswa."
            },
            {
                name: "Kegiatan Bahasa dan Sastra",
                image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
                desc: "Lomba pidato, puisi, debat, dan karya ilmiah bahasa Indonesia & Inggris."
            },
            {
                name: "Workshop & Bimbingan",
                image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80",
                desc: "Workshop, seminar, serta bimbingan konseling yang menunjang seluruh potensi siswa."
            }
        ]
    }
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
    return (
        <div className="bg-white dark:bg-gray-950 mb-28 transition-colors duration-300 min-h-screen flex flex-col">

            <Header />

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
                </video>
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/70 -z-10" />
                <div className="mx-auto max-w-2xl">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-100 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-700 bg-black/30 dark:bg-black/40 hover:ring-gray-300 dark:hover:ring-gray-500">
                            Penerimaan Peserta Didik Baru (PPDB) Tahun 2024.&nbsp;
                        </div>
                    </div>
                    <div className="text-center">
                        <Image
                            src={config.appLogoPanjang}
                            alt="Logo SMP Unggulan Hamzanwadi"
                            width={500}
                            height={100}
                            className="w-full"
                        />
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
                                src={sambutanKepalaSekolah.foto}
                                alt={sambutanKepalaSekolah.nama}
                                width={128}
                                height={128}
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

            {/* Section Kurikulum */}
            <section id="kurikulum" className="max-w-5xl mx-auto mt-24 px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    Kurikulum
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                    SMP Unggulan Hamzanwadi memiliki tiga kategori utama pada Kurikulum: Ekstrakurikuler, Program Unggulan, dan KO-Kulikuler. Setiap kategori berisi kegiatan dan program untuk mendukung bakat, minat, dan kompetensi siswa secara optimal.
                </p>
                <div className="space-y-14">
                    {kurikulumData.map((kategori) => (
                        <div key={kategori.category}>
                            <h3 className="text-2xl font-bold mb-4 text-primary">{kategori.category}</h3>
                            <div className="grid gap-8 md:grid-cols-3">
                                {kategori.data.map((item) => (
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
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section Unggulan */}
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
                        Tiga program unggulan SMP Unggulan Hamzanwadi: Bahasa Inggris, Pendidikan Karakter, dan Al-Qur&apos;an. Membekali siswa dengan kemampuan global, karakter mulia, dan kecintaan pada Al-Qur&apos;an.
                    </p>
                </div>
                <ImageSlider slides={unggulanSlides} />
            </div>

            {/* Section Fasilitas Sekolah */}
            <section className="max-w-5xl mx-auto mt-24 px-4">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                        Fasilitas Sekolah
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        SMP Unggulan Hamzanwadi menyediakan berbagai fasilitas modern dan lengkap untuk mendukung proses belajar mengajar dan pengembangan diri siswa.
                    </p>
                </div>
                {/* Responsive grid for Fasilitas Sekolah */}
                <div
                  className="
                    grid gap-8
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    xl:grid-cols-3
                    2xl:grid-cols-3
                  "
                >
                    {fasilitasList.map((fasilitas) => (
                        <div
                            key={fasilitas.name}
                            className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
                        >
                            <div className="h-64 w-full overflow-hidden">
                                <Image
                                    src={fasilitas.image}
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
                                <p className="text-gray-600 dark:text-gray-300 text-lg">{fasilitas.desc}</p>
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
                                <Image
                                    src={news.image}
                                    alt={news.title}
                                    width={800}
                                    height={600}
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
                        <div className="text-xs text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} {config.appName}.</div>
                        <div className="text-xs text-gray-400 dark:text-gray-600">Dibuat dengan <span role="img" aria-label="love">❤️</span> di Lombok Timur.</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}