export default function Analytics() {
  return (
    <section className="py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16">
        Powerful Analytics at Your Fingertips
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-2">Real-Time Charts</h3>
          <p className="text-gray-400">
            Zoom, filter timeframes, and analyze trends with precision.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-2">AI Predictions</h3>
          <p className="text-gray-400">
            Get insights powered by advanced machine learning models.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-2">Stock Heatmap</h3>
          <p className="text-gray-400">Visualize market movement instantly.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
          <p className="text-gray-400">
            Monitor your investments in real time.
          </p>
        </div>
      </div>
    </section>
  );
}
