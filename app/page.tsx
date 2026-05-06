import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Analytics from "@/components/landing/Analytics";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Analytics />
      <Testimonials />
      <CTA />
    </main>
  );
}
