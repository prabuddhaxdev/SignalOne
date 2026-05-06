const features = [
  "Market Overview",
  "Stock Heatmap",
  "Top Market News",
  "Live Stock Prices",
  "Smart Search",
  "Personalized Alerts",
  "Interactive Charts",
  "Technical Analysis",
  "Financials & Fundamentals",
  "Watchlists & Portfolio Tracking",
  "Daily News Summary",
  "AI Insights & Predictions",
];

export default function Features() {
  return (
    <section className="py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16">
        Everything You Need to Win the Market
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-white/10 hover:border-yellow-500/40 transition bg-white/5 backdrop-blur"
          >
            <h3 className="text-lg font-semibold">{f}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
