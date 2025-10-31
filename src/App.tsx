import { lazy, Suspense } from 'react';
import { Loader } from './components/atoms/Loader';

// Eager load Header (always visible)
import Header from './components/organisms/Header';

// Lazy load other components for better performance
const Hero = lazy(() => import('./components/organisms/Hero'));
const StatsSection = lazy(() => import('./components/organisms/StatsSection'));
const ServicesGrid = lazy(() => import('./components/organisms/ServicesGrid'));
const PortfolioSection = lazy(() => import('./components/organisms/PortfolioSection'));
const AboutSection = lazy(() => import('./components/organisms/AboutSection'));
const BlogSection = lazy(() => import('./components/organisms/BlogSection'));
const ContactForm = lazy(() => import('./components/organisms/ContactForm'));
const Footer = lazy(() => import('./components/organisms/Footer'));

/* ============================================
   Main App Component with Code Splitting
   ============================================ */

function App() {
  return (
    <div className="App">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-cyan-neon text-dark-primary px-4 py-2 rounded-lg font-semibold"
      >
        Saltar al contenido principal
      </a>

      {/* Header with navigation - Always loaded */}
      <Header />

      {/* Main content - Lazy loaded with suspense */}
      <Suspense fallback={<Loader message="Cargando experiencia futurista..." />}>
        <main id="main-content">
          {/* Hero Section */}
          <Hero />

          {/* Stats Section */}
          <StatsSection />

          {/* Services Grid */}
          <ServicesGrid />

          {/* Portfolio Section */}
          <PortfolioSection />

          {/* About Section (Team & Testimonials) */}
          <AboutSection />

          {/* Blog Section */}
          <BlogSection />

          {/* Contact Form */}
          <ContactForm />
        </main>

        {/* Footer */}
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
