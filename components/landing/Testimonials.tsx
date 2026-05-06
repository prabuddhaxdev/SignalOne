"use client";

import { motion } from "motion/react";
import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Day Trader",
    content: "The zero-latency data and AI sentiment tracking completely changed my trading strategy. I'm executing trades with much higher confidence.",
    initial: "A"
  },
  {
    name: "Sarah Jenkins",
    role: "Portfolio Manager",
    content: "Finally, a platform that gives institutional-grade tools without the clunky 1990s interface. The UI is gorgeous and incredibly fast.",
    initial: "S"
  },
  {
    name: "David Chen",
    role: "Retail Investor",
    content: "The stock discovery features are unmatched. I found three multi-baggers this year just by using their smart sector filtering.",
    initial: "D"
  },
  {
    name: "Elena Rodriguez",
    role: "Financial Analyst",
    content: "The financials and fundamentals data are laid out so clearly. It saves me hours of digging through 10-K reports.",
    initial: "E"
  },
  {
    name: "Marcus Webb",
    role: "Options Trader",
    content: "The personalized alerts are a game changer. I set my parameters, and the AI notifies me the second my conditions are met.",
    initial: "M"
  },
  {
    name: "Julia Park",
    role: "Swing Trader",
    content: "I love the charting. It's fluid, customizable, and the built-in technical indicators are exactly what I need for my setups.",
    initial: "J"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Trusted by traders.
          </motion.h2>
          <p className="text-gray-400">Join thousands of investors making smarter moves.</p>
        </div>
      </div>

      <div className="relative">
        {/* Fade Masks for smooth entry/exit */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
        
        <Marquee 
          gradient={false} 
          speed={40} 
          pauseOnHover={true}
          className="pb-8 pt-4"
        >
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className="mx-4 w-[350px] sm:w-[400px] p-6 rounded-2xl bg-gray-800/40 border border-gray-700/50 flex flex-col gap-4 transition-colors hover:bg-gray-800"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base flex-1">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-gray-900 font-bold">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
