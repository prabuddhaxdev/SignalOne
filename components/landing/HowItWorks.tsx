"use client";

import { motion } from "motion/react";
import { UserPlus, Compass, BellRing, TrendingUp } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Sign up in seconds",
    description: "Create your account and get instant access to live market data.",
    icon: <UserPlus className="w-6 h-6 text-white" />
  },
  {
    id: "02",
    title: "Discover & track",
    description: "Find the best stocks, view detailed financials, and build your watchlist.",
    icon: <Compass className="w-6 h-6 text-white" />
  },
  {
    id: "03",
    title: "Set personalized alerts",
    description: "Never miss a move. Get notified when price targets or AI patterns hit.",
    icon: <BellRing className="w-6 h-6 text-white" />
  },
  {
    id: "04",
    title: "Act with confidence",
    description: "Use our AI sentiment and technical analysis to time your trades perfectly.",
    icon: <TrendingUp className="w-6 h-6 text-white" />
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            From insight to action in <span className="text-yellow-500">four steps.</span>
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-800 border-2 border-gray-700 flex items-center justify-center mb-6 shadow-xl relative z-10 group hover:border-yellow-500 transition-colors duration-300">
                    <div className="absolute inset-0 bg-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    {step.icon}
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-yellow-500 text-gray-950 font-bold flex items-center justify-center text-sm shadow-lg">
                      {step.id}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
