import PNavbar from './components/p_navbar';
import Header from './components/Header';
import Work from './components/Work';
import Skills from './components/Skills';
import About from './components/About';
import Services from './components/Services';
import GithubActivity from './components/GithubActivity';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { PreferencesProvider } from './components/Preferences';

export default function Home() {
  return (
    <PreferencesProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <PNavbar />
      <main id="main">
        <Header />
        <Work />
        <Skills />
        <About />
        <Services />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </PreferencesProvider>
  );
}
