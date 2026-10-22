import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="not-found-page shell">
      <Link className="wordmark" href="/" aria-label="Dipna, home">
        dipna<span>.</span>
      </Link>
      <div>
        <p className="section-label">404 / A LITTLE OFF COURSE</p>
        <h1>
          This page
          <br />
          <span>is still an idea.</span>
        </h1>
        <p>
          The page you’re looking for couldn’t be found. There’s plenty of work to explore back
          home.
        </p>
        <div className="hero-buttons">
          <Link className="button button-primary" href="/">
            Back home <ArrowLeft size={17} />
          </Link>
          <Link className="button button-ghost" href="/#work">
            Explore projects <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}
