"use client";

import { motion } from "motion/react";
import {
  BarChart2, Globe,
  Zap, Search, Brain,
  Lightbulb, ShieldCheck,
  TrendingUp, Activity
} from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              dominate the market.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-400"
          >
            Powerful tools wrapped in an intuitive interface. Built for
            investors who demand speed, accuracy, and actionable insights.
          </motion.p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Feature 1: Market Intelligence (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 group relative p-8 sm:p-10 rounded-3xl bg-gray-800/40 border border-gray-700/50 hover:border-gray-500 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Global Market Intelligence
                </h3>
                <p className="text-gray-400 text-lg max-w-md">
                  Stay ahead with macro trends, real-time stock heatmaps, and
                  daily AI summaries of the most important financial news.
                </p>
              </div>

              {/* Abstract Visual */}
              <div className="mt-8 bg-gray-900/50 rounded-xl border border-gray-700 p-4 flex gap-4 overflow-hidden relative">
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900/90 to-transparent z-10" />
                {["AAPL", "TSLA", "NVDA", "MSFT", "AMZN"].map((ticker) => (
                  <div
                    key={ticker}
                    className="flex-shrink-0 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 flex items-center gap-2"
                  >
                    <span className="text-white font-medium">{ticker}</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Real-Time Tracking (Tall/Square) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 group relative p-8 sm:p-10 rounded-3xl bg-gray-800/40 border border-gray-700/50 hover:border-yellow-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-[60px] group-hover:bg-yellow-500/30 transition-colors" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Zero-Latency Tracking
              </h3>
              <p className="text-gray-400 text-lg flex-1">
                Millisecond-precise live pricing and personalized portfolio
                alerts so you never miss a breakout.
              </p>
              <div className="mt-8 flex items-center gap-3 text-yellow-500 font-medium">
                <Activity className="w-5 h-5" />
                Live Socket Connection
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Discovery & Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 group relative p-8 sm:p-10 rounded-3xl bg-gray-800/40 border border-gray-700/50 hover:border-teal-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Lightning Search
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                Find your next big play instantly with smart ticker lookup and
                deep sector filtering.
              </p>

              <div className="w-full h-12 rounded-xl bg-gray-900 border border-gray-700 flex items-center px-4 text-gray-500">
                <Search className="w-4 h-4 mr-2" />
                <span>Search "AI stocks"...</span>
              </div>
            </div>
          </motion.div>

          {/* Feature 4: Analysis & Charts (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 group relative p-8 sm:p-10 rounded-3xl bg-gray-800/40 border border-gray-700/50 hover:border-gray-500 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                  <BarChart2 className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Professional Analysis
                </h3>
                <p className="text-gray-400 text-lg">
                  Interactive charting, deep technical analysis, and complete
                  company financials right at your fingertips.
                </p>
              </div>
              <div className="w-full md:w-64 h-32 bg-gray-900/80 rounded-xl border border-gray-700 relative overflow-hidden">
                {/* Abstract Chart Lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,40 T100,20 L100,100 L0,100 Z"
                    fill="url(#purple-grad)"
                    opacity="0.2"
                  />
                  <path
                    d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,40 T100,20"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient
                      id="purple-grad"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Layer Highlight - The Crown Jewel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 relative"
        >
          {/* Glowing Border Wrapper */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-teal-400 via-purple-500 to-yellow-500 rounded-[2rem] opacity-50 blur-sm" />

          <div className="relative p-8 sm:p-12 rounded-[2rem] bg-gray-900 flex flex-col md:flex-row items-center gap-10 justify-between overflow-hidden border border-gray-800">
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-500/30 text-white text-sm font-bold mb-6 tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Brain className="w-4 h-4 text-purple-400" /> THE AI CORE
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Uncover what others miss.
              </h3>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                Our platform doesn't just display data; it understands it. The
                AI engine processes millions of data points, news sentiment, and
                technical patterns to deliver predictive signals directly on
                your charts.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
              <div className="bg-gray-800/80 backdrop-blur p-6 rounded-2xl border border-gray-700 flex flex-col items-center justify-center text-center gap-3 hover:bg-gray-800 transition-colors">
                <Lightbulb className="w-8 h-8 text-yellow-400" />
                <span className="text-base font-semibold text-white">
                  Smart Signals
                </span>
              </div>
              <div className="bg-gray-800/80 backdrop-blur p-6 rounded-2xl border border-gray-700 flex flex-col items-center justify-center text-center gap-3 hover:bg-gray-800 transition-colors">
                <ShieldCheck className="w-8 h-8 text-teal-400" />
                <span className="text-base font-semibold text-white">
                  Risk Analysis
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
