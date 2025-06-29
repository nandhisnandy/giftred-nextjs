import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Templates from '@/components/sections/Templates';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <Templates />
        <Features />
        <Testimonials />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}