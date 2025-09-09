import React from 'react';

const Title = ({ text1, text2, className = 'text-white' }) => {
  return (
    <div className="flex items-center gap-4 mb-5">
      <h2
        className={`text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-gray-100 ${className}`}
      >
        {text1} {text2}
      </h2>
      <div className="flex-1 h-px bg-neutral-500 max-w-[120px] sm:max-w-[160px]"></div>
    </div>
  );
};

export default Title;
