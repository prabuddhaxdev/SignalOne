"use client";

import { motion } from "motion/react";
import { ArrowRight, Activity, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gray-900 -z-20" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/10 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px] -z-10" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Column: Text & CTA */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-gray-300"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            Real-time market data powered by AI
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Trade Smarter with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Predictive Intelligence.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Experience lightning-fast stock discovery, advanced chart analysis, and personalized AI-driven insights—all in one premium platform built for modern investors.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <Link 
              href="/signup" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-semibold text-lg transition-all shadow-[0_0_20px_rgba(232,186,64,0.3)] hover:shadow-[0_0_30px_rgba(232,186,64,0.5)]"
            >
              Start Free Trial
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
            className="flex items-center justify-center lg:justify-start gap-6 pt-8 text-sm text-gray-500 font-medium"
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

        {/* Right Column: Abstract Dashboard Mock */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex-1 w-full max-w-2xl lg:max-w-none relative mt-12 lg:mt-0"
        >
          {/* Main Mock Window */}
          <div className="relative rounded-2xl bg-gray-800/80 border border-gray-700 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
            {/* Window Header */}
            <div className="h-12 border-b border-gray-700/50 flex items-center px-4 gap-2 bg-gray-900/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Window Body */}
            <div className="p-6 flex-1 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    AAPL <span className="text-sm font-medium text-gray-400 px-2 py-0.5 rounded bg-gray-700">Apple Inc.</span>
                  </h3>
                  <p className="text-3xl font-light text-white mt-1">$189.43 <span className="text-green-400 text-lg font-medium">+1.24%</span></p>
                </div>
                <div className="h-16 w-32 bg-gradient-to-r from-transparent via-green-500/20 to-transparent flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-green-500/50" />
                </div>
              </div>

              {/* Mock Chart Area */}
              <div className="flex-1 border border-gray-700/50 rounded-lg relative overflow-hidden bg-gray-900/50">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,40 T100,20 L100,100 L0,100 Z" fill="url(#gradient)" opacity="0.2" />
                  <path d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,40 T100,20" fill="none" stroke="#0fedbe" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0fedbe" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-700/50">
                  <p className="text-xs text-gray-400 mb-1">AI Sentiment</p>
                  <p className="text-sm font-medium text-yellow-400">Strong Bullish</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-700/50">
                  <p className="text-xs text-gray-400 mb-1">Vol. (24h)</p>
                  <p className="text-sm font-medium text-white">54.2M</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Element 1 */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-12 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl backdrop-blur-md z-20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Alert Triggered</p>
                <p className="text-xs text-gray-400">TSLA crossed $200</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 2 */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-8 bottom-24 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl backdrop-blur-md z-20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Pattern Detected</p>
                <p className="text-xs text-gray-400">Bull flag forming on MSFT</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}