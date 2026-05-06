import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Analytics from "@/components/landing/Analytics";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import { Metadata } from "next";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "SignalOne | Premium Real-Time Stock Intelligence",
  description: "Experience lightning-fast stock discovery, advanced chart analysis, and personalized AI-driven insights in one premium platform.",
};

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  } : null;

  return (
    <main className="bg-gray-900 min-h-screen">
      <Header user={user} />
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
