"use client";

import Marquee from "react-fast-marquee";

const testimonials = [
  "This app changed how I trade completely.",
  "The AI insights are insanely accurate.",
  "Best stock tracking platform I've used.",
  "Clean UI and powerful analytics.",
  "Real-time updates are blazing fast.",
  "My go-to trading dashboard now.",
  "Finally something that feels premium.",
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white/5">
      <h2 className="text-4xl font-bold text-center mb-12">What Traders Say</h2>

      <Marquee pauseOnHover speed={40}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="mx-4 p-6 rounded-xl bg-black border border-white/10 min-w-[300px]"
          >
            <p className="text-gray-300">"{t}"</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
