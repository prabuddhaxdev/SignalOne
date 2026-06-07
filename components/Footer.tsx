import Link from "next/link";
import { Globe, Activity, ArrowUpRight } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.02c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-[#0B0E14] border-t border-white/5 overflow-hidden">
      {/* Dynamic Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

      {/* Background Ambient Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-6 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand & About (Takes up more space) */}
          <div className="md:col-span-12 lg:col-span-6 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-yellow-500/10 p-2.5 rounded-xl group-hover:bg-yellow-500/20 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all duration-300 border border-yellow-500/20">
                <Activity className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 drop-shadow-[0_0_10px_rgba(232,186,64,0.2)]">
                SignalOne
              </span>
            </Link>
            <p className="text-base text-gray-400/80 leading-relaxed max-w-md font-light">
              Elevate your trading strategy with institutional-grade analytics, real-time market tracking, and AI-driven insights—all in one beautifully crafted platform.
            </p>
          </div>

          {/* Connect Links */}
          <div className="md:col-span-6 lg:col-span-3 space-y-6">
            <h3 className="text-sm font-semibold text-white tracking-widest uppercase opacity-90">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://github.com/prabuddhaxdev"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-all duration-300 w-fit"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-yellow-500/10 transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/prabuddhaxdev"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-all duration-300 w-fit"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-yellow-500/10 transition-colors">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://prabuddhaxdev.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-all duration-300 w-fit"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-yellow-500/10 transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-6 lg:col-span-3 space-y-6">
            <h3 className="text-sm font-semibold text-white tracking-widest uppercase opacity-90">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 font-medium hover:text-yellow-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 font-medium hover:text-yellow-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} SignalOne. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 font-light bg-white/5 px-4 py-2 rounded-full border border-white/5">
            Crafted with <span className="text-yellow-500 animate-pulse drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">❤</span> by
            <a href="https://prabuddhaxdev.vercel.app" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors ml-1">
              Prabuddha
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
