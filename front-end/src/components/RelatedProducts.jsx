import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import SkeletonProductItem from './SkeletonProductItem';

const RelatedProducts = ({ brand }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!products || products.length === 0) {
      setRelated([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const target = String(brand || '').toLowerCase();
    const filtered = products
      .filter((item) => item.brand && String(item.brand).toLowerCase() === target)
      .slice(0, 5);

    const t = setTimeout(() => {
      setRelated(filtered);
      setLoading(false);
    }, 500); // keep the same shimmer timing

    return () => clearTimeout(t);
  }, [products, brand]);

  return (
    <section className="mt-28">
      <div className="text-center mb-10">
        <Title text1="Related" text2="Products" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => <SkeletonProductItem key={idx} />)
          : related.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
