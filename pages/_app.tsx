import type { AppProps } from 'next/app';
import { DM_Sans, Fraunces } from 'next/font/google';
import '../styles/globals.css';

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sans.variable} ${serif.variable} min-h-screen font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
