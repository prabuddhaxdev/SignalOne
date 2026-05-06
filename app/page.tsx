import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Analytics from "@/components/landing/Analytics";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignalOne | Premium Real-Time Stock Intelligence",
  description: "Experience lightning-fast stock discovery, advanced chart analysis, and personalized AI-driven insights in one premium platform.",
};

export default function Home() {
  return (
    <main className="bg-gray-900 text-white min-h-screen selection:bg-yellow-500/30 selection:text-yellow-200">
      {/* We use a flex column to stack sections cleanly */}
      <div className="flex flex-col w-full">
        <Hero />
        <Features />
        <HowItWorks />
        <Analytics />
        <Testimonials />
        <CTA />
      </div>
    </main>
  );
}
