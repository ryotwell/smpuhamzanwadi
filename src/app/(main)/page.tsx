import { Metadata } from 'next'
import { config } from '@/config'
import Content from "./content";
import { Header } from "./header";

export const metadata: Metadata = {
    title: 'Beranda',
}

export default async function Page() {
    return (
        <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen flex flex-col">
            <Header />

            <Content />
        </div>
    )
}