import { PublicNavbar } from '@/features/public/components/public-navbar';
import { PublicFooter } from '@/features/public/components/public-footer';
import { HeroSection } from '@/features/public/components/hero-section';
import { TrustedBySection } from '@/features/public/components/trusted-by-section';
import { ServicesSection } from '@/features/public/components/services-section';
import { WhyUsSection } from '@/features/public/components/why-us-section';
import { ProcessSection } from '@/features/public/components/process-section';
import { PortfolioSection } from '@/features/public/components/portfolio-section';
import { PricingSection } from '@/features/public/components/pricing-section';
import { TestimonialSection } from '@/features/public/components/testimonial-section';
import { FAQSection } from '@/features/public/components/faq-section';
import { ContactSection } from '@/features/public/components/contact-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <PortfolioSection />
        <PricingSection />
        <TestimonialSection />
        <FAQSection />
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
}
