import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'RideFlow — Bike Rental Platform',
  description: 'Rent a bike in minutes. Explore your city with RideFlow — the modern bike rental platform for riders and owners.',
  keywords: ['bike rental', 'bicycle rental', 'city bikes', 'electric bikes', 'rideflow'],
  authors: [{ name: 'RideFlow' }],
  openGraph: {
    title: 'RideFlow — Bike Rental Platform',
    description: 'Rent a bike in minutes. Explore your city with RideFlow.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
