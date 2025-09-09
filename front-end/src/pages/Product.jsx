import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import FAQ from '../components/FAQ';
import CustomerReviews from '../components/CustomerReviews';
import Features from '../components/Features';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // gallery + lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // sticky quick add bar
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let timer;
    const product = products.find((item) => item._id === productId);

    if (product) {
      timer = setTimeout(() => {
        setProductData(product);
        const firstImg = Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : '';
        setImage(firstImg);
        setLightboxIndex(0);
        setIsLoading(false);
      }, 300);
    } else {
      timer = setTimeout(() => {
        setProductData(null);
        setImage('');
        setIsLoading(false);
      }, 200);
    }
    return () => clearTimeout(timer);
  }, [productId, products]);

  // sticky CTA on scroll
  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brandLabel = useMemo(() => {
    const b = productData?.brand ? String(productData.brand) : '';
    return b ? b.charAt(0).toUpperCase() + b.slice(1) : '';
  }, [productData]);

  const openLightboxAt = useCallback((idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const nextImage = useCallback(() => {
    if (!productData?.image?.length) return;
    setLightboxIndex((i) => (i + 1) % productData.image.length);
  }, [productData]);

  const prevImage = useCallback(() => {
    if (!productData?.image?.length) return;
    setLightboxIndex((i) => (i - 1 + productData.image.length) % productData.image.length);
  }, [productData]);

  const handleAdd = () => {
    addToCart(productData._id);
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    addToCart(productData._id);
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="pt-20 max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-24 animate-pulse">
        <div className="h-5 w-40 bg-[#1a1a1a] rounded mb-6" />
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="h-96 bg-[#1a1a1a] rounded" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 bg-[#1a1a1a] rounded" />
            <div className="h-4 w-1/4 bg-[#1a1a1a] rounded" />
            <div className="h-6 w-28 bg-[#1a1a1a] rounded" />
            <div className="h-10 w-40 bg-[#1a1a1a] rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <section className="pt-20 text-white max-w-[1440px] px-4 sm:px-10 md:px-16 lg:px-24 mx-auto">
        <p className="text-gray-400">Product not found.</p>
      </section>
    );
  }

  const images = Array.isArray(productData.image) ? productData.image : [];

  // Optional content (with tasteful defaults if absent)
  const highlights = Array.isArray(productData.highlights) && productData.highlights.length > 0
    ? productData.highlights
    : [
        'Secure Element (EAL5+) for private key protection',
        'Offline cold storage • No seed leak exposure',
        '1,400+ assets supported with companion app',
        'Bluetooth® / USB connection (model dependent)',
      ];

  const specs = productData.specs && typeof productData.specs === 'object'
    ? productData.specs
    : {
        'Security': 'EAL5+ Secure Element, PIN, passphrase',
        'Connectivity': 'USB / Bluetooth (model dependent)',
        'Dimensions': '62 x 18.6 x 9.1 mm (approx.)',
        'Weight': '34 g (approx.)',
        'Materials': 'Aluminum + polymer',
        'Companion App': 'Ledger Live / Vendor app',
      };

  const inBox = Array.isArray(productData.inBox) && productData.inBox.length > 0
    ? productData.inBox
    : ['Hardware wallet device', 'USB cable', 'Recovery sheets', 'Quick start guide'];

  const compatibility = Array.isArray(productData.compatibility) && productData.compatibility.length > 0
    ? productData.compatibility
    : ['Windows', 'macOS', 'Linux', 'iOS', 'Android'];

  return (
    <section className="relative text-white">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-64 w-2/3 blur-[120px] opacity-25 bg-gradient-to-r from-emerald-500/25 via-cyan-500/20 to-blue-500/20" />
      </div>

      <div className="pt-20 max-w-[1440px] px-4 sm:px-10 md:px-16 lg:px-24 mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-xs sm:text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/wallet" className="hover:text-gray-300">All Wallets</Link>
          {brandLabel && (<><span className="mx-2">/</span><span className="text-gray-400">{brandLabel}</span></>)}
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Gallery */}
          <div className="flex-1">
            <div
              className="group rounded-2xl overflow-hidden bg-[#0b0b0b] border border-white/10 cursor-zoom-in relative"
              onClick={() => openLightboxAt(Math.max(0, images.indexOf(image)))}
              title="Open gallery"
            >
              {!!image ? (
                <img
                  src={image}
                  alt={productData.name}
                  className="w-full h-[460px] object-contain bg-[#0a0a0a] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-[460px] grid place-items-center text-gray-500">No image</div>
              )}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              <div className="pointer-events-none absolute -left-1 top-6 h-10 w-10 rounded-full blur-xl bg-emerald-500/20" />
            </div>

            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setImage(img); setLightboxIndex(idx); }}
                    className={`h-16 rounded-lg overflow-hidden border transition ${
                      img === image
                        ? 'border-emerald-400/70 shadow-[0_0_0_1px_rgba(16,185,129,0.35)]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    aria-label={`Thumbnail ${idx + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex-[1.1] flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-semibold leading-snug">{productData.name}</h1>
              {brandLabel && (
                <span className="shrink-0 px-3 py-1 rounded-full text-xs border border-emerald-400/40 bg-emerald-400/10 text-emerald-300">
                  {brandLabel}
                </span>
              )}
            </div>

            {/* Price + actions */}
            <div className="rounded-2xl bg-[#0b0b0b] border border-white/10 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {currency}{productData.price}
                </p>
                <p className="text-xs text-gray-500 mt-1">Inclusive of taxes</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAdd}
                  className="px-6 py-3 rounded-full text-sm transition bg-emerald-500 hover:bg-emerald-400 text-black font-medium shadow-[0_10px_30px_-12px_rgba(16,185,129,0.45)]"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="px-6 py-3 rounded-full text-sm transition border border-emerald-400/70 bg-transparent hover:bg-emerald-400/10 text-emerald-300"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><span className="opacity-80">Authentic hardware • Factory sealed</span></div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><span className="opacity-80">Secure checkout • SSL & 3D-Secure</span></div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><span className="opacity-80">Fast shipping • Tracking provided</span></div>
            </div>

            {/* Description + Highlights */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                {productData.description || 'Purpose-built for cold storage with a secure element and companion app support.'}
              </p>

              <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-200">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    <span className="opacity-90">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Specs */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold mb-4">Tech Specifications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(specs).map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-xs uppercase tracking-wide text-gray-400">{k}</p>
                <p className="text-sm mt-1 text-gray-200">{String(v)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* In the Box + Compatibility */}
        <section className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-semibold mb-3">In the Box</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {inBox.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-semibold mb-3">Compatibility</h3>
            <div className="flex flex-wrap gap-2">
              {compatibility.map((c) => (
                <span
                  key={c}
                  className="text-xs rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 px-3 py-1"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping & Warranty */}
        <section className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-semibold mb-2">Shipping</h3>
            <p className="text-sm text-gray-300">
              Orders ship within 1–2 business days. Tracking provided. Expedited options at checkout.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-semibold mb-2">Warranty & Returns</h3>
            <p className="text-sm text-gray-300">
              12-month limited warranty. Unopened items returnable within 7 days of delivery.
            </p>
          </div>
        </section>

        {/* Related / Features / FAQ / Reviews */}
        <div className="mt-16"><RelatedProducts brand={productData.brand} /></div>
        <div className="mt-12"><Features /></div>
        <div className="mt-16"><FAQ /></div>
        <div className="mt-12"><CustomerReviews /></div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false); }}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-10 right-0 text-gray-300 hover:text-white"
              title="Close"
            >
              ✕
            </button>

            <div className="relative rounded-2xl overflow-hidden bg-[#0b0b0b] border border-white/10">
              <img src={images[lightboxIndex]} alt="" className="w-full max-h-[78vh] object-contain" />
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-2 hover:bg-black/70"
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    title="Previous"
                  >
                    ‹
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-2 hover:bg-black/70"
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    title="Next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                    className={`h-14 rounded-md overflow-hidden border transition ${
                      idx === lightboxIndex
                        ? 'border-emerald-400/70 shadow-[0_0_0_1px_rgba(16,185,129,0.35)]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    title={`Image ${idx + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky quick add */}
      {showStickyBar && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] px-3">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0d0d0d]/95 backdrop-blur px-4 py-2 shadow-lg">
            <span className="text-sm text-gray-100">{currency}{productData.price}</span>
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-4 py-2 rounded-full border border-emerald-400/70 bg-transparent hover:bg-emerald-400/10 text-emerald-300 text-sm"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
