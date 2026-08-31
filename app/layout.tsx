import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// next/font automatically self-hosts fonts — no render-blocking network request
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Priyanshu Shukla — Full-Stack Developer & AI Builder',
  description:
    'Portfolio of Priyanshu Shukla — Full-Stack Developer, AI/ML Engineer, Patent Holder, ICPC Participant, and Founder of Kazuha Closet. Building things that ship to real users.',
  keywords: [
    'Priyanshu Shukla',
    'Full-Stack Developer',
    'AI ML Engineer',
    'Next.js Developer',
    'Python Django',
    'Computer Vision',
    'Patent Holder',
    'ICPC',
    'Kazuha Closet',
    'Portfolio',
  ],
  authors: [{ name: 'Priyanshu Shukla' }],
  openGraph: {
    title: 'Priyanshu Shukla — Full-Stack Developer & AI Builder',
    description: 'Building things that ship to real users.',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
