"use client";

import { motion } from "motion/react";
import { ArrowRight, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-18 pb-16">

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-gray-300 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Real-time market data powered by AI
        </motion.div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
        >
          Trade Smarter with <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Predictive Intelligence.
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Experience lightning-fast stock discovery, advanced chart analysis, and personalized AI-driven insights—all in one premium platform built for modern investors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none"
        >
          <Link
            href="/sign-up"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-semibold text-lg transition-all shadow-[0_0_20px_rgba(232,186,64,0.3)] hover:shadow-[0_0_30px_rgba(232,186,64,0.5)]"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-transparent border border-gray-600 hover:border-gray-400 text-white font-medium text-lg transition-all"
          >
            Explore Features
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500 font-medium"
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span>Zero Latency</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-yellow-500" />
            <span>AI Analytics</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}