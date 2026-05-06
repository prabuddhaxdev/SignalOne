"use client";

import { motion } from "motion/react";
import { 
  BarChart2, LineChart, Globe, 
  Zap, Bell, Target, 
  Search, LayoutGrid, Brain, 
  Lightbulb, ShieldCheck
} from "lucide-react";

const featureCategories = [
  {
    title: "Market Intelligence",
    description: "Stay ahead with macro trends and top stories.",
    icon: <Globe className="w-6 h-6 text-blue-500" />,
    features: ["Market overview", "Stock heatmap", "Top market news", "Daily summaries"]
  },
  {
    title: "Real-Time Tracking",
    description: "Millisecond-precise pricing and alerts.",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    features: ["Live stock prices", "Portfolio tracking", "Personalized alerts", "Watchlists"]
  },
  {
    title: "Discovery & Search",
    description: "Find your next big play instantly.",
    icon: <Search className="w-6 h-6 text-teal-400" />,
    features: ["Smart ticker lookup", "Sector filtering", "Trending stocks", "Deep search"]
  },
  {
    title: "Analysis & Charts",
    description: "Professional grade technicals.",
    icon: <BarChart2 className="w-6 h-6 text-purple-500" />,
    features: ["Interactive charting", "Technical analysis", "Financials", "Fundamentals"]
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-800/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">dominate the market.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Powerful tools wrapped in an intuitive interface. Built for investors who demand speed, accuracy, and actionable insights.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featureCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-all hover:bg-gray-800 overflow-hidden"
            >
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gray-900/80 border border-gray-700 flex items-center justify-center mb-6 shadow-sm">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{category.title}</h3>
                <p className="text-gray-400 mb-6">{category.description}</p>
                
                <ul className="space-y-3">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Layer Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 relative p-1 rounded-2xl bg-gradient-to-r from-teal-500/30 via-purple-500/30 to-yellow-500/30"
        >
          <div className="p-8 sm:p-10 rounded-xl bg-gray-900 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-4 uppercase tracking-wider">
                <Brain className="w-4 h-4" /> Core Feature
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">The AI Intelligence Layer</h3>
              <p className="text-gray-400 max-w-xl">
                Our platform doesn't just show data; it understands it. Get AI-powered insights, sentiment analysis from news, and predictive pattern recognition directly on your charts.
              </p>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex flex-col items-center justify-center text-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300">Smart Signals</span>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex flex-col items-center justify-center text-center gap-2">
                <ShieldCheck className="w-6 h-6 text-teal-400" />
                <span className="text-sm font-medium text-gray-300">Risk Analysis</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
