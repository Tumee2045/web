import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* background glows */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-40 h-[28rem] w-[28rem] rounded-full bg-emerald-400/15 blur-[100px]" />

      <div className="relative z-10 text-center px-6">
        {/* 404 glowing number */}
        <h1 className="text-[6rem] sm:text-[8rem] font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.35)] animate-pulse">
          404
        </h1>

        {/* main message */}
        <p className="mt-2 text-xl sm:text-2xl font-medium text-gray-200">
          Page Not Found
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-md mx-auto">
          Sorry, we couldn’t find the page you were looking for.  
          It may have been moved or doesn’t exist.
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="mt-8 inline-block rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          Back to Home
        </Link>
      </div>

      {/* local keyframes (pulse glow) */}
      <style>{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default NotFound;
