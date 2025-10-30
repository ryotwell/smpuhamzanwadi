import React from "react";
import Image from "next/image";

export interface Slide {
    image: string;
    title: string;
    desc: string;
    cta: {
        href: string;
        label: string;
    };
}

export interface ImageSliderProps {
    slides: Slide[];
    LeftIcon?: React.ReactNode;
    RightIcon?: React.ReactNode;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
    slides,
    LeftIcon,
    RightIcon,
}) => {
    const [current, setCurrent] = React.useState(0)
    const total = slides.length

    const goToPrev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1))
    const goToNext = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1))
    const goTo = (idx: number) => setCurrent(idx)

    return (
        <section className="relative w-full max-w-4xl mx-auto mt-10 md:rounded-3xl overflow-hidden shadow-2xl group bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Gambar */}
            <div className="relative h-[340px] sm:h-[420px] md:h-[500px] transition-all duration-500">
                {slides.map((slide, idx) => (
                    <Image
                        key={slide.image + idx}
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        draggable={false}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
                        priority={idx === 0}
                    />
                ))}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent dark:from-gray-900/80 dark:via-gray-900/40 dark:to-transparent z-20 pointer-events-none" />
            </div>
            {/* Konten */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-8 sm:p-12 flex flex-col items-start text-white dark:text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{slides[current].title}</h2>
                <p className="mb-6 text-base sm:text-lg font-medium drop-shadow">{slides[current].desc}</p>
                <a
                    href={slides[current].cta.href}
                    className="inline-block rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90 transition"
                >
                    {slides[current].cta.label}
                </a>
            </div>
            {/* Tombol navigasi */}
            <button
                onClick={goToPrev}
                aria-label="Sebelumnya"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 dark:bg-gray-700/40 hover:bg-black/70 dark:hover:bg-gray-700/70 text-white dark:text-white rounded-full w-12 h-12 flex items-center justify-center transition"
                style={{ aspectRatio: "1/1" }}
            >
                {LeftIcon ? LeftIcon : <span>&lt;</span>}
            </button>
            <button
                onClick={goToNext}
                aria-label="Selanjutnya"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 dark:bg-gray-700/40 hover:bg-black/70 dark:hover:bg-gray-700/70 text-white dark:text-white rounded-full w-12 h-12 flex items-center justify-center transition"
                style={{ aspectRatio: "1/1" }}
            >
                {RightIcon ? RightIcon : <span>&gt;</span>}
            </button>
            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={`w-3 h-3 rounded-full border-2 border-white dark:border-white transition-all duration-200 ${current === idx ? 'bg-white dark:bg-white' : 'bg-white/40 dark:bg-white/30'}`}
                        style={{ aspectRatio: "1/1" }}
                    />
                ))}
            </div>
        </section>
    )
}