import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import spinWebm from "../assets/videos/spin.webm";
import spinMp4 from "../assets/videos/spin.mp4";
// If you have a poster, import it and uncomment poster={posterImg}
// import posterImg from "../assets/videos/spin_poster.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(!!mq?.matches);
    const handler = (e) => setShouldReduceMotion(e.matches);
    mq?.addEventListener?.("change", handler);
    return () => mq?.removeEventListener?.("change", handler);
  }, []);

  const handleNavigate = () => navigate("/wallet");

  const handleLoadedMeta = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // 4x slower
    }
  };

  return (
    <header className="w-full bg-[#000] text-white">
      <section className="relative">
        {/* Subtle spotlight background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-400/10 blur-3xl"
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20 lg:py-24 flex flex-col-reverse sm:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Text */}
          <div className="w-full sm:w-1/2 flex flex-col gap-5 text-center sm:text-left">
            <h1 className="font-grotesk text-[2.25rem] leading-tight sm:text-5xl lg:text-6xl font-semibold text-gray-100 tracking-tight">
              Secure Your Crypto
            </h1>

            <p className="text-gray-300 text-base sm:text-lg max-w-md mx-auto sm:mx-0">
              Hardware wallets with uncompromising protection and effortless setup.
              Keep control of your keys—on your terms.
            </p>

            <div className="mt-4">
              <button
                onClick={handleNavigate}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-10 py-4 text-base sm:text-lg font-semibold
                           bg-emerald-500 hover:bg-emerald-400
                           shadow-[0_0_20px_#00ff99] hover:shadow-[0_0_30px_#00ff99]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-black
                           transition cursor-pointer"
                aria-label="Shop hardware wallets now"
              >
                Shop Now
              </button>
            </div>

            {/* Tiny trust hint */}
            <div className="mt-3 text-xs sm:text-sm text-white/60">
              No seed exposed • EAL5+ secure element • 1,400+ coins & tokens
            </div>
          </div>

          {/* Right: Video */}
          <div className="w-full sm:w-1/2 h-[300px] sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] bg-black/60">
            {shouldReduceMotion ? (
              // Reduced motion: show the first frame without autoplay (use poster if you have one)
              <video
                className="w-full h-full object-contain bg-black"
                muted
                playsInline
                preload="metadata"
                // poster={posterImg}
                controls={false}
              >
                <source src={spinWebm} type="video/webm" />
                <source src={spinMp4} type="video/mp4" />
              </video>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full object-contain bg-black"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedMetadata={handleLoadedMeta}
                disablePictureInPicture
              >
                {/* Try WebM first (smaller/better), then MP4 as fallback */}
                <source src={spinWebm} type="video/webm" />
                <source src={spinMp4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Hero;
