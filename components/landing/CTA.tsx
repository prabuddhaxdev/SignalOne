"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export default function CTA() {
  return (
    <section className="pt-20 pb-24 relative overflow-hidden">
      {/* Dynamic Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto rounded-3xl bg-gray-800/60 border border-gray-700 backdrop-blur-xl p-8 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Inner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]" />

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
            Ready to upgrade your edge?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
            Join the platform built for investors who demand more. Start your free trial today and experience the future of market intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/sign-in"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold text-lg transition-all shadow-[0_0_20px_rgba(232,186,64,0.4)] hover:shadow-[0_0_40px_rgba(232,186,64,0.6)]"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-500 sm:ml-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              No credit card required
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
