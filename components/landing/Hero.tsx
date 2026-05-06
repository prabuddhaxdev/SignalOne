"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-32 px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent blur-3xl" />

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-bold leading-tight"
      >
        Trade Smarter. <br />
        <span className="text-yellow-500">
          Powered by Real-Time Intelligence
        </span>
      </motion.h1>

      <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
        Live market data, AI-powered insights, and precision analytics — all in
        one powerful platform built for modern traders.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <button className="px-6 py-3 bg-yellow-500 text-black rounded-xl font-semibold hover:scale-105 transition">
          Start Free Trial
        </button>
        <button className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition">
          Explore Features
        </button>
      </div>
    </section>
  );
}