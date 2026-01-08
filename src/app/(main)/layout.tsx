import { config } from "@/config";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";

// layout
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}

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
        </>
    )
}