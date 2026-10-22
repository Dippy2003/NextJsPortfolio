import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <a className="wordmark" href="#home" aria-label="Back to home">
          dipna<span>.</span>
        </a>
        <p>
          Made with curiosity.
          <br />
          <span>Built to keep evolving.</span>
        </p>
        <a className="back-top" href="#home">
          Back to top <ArrowUp size={15} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dipna Wijesinghe</span>
        <span className="footer-credit">DESIGNED WITH INTENT. BUILT WITH NEXT.JS.</span>
        <div>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
            <ArrowUpRight size={12} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <ArrowUpRight size={12} />
          </a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
