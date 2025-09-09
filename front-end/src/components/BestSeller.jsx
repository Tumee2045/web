import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import SkeletonProductItem from "./SkeletonProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const bestList = products.filter((p) => p.bestseller);
      // Fallback if not enough bestseller-flagged items
      const normalized = (bestList.length ? bestList : products).slice(0, 5);
      setItems(normalized);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [products]);

  return (
    <section className="w-full bg-black text-white py-16 sm:py-20 px-4 sm:px-10 md:px-16 lg:px-24">
      {/* Header */}
      <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="text-center sm:text-left">
          <Title text1="Best" text2="Sellers" />
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-3 mx-auto sm:mx-0">
            Community favorites with proven reliability and support.
          </p>
        </div>
        <a
          href="/wallet?sort=top"
          className="inline-flex items-center justify-center self-center sm:self-auto rounded-full px-5 py-2 text-sm font-medium
                     border border-white/15 hover:border-white/30 hover:bg-white/5 text-white transition
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Shop Best Sellers
        </a>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-6"
        aria-busy={loading ? "true" : "false"}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonProductItem key={i} />)
          : items.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
      </div>
    </section>
  );
};

export default BestSeller;
