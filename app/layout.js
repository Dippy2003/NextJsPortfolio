import { Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';
import './expanded.css';
import './atmosphere.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata = {
  title: 'Dipna Wijesinghe — Data, intelligence & thoughtful interfaces',
  description:
    'The portfolio of Dipna Wijesinghe. Data Science undergraduate at SLIIT exploring AI/ML, computer vision, intelligent agents, data engineering, and full-stack development.',
  openGraph: {
    title: 'Dipna Wijesinghe — Portfolio',
    description:
      'Turning complex problems into intelligent, useful experiences. Explore my projects in AI, data, and development.',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Dipna Wijesinghe — Portfolio' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${outfit.variable} ${grotesk.variable}`}>{children}</body>
    </html>
  );
}
