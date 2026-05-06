const steps = [
  {
    title: "Sign Up",
    desc: "Create your account in seconds and get started instantly.",
  },
  {
    title: "Track Stocks",
    desc: "Search, monitor, and build your personalized watchlist.",
  },
  {
    title: "Analyze",
    desc: "Use AI insights, charts, and technical indicators.",
  },
  {
    title: "Act Smart",
    desc: "Make confident trading decisions backed by data.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white/5">
      <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="p-6">
            <div className="text-yellow-500 text-2xl font-bold mb-2">
              0{i + 1}
            </div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-400 mt-2">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
