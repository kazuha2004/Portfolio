import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
