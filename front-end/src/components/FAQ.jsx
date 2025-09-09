// src/components/FAQ.jsx
import React, { useMemo } from "react";

/**
 * Accessible, mobile‑first FAQ using <details>/<summary>.
 * - Dark-theme friendly
 * - Keyboard + screen-reader friendly
 * - Injects FAQPage JSON‑LD for SEO
 */

const DEFAULT_ITEMS = [

  {
    q: "Will you ever ask for my seed phrase?",
    a: "Never. No one from our store will ask for your seed phrase. Only enter your seed into the device itself—never on a website, app, or chat."
  },
  {
    q: "Why buy here instead of a marketplace?",
    a: "We source from official distributors, keep strict chain-of-custody, and include fast tracked shipping plus a 7‑day replacement guarantee for damaged/incorrect items."
  },
  {
    q: "Which coins are supported?",
    a: "Ledger and Trezor support 1,400+ assets via their official apps and community integrations. Check each product page for the latest list before purchasing."
  },
  {
    q: "How long does shipping take?",
    a: "Orders usually ship within 24–48 hours on business days. You’ll receive a tracking link; delivery typically takes 2–7 days depending on your location."
  },
  {
    q: "What’s your return/replacement policy?",
    a: "If the device arrives damaged or the wrong model, contact us within 7 days for a hassle‑free replacement. For security reasons, opened/activated devices can’t be resold."
  },
  {
    q: "What if I lose or break the device?",
    a: "Your funds are recoverable with your seed phrase on a compatible new device. Keep multiple secure backups of your seed—never store it digitally."
  },
];

const FAQ = ({ title = "Frequently Asked Questions", subtitle = "Straight answers to keep you safe and confident.", items = DEFAULT_ITEMS }) => {
  // Build JSON‑LD for SEO
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  }), [items]);

  return (
    <section className="w-full py-16 bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-24">
        <header className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold font-grotesk">{title}</h2>
          <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">{subtitle}</p>
        </header>

        {/* Grid (single column on mobile, two on large screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 open:bg-zinc-900/60 transition-colors"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="text-white font-medium">{item.q}</span>
                {/* plus/minus icon */}
                <svg
                  className="mt-1 h-5 w-5 flex-none text-zinc-400 transition-transform group-open:rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9 3h2v14H9z" />
                  <path d="M3 9h14v2H3z" />
                </svg>
              </summary>
              <div className="mt-3 text-zinc-300 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </section>
  );
};

export default FAQ;
