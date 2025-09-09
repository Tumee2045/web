import React from "react";

const features = [
  {
    title: "Secure by Design",
    desc: "EAL5+ secure element and offline key storage. Your seed never touches the internet.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9.5 12.5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Fast Setup",
    desc: "From unbox to first transaction in minutes with a step‑by‑step guided flow.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M13 3l8 8-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Multi‑Chain Ready",
    desc: "Bitcoin, Ethereum, and 1,400+ assets via popular wallet apps and bridges.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Refund Assurance",
    desc: "Full peace of mind — 7-day no-questions-asked replacement if your device arrives damaged or incorrect.",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 8V6a4 4 0 1 1 8 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full bg-[#000] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-24 py-12 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-100">
            Why Choose Our Wallets
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl">
            Purpose‑built hardware, audited firmware, and a frictionless setup designed for long‑term security.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6
                         hover:border-white/20 transition"
            >
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition
                              bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-400/10 blur-2xl" />
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 bg-emerald-500/15 ring-1 ring-emerald-400/20">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-100">{title}</h3>
              </div>
              <p className="mt-3 text-sm sm:text-[0.95rem] leading-relaxed text-gray-400">
                {desc}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
