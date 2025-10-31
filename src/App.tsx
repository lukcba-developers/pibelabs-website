import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Loader } from './components/atoms/Loader';
import { ScrollToTop } from './components/atoms/ScrollToTop';

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

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0a0e27',
            color: '#fff',
            border: '1px solid #00d9ff',
          },
          success: {
            iconTheme: {
              primary: '#00d9ff',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff006a',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
