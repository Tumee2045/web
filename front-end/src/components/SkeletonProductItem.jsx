import React from 'react';

const SkeletonProductItem = () => {
  return (
    <div className="animate-pulse bg-[#1a1a1a] p-4 rounded-xl space-y-4" aria-hidden="true">
      {/* Image Placeholder */}
      <div className="bg-gray-700 rounded-lg h-60 w-full" />

      {/* Title + Price */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/3" />
      </div>

      {/* Button Placeholder */}
      <div className="h-12 bg-gray-700 rounded-md w-full" />
    </div>
  );
};

export default SkeletonProductItem;
