"use client";

import { motion } from "motion/react";
import { LineChart, Activity, Cpu, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Analytics() {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            See the market <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-400">
              like never before.
            </span>
          </motion.h2>
          <p className="text-lg text-gray-400">
            Immersive visualizations, predictive analytics, and institutional-grade charting tailored for individual investors.
          </p>
        </div>

        {/* Dashboard Mock */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Main Dashboard Container */}
          <div className="rounded-2xl border border-gray-700/60 bg-gray-900/80 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Chart) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 h-[400px] flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-start mb-8 z-10">
                  <div>
                    <h3 className="text-xl font-bold text-white">S&P 500 Index</h3>
                    <p className="text-gray-400 text-sm">SPY • ETF</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">5,123.45</p>
                    <p className="text-green-400 text-sm font-medium flex items-center justify-end gap-1">
                      <ArrowUpRight className="w-4 h-4" /> +1.2%
                    </p>
                  </div>
                </div>

                {/* Abstract Chart */}
                <div className="flex-1 relative z-0">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 100">
                    <path d="M0,80 C20,70 40,90 60,60 C80,30 100,50 120,40 C140,30 160,20 200,10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M0,80 C20,70 40,90 60,60 C80,30 100,50 120,40 C140,30 160,20 200,10 L200,100 L0,100 Z" fill="url(#blue-gradient)" opacity="0.1" />
                    <defs>
                      <linearGradient id="blue-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Bottom Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Vol", value: "84.2M", up: true },
                  { label: "P/E", value: "24.5", up: null },
                  { label: "RSI", value: "62.4", up: true },
                  { label: "MACD", value: "Bullish", up: true }
                ].map((metric, i) => (
                  <div key={i} className="bg-gray-800/40 border border-gray-700/40 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                    <p className={`text-lg font-semibold ${metric.up === true ? 'text-green-400' : metric.up === false ? 'text-red-400' : 'text-white'}`}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (Side Panels) */}
            <div className="space-y-6">
              {/* AI Insight Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <h4 className="text-white font-medium">AI Analysis</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Pattern matching indicates a high probability of a breakout above resistance at $5,150 within the next 48 hours based on institutional options flow.
                  </p>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-teal-400 h-2 rounded-full w-[78%]" />
                  </div>
                  <p className="text-xs text-gray-500 text-right">78% Confidence</p>
                </div>
              </div>

              {/* Top Movers List */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-500" />
                  Trending Alerts
                </h4>
                <div className="space-y-4">
                  {[
                    { ticker: "NVDA", price: "$885.20", change: "+4.2%", up: true },
                    { ticker: "AMD", price: "$174.12", change: "+2.8%", up: true },
                    { ticker: "TSLA", price: "$195.40", change: "-1.5%", up: false },
                  ].map((stock) => (
                    <div key={stock.ticker} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-xs font-bold text-white">
                          {stock.ticker[0]}
                        </div>
                        <span className="text-sm font-medium text-white">{stock.ticker}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white">{stock.price}</p>
                        <p className={`text-xs ${stock.up ? 'text-green-400' : 'text-red-400'} flex items-center justify-end gap-0.5`}>
                          {stock.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stock.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
