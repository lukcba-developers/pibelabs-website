import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { Loader } from "./components/atoms/Loader";
import ScrollToTop from "./components/atoms/ScrollToTop";
import ErrorBoundary from "./components/atoms/ErrorBoundary";
import SEO from "./components/atoms/SEO";
import { LanguageHead } from "./components/SEO";
import { LanguageTransition } from "./components/atoms/LanguageTransition";
import { initGA } from "@/lib/analytics";
import { reportWebVitals, logWebVitals } from "@/lib/performance/webVitals";
import { useScrollDepth, useLanguageUrl } from "@/hooks";

// Eager load Header (always visible)
import Header from "./components/organisms/Header";

// Lazy load other components for better performance
const Hero = lazy(() => import("./components/organisms/Hero"));
const StatsSection = lazy(() => import("./components/organisms/StatsSection"));
const ServicesGrid = lazy(() => import("./components/organisms/ServicesGrid"));
const TrustBadges = lazy(() => import("./components/organisms/TrustBadges"));
const PortfolioSection = lazy(
  () => import("./components/organisms/PortfolioSection"),
);
const TestimonialsSection = lazy(
  () => import("./components/organisms/TestimonialsSection"),
);
const AboutSection = lazy(() => import("./components/organisms/AboutSection"));
const FAQSection = lazy(() => import("./components/organisms/FAQSection"));
const BlogSection = lazy(() => import("./components/organisms/BlogSection"));
const ContactForm = lazy(() => import("./components/organisms/ContactForm"));
const Footer = lazy(() => import("./components/organisms/Footer"));
const WhatsAppWidget = lazy(() => import("./components/atoms/WhatsAppWidget"));
const StickyCTA = lazy(() => import("./components/atoms/StickyCTA"));
const ScrollProgress = lazy(() => import("./components/atoms/ScrollProgress"));
const CookieConsent = lazy(() => import("./components/atoms/CookieConsent"));
const NewsletterPopup = lazy(
  () => import("./components/molecules/NewsletterPopup"),
);

/* ============================================
   Main App Component with Code Splitting
   ============================================ */

function App() {
  // Initialize Google Analytics
  useEffect(() => {
    initGA();
    reportWebVitals(logWebVitals);
  }, []);

  // Track scroll depth for engagement analytics (Sprint 5)
  useScrollDepth([25, 50, 75, 100]);

  // Sync language with URL query params
  useLanguageUrl();

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SEO />
        <LanguageHead />
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

        {/* Scroll Progress Indicator */}
        <Suspense fallback={null}>
          <ScrollProgress
            color="from-cyan-500 to-magenta-500"
            height={3}
            showPercentage={false}
          />
        </Suspense>

        {/* Main content - Lazy loaded with suspense */}
        <Suspense
          fallback={<Loader message="Cargando experiencia futurista..." />}
        >
          <LanguageTransition>
            <main id="main-content">
            {/* Hero Section */}
            <Hero />

            {/* Trust Badges - NEW */}
            <TrustBadges />

            {/* Stats Section */}
            <StatsSection />

            {/* Services Grid */}
            <ServicesGrid />

            {/* Portfolio Section */}
            <PortfolioSection />

            {/* Testimonials Section - UNIFIED (replaces SocialProof, TestimonialCarousel, and testimonials from AboutSection) */}
            <Suspense fallback={<Loader />}>
              <TestimonialsSection
                variant="grid"
                showClientLogos={true}
                showCTA={true}
                bgStyle="dark"
                maxItems={3}
              />
            </Suspense>

            {/* About Section (Mission, Vision, Values & Team) */}
            <AboutSection />

            {/* FAQ Section - NEW */}
            <Suspense fallback={<Loader />}>
              <FAQSection />
            </Suspense>

            {/* Blog Section */}
            <BlogSection />

            {/* Contact Form */}
            <ContactForm />
          </main>

          {/* Footer */}
          <Footer />
          </LanguageTransition>
        </Suspense>

        {/* Floating WhatsApp Button */}
        <Suspense fallback={null}>
          <WhatsAppWidget
            phoneNumber="5491112345678"
            message="¡Hola! Me gustaría obtener más información sobre sus servicios."
          />
        </Suspense>

        {/* Sticky CTA for Mobile (improves conversion) */}
        <Suspense fallback={null}>
          <StickyCTA
            text="¿Listo para empezar tu proyecto?"
            ctaText="Agenda consulta gratis"
            scrollThreshold={500}
            showOnMobileOnly={true}
          />
        </Suspense>

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0a0e27",
              color: "#fff",
              border: "1px solid #00d9ff",
            },
            success: {
              iconTheme: {
                primary: "#00d9ff",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ff006a",
                secondary: "#fff",
              },
            },
          }}
        />

        {/* Cookie Consent Banner - Sprint 6 */}
        <Suspense fallback={null}>
          <CookieConsent position="bottom" showCustomize={true} />
        </Suspense>

        {/* Newsletter Popup with Exit-Intent - Sprint 6 */}
        <Suspense fallback={null}>
          <NewsletterPopup
            exitIntent={true}
            delay={10000}
            scrollPercentage={50}
            dismissDays={7}
          />
        </Suspense>
      </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
