import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { Metadata, Viewport } from 'next';
import { config } from '@/config';
import JsonLd from '@/components/JsonLd';

const outfit = Outfit({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const SITE_DESCRIPTION = `Website resmi ${config.appName}. Sekolah Menengah Pertama berbasis Islamic Boarding School di Lombok Timur, NTB. Membentuk generasi cerdas, berakhlak mulia, dan berwawasan global.`;

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: {
    default: config.appName,
    template: `%s | ${config.appName}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['SMP', 'Hamzanwadi', 'Pancor', 'Sekolah', 'Unggulan', 'Boarding School', 'Islam', 'Pendidikan'],
  authors: [{ name: config.appName, url: config.baseUrl }],
  creator: config.appName,
  publisher: config.appName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: config.baseUrl,
    title: config.appName,
    description: SITE_DESCRIPTION,
    siteName: config.appName,
    images: [
      {
        url: "https://s3-storage.smpuhamzanwadi.sch.id/prod-smpu/default/seo/smpu-thumbnail-clear.png", // Using the wider logo for social sharing if available, otherwise appLogo
        width: 1200,
        height: 630,
        alt: config.appName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.appName,
    description: SITE_DESCRIPTION,
    images: ["https://s3-storage.smpuhamzanwadi.sch.id/prod-smpu/default/seo/smpu-thumbnail-clear.png"],
    creator: '@smpuhamzanwadi', // Replace if there is a specific twitter handle in config
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthProvider>
            <SidebarProvider>
              <JsonLd />
              {children}
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
