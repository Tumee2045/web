import React from "react";

/* ---------------- STAR RATING COMPONENT ---------------- */
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 mt-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-zinc-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.967 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0L6.714 16.28c-.784.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.08 8.72c-.783-.57-.379-1.81.588-1.81H7.13a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

/* ---------------- REVIEWS DATA ---------------- */
const reviews = [
  { name: "Alice Thompson", quote: "Fast delivery and genuine product. Arrived earlier than expected and the packaging was flawless.", rating: 5 },
  { name: "Michael King", quote: "Customer support was fantastic! They walked me through setup step by step and never rushed me.", rating: 5 },
  { name: "Sarah Daniels", quote: "Packaging was perfect and sealed. I felt very confident knowing it was untouched and authentic.", rating: 5 },
  { name: "Ethan Brooks", quote: "Setup was smooth and quick. The instructions were clear, and I had my wallet ready in minutes.", rating: 4 },
  { name: "Linda Parker", quote: "This is a trustworthy crypto wallet store. Everything about the process felt secure and reliable.", rating: 5 },
  { name: "John Roberts", quote: "Best prices I found anywhere, plus the peace of mind that the wallet is genuine. Great combo.", rating: 4 },
  { name: "Anna Williams", quote: "The exchange policy gave me peace of mind. Luckily I didn’t need it, but it’s reassuring.", rating: 5 },
  { name: "Mark Taylor", quote: "Easy checkout, no issues at all. The entire buying experience was smooth and stress-free.", rating: 5 },
  { name: "Sophie Bennett", quote: "Delivery was on time, tracked, and professionally packed. I appreciated the constant updates.", rating: 5 },
  { name: "Henry Scott", quote: "Very professional experience. You can tell they take customer trust seriously at every step.", rating: 4 },
  { name: "David Johnson", quote: "Five stars for authenticity! The tamper-evident seal was intact and everything checked out perfectly.", rating: 5 },
  { name: "Elena Knight", quote: "Great communication via email. They answered my concerns quickly and clearly.", rating: 4 },
  { name: "Tom Wilson", quote: "This was my first hardware wallet and I love it. The peace of mind is worth every penny.", rating: 5 },
  { name: "Paul Smith", quote: "Smooth ordering process. The website is clean and intuitive, and payment was quick.", rating: 4 },
  { name: "Rachel Morgan", quote: "Would definitely recommend to friends who want to secure their crypto safely and easily.", rating: 5 },
  { name: "Alex Peterson", quote: "The refund policy made me confident in my purchase. It shows they actually care about customers.", rating: 5 },
  { name: "Sophia Lewis", quote: "The site feels premium and secure, which is exactly what you want when buying something like this.", rating: 5 },
  { name: "Chris Davis", quote: "I loved the handwritten thank-you note in the box. Small detail, but it made a big impression.", rating: 5 },
  { name: "Brian Evans", quote: "I will definitely be buying here again. The experience was seamless from start to finish.", rating: 5 },
  { name: "Tanya Vincent", quote: "Safe and trusted seller. I’ve been scammed before elsewhere, so this was a refreshing change.", rating: 4 },
];

/* ---------------- REVIEW CARD ---------------- */
const ReviewCard = ({ review }) => (
  <div className="min-w-[250px] flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
    <p className="text-zinc-300 leading-relaxed">“{review.quote}”</p>
    <p className="mt-3 font-medium text-white">— {review.name}</p>
    <StarRating rating={review.rating} />
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */
const CustomerReviews = () => {
  return (
    <section className="w-full py-16 bg-black text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-24">
        <header className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold font-grotesk">What Customers Say</h2>
          <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">
            Real experiences from people securing their assets with us.
          </p>
        </header>

        {/* Horizontal auto-scroll container */}
        <div className="overflow-x-hidden">
          <div className="flex gap-6 w-[500%] animate-scroll-slow">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
