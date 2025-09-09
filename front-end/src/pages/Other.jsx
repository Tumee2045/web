import React from 'react';
import { assets } from '../assets/assets';

const Other = () => {
  const logo = assets?.logo || assets?.logo_png;

  return (
    <div className="relative min-h-[90vh] bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-40 h-[30rem] w-[30rem] rounded-full bg-emerald-400/20 blur-[100px]" />

      <div className="relative z-10 w-full px-6 sm:px-[5vw]">
        <section className="mx-auto max-w-2xl text-center">
          {/* Centered logo */}
          {logo && (
            <img
              src={logo}
              alt="ShopHardWallet.com"
              className="mx-auto mb-6 h-12 w-auto select-none"
              loading="lazy"
            />
          )}

          {/* Announcement Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-10 shadow-[0_0_40px_rgba(16,185,129,0.12)]">
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-emerald-500/10" />

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent animate-[gradient-move_5s_ease_infinite]">
              Coming Soon
            </h1>

            <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
              We’re curating a brand-new category beyond hardware wallets.
              The reveal is on the way — stay tuned.
            </p>

            {/* Divider */}
            <div className="mx-auto mt-8 h-px w-48 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            {/* Single button */}
            <div className="mt-8">
              <a
                href="/home"
                className="inline-block rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 transition-colors"
              >
                Back to Store
              </a>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-12 text-xs text-gray-500">
            © {new Date().getFullYear()} ShopHardWallet.com — New category unveiling soon.
          </p>
        </section>
      </div>

      {/* Gradient animation */}
      <style>{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Other;
