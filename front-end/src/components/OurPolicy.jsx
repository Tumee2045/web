import React from "react";
import { assets } from "../assets/assets";

const cards = [
  {
    icon: assets.exchange_icon,
    title: "Hassle-Free Exchange",
    desc: "Exchange within 7 days if sealed packaging is damaged or the item is incorrect.",
  },
  {
    icon: assets.quality_icon,
    title: "Genuine & Quality-Checked",
    desc: "Direct-from-vendor units with tamper-evident seals and QA on every batch.",
  },
  {
    icon: assets.support_img,
    title: "Customer Service",
    desc: "Get help anytime from setup to recovery—by email.",
  },
];

const OurPolicy = () => {
  return (
    <section className="w-full bg-black text-white py-16 sm:py-20 px-4 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-100">
            We’ve Got You Covered
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Clear guarantees so you can focus on securing your assets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 text-center text-sm">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6
                         hover:border-white/20 hover:bg-white/[0.03] transition"
            >
              {/* subtle glow on hover */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition
                              bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-400/10 blur-2xl" />
              <div className="mx-auto w-14 h-14 rounded-2xl grid place-items-center bg-emerald-500/10 ring-1 ring-emerald-400/20 mb-4">
                <img src={c.icon} alt="" className="w-7 h-7 opacity-90" />
              </div>
              <h3 className="font-semibold text-lg text-white">{c.title}</h3>
              <p className="text-gray-400 leading-relaxed max-w-xs mx-auto mt-2">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Optional: tiny reassurance row */}
        <div className="mt-8 text-center text-xs text-white/60">
          PCI-DSS secure checkout • Tracked shipping • Refund Assurance
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
