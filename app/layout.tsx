import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer';
import { ThemeProvider } from '@/app/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HTML Generator App',
  description: 'Generate HTML5 + JS code for LMS deployment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}