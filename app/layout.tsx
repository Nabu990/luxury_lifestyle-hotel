import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lifestyle Luxury Hotel & Residence',
  description: 'A modern boutique hotel experience in Monrovia with luxury rooms, rooftop bar, and immersive booking concierge.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-midnight text-pearl antialiased">{children}</body>
    </html>
  );
}
