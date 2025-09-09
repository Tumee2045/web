import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import FAQ from '../components/FAQ';

// Small helpers
const Pill = ({ children }) => (
  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
    {children}
  </span>
);

const Card = ({ icon, title, desc }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-colors">
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/20">
      {icon}
    </div>
    <h4 className="mt-3 text-white text-base font-medium">{title}</h4>
    <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{desc}</p>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="flex flex-col items-center md:items-start">
    <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{value}</span>
    <span className="mt-1 text-xs text-gray-400">{label}</span>
  </div>
);

// Inline icons (no libraries, no external images)
const ShieldIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
    <path d="M9.5 12.5l2 2 4-4" strokeLinecap="round" />
  </svg>
);

const FlashIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" strokeLinecap="round" />
  </svg>
);

const LockIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V8a4 4 0 1 1 8 0v2" strokeLinecap="round" />
  </svg>
);

const About = () => {
  const logo = assets?.logo || assets?.logo_png; // optional logo if you have it
  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* Decorative ambient gradients (no images) */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl opacity-20" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl opacity-20" />

      <div className="pt-16 px-4 sm:px-[5vw] max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          {logo ? (
            <img
              src={logo}
              alt="ShopHardWallet.com logo"
              className="h-7 w-auto select-none"
              loading="lazy"
            />
          ) : null}
          <Title text1="ABOUT" text2="US" className="text-gray-100" />
        </div>

        {/* Intro (no img) */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Visual block built with CSS only */}
          <div className="relative rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-500/10" />
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <div className="text-xs text-emerald-200">Integrity</div>
                <div className="mt-1 text-sm text-gray-300">Sealed stock</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-gray-300">Transparency</div>
                <div className="mt-1 text-sm text-gray-400">Auth channels</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-gray-300">Support</div>
                <div className="mt-1 text-sm text-gray-400">&lt; 24h reply</div>
              </div>
              <div className="col-span-3 rounded-xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-transparent p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill>Authentic Supply</Pill>
                  <Pill>Factory-Sealed</Pill>
                  <Pill>US Shipping</Pill>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center gap-5 text-sm leading-relaxed">
            <p className="text-base text-gray-200">
              <span className="font-semibold text-white">ShopHardWallet.com</span> is a specialist store for cold-storage crypto hardware. 
              We obsess over authenticity, clear guidance, and responsive support—so you can secure your assets with confidence.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-white">Our Mission</h3>
              <p className="mt-2 text-gray-400">
                Make self-custody simple and safe for everyone. From first wallet to long-term storage, we verify supply,
                explain the tricky parts, and ship fast—so security never feels complicated.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-3 grid grid-cols-3 gap-4">
              <Stat value="100%" label="Sealed Inventory" />
              <Stat value="<24h" label="Support Reply" />
              <Stat value="7-Day" label="DOA Coverage" />
            </div>
          </div>
        </section>

        {/* Why Choose Our Wallets (green theme, no images) */}
        <section className="mb-14">
          <h3 className="text-2xl sm:text-3xl font-semibold">Why Choose Our Wallets</h3>
          <p className="mt-2 text-gray-400">
            Purpose-built hardware, audited firmware, and a frictionless setup designed for long-term security.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              icon={ShieldIcon}
              title="Secure by Design"
              desc="EAL5+-class secure elements and offline key storage. Your seed never touches the internet."
            />
            <Card
              icon={FlashIcon}
              title="Fast Setup"
              desc="From unbox to first transaction in minutes with a clear, step-by-step guide."
            />
            <Card
              icon={PlusIcon}
              title="Multi-Chain Ready"
              desc="Bitcoin, Ethereum, and 1,400+ assets via popular wallet apps and bridges."
            />
            <Card
              icon={LockIcon}
              title="Refund Assurance"
              desc="Returns are accepted only if the item is damaged on arrival (DOA). Report within 7 days for a replacement."
            />
          </div>
        </section>

        {/* Verification steps (css-only visuals) */}
        <section className="mb-16 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
          <h3 className="text-xl font-semibold">How We Verify Inventory</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {[ 'Chain-of-custody', 'Seal & box checks', 'Pre-ship confirmation' ].map((title, i) => (
              <div key={title} className="flex gap-4">
                <div className="h-9 w-9 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  {i+1}
                </div>
                <div>
                  <h5 className="text-white font-medium">{title}</h5>
                  <p className="mt-1 text-gray-400">
                    {i === 0 && 'We source only from manufacturers or authorized distributors.'}
                    {i === 1 && 'Tamper-evident seals, lot/date codes, and packaging integrity checks.'}
                    {i === 2 && 'Final visual check before dispatch. Devices are never initialized.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Tip: Always initialize your wallet yourself and verify firmware from the official vendor site.
          </p>
        </section>

        {/* Policy highlights */}
        <section aria-label="Store promises" className="mb-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
              ✓ DOA-only returns within 7 days
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
              ✓ Optional signature on delivery
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
              ✓ Email & chat support (&lt;24h)
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
              ✓ Secure checkout (HTTPS)
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="mb-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Ready to secure your crypto?</h4>
            <p className="mt-1 text-sm text-emerald-200/80">
              Compare top hardware wallets, specs, and compatibility—then check out with confidence.
            </p>
          </div>
          <a
            href="/collection"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-400 text-black px-4 py-2.5 text-sm font-medium hover:bg-emerald-300 transition-colors"
          >
            Browse Wallets
          </a>
        </section>

        <FAQ />
      </div>
    </div>
  );
};

export default About;
