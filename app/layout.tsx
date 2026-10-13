import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UMak Assistant - AI Knowledge Assistant',
  description: 'Verified AI knowledge assistant for University of Makati students grounded strictly in official university documents.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amber-300 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
