import type { Metadata } from 'next';
import { Inter, Quicksand } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from './providers/query-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GiftRed - Create Memorable Digital Greetings',
  description: 'Transform boring text messages into emotional, multimedia-rich digital greetings that are easily shared via personalized links.',
  authors: [{ name: 'GiftRed' }],
  openGraph: {
    title: 'GiftRed - Create Memorable Digital Greetings',
    description: 'Don\'t just send a message. Create a moment.',
    type: 'website',
    images: [
      {
        url: 'https://lovable.dev/opengraph-image-p98pqg.png',
        width: 1200,
        height: 630,
        alt: 'GiftRed - Create Memorable Digital Greetings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@giftred',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${quicksand.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}