import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lifestyle Luxury Hotel & Residence',
  description: 'Discover Monrovia’s luxury boutique hotel with rooftop dining, premium suites, smart booking, and concierge service.',
  keywords: ['luxury hotel', 'Monrovia hotel', 'boutique hotel', 'rooftop bar', 'hotel booking', 'AI concierge'],
  openGraph: {
    title: 'Lifestyle Luxury Hotel & Residence',
    description: 'Discover Monrovia’s luxury boutique hotel with rooftop dining, premium suites, smart booking, and concierge service.',
    type: 'website',
    url: 'https://luxurylifestylehotel.example',
    images: [
      {
        url: 'https://luxurylifestylehotel.example/images/front-view.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury hotel exterior view',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lifestyle Luxury Hotel & Residence',
    description: 'Discover Monrovia’s luxury boutique hotel with rooftop dining, premium suites, smart booking, and concierge service.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-midnight text-pearl antialiased">{children}</body>
    </html>
  );
}
