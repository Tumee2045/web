import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import SkeletonProductItem from '../components/SkeletonProductItem';

const Wallet = () => {
  const { products = [], search, showSearch } = useContext(ShopContext);

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState('relevant');
  const [brands, setBrands] = useState([]); // selected brands (lowercased)
  const [filtered, setFiltered] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [dense, setDense] = useState(false); // grid density toggle

  // Brand list + counts (all lowercased)
  const brandMeta = useMemo(() => {
    const counts = new Map();
    for (const p of products) {
      const b = (p.brand || '').trim().toLowerCase();
      if (!b) continue;
      counts.set(b, (counts.get(b) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
  }, [products]);

  // Quick picks: top 5 brands by count
  const quickPicks = useMemo(
    () => [...brandMeta].sort((a, b) => b.count - a.count).slice(0, 5).map(b => b.name),
    [brandMeta]
  );

  const cap = (s = '') => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

  const toggleBrand = (value) => {
    const v = String(value).toLowerCase();
    setBrands((prev) => (prev.includes(v) ? prev.filter((b) => b !== v) : [...prev, v]));
  };

  const clearFilters = () => setBrands([]);

  // Filter + sort
  const applyFilter = () => {
    let list = [...products];

    if (showSearch && search) {
      const needle = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.name?.toLowerCase().includes(needle) ||
          item.description?.toLowerCase().includes(needle)
      );
    }

    if (brands.length > 0) {
      list = list.filter(
        (item) => item.brand && brands.includes(String(item.brand).toLowerCase())
      );
    }

    if (sortType === 'low-high') list.sort((a, b) => a.price - b.price);
    else if (sortType === 'high-low') list.sort((a, b) => b.price - a.price);

    setFiltered(list);
  };

  // Run filter with a small delay for skeleton polish
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => {
      applyFilter();
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, search, showSearch, brands, sortType]);

  return (
    <section className="relative bg-black text-white">
      {/* Subtle glow backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-64 w-2/3 blur-[120px] opacity-25 bg-gradient-to-r from-emerald-500/30 via-cyan-500/25 to-blue-500/25" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pt-10">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-24 px-4 sm:px-8 md:px-16 lg:px-24 backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/70 border-b border-white/10">
          <div className="py-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <Title text1="ALL" text2="WALLETS" />
              {!isLoading && (
                <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1">
                  {filtered.length} item{filtered.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Density */}
              <button
                onClick={() => setDense((v) => !v)}
                className="text-xs border border-white/10 bg-white/5 hover:bg-white/10 rounded-md px-3 py-2 transition"
                aria-pressed={dense}
                title="Toggle compact grid"
              >
                {dense ? 'Comfort' : 'Compact'}
              </button>

              {/* Sort */}
              <label htmlFor="sort" className="sr-only">Sort</label>
              <select
                id="sort"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="text-sm border border-white/10 bg-[#0b0b0b] hover:bg-white/5 rounded-md px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>

              {/* Mobile filters button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="sm:hidden text-sm border border-white/10 bg-white/5 hover:bg-white/10 rounded-md px-3 py-2 transition"
              >
                Filters
              </button>
            </div>
          </div>

          {/* Quick picks */}
          {brandMeta.length > 0 && (
            <div className="pb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 mr-1">Quick picks:</span>
              {quickPicks.map((b) => (
                <button
                  key={b}
                  onClick={() => toggleBrand(b)}
                  className={`text-xs rounded-full px-3 py-1 border transition ${
                    brands.includes(b)
                      ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300'
                      : 'border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-emerald-400/60'
                  }`}
                >
                  {cap(b)}
                </button>
              ))}
            </div>
          )}

          {/* Active filter chips */}
          {brands.length > 0 && (
            <div className="pb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 mr-1">Active:</span>
              {brands.map((b) => (
                <span
                  key={b}
                  className="text-xs inline-flex items-center gap-1 rounded-full border border-emerald-400/60 bg-emerald-400/10 text-emerald-300 px-3 py-1"
                >
                  {cap(b)}
                  <button
                    onClick={() => toggleBrand(b)}
                    className="opacity-80 hover:opacity-100"
                    aria-label={`Remove ${b}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="text-xs underline text-gray-300 hover:text-white ml-2"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-6">
          {/* Sidebar (desktop) */}
          <aside className="hidden sm:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* BRANDS — vertical list with hover/active emerald styling */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4">
                <p className="mb-3 text-sm font-semibold text-gray-200">Brands</p>
                {brandMeta.length === 0 ? (
                  <p className="text-xs text-gray-500">No products found.</p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {brandMeta.map(({ name, count }) => {
                      const active = brands.includes(name);
                      return (
                        <li key={name}>
                          <button
                            type="button"
                            onClick={() => toggleBrand(name)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleBrand(name)}
                            role="checkbox"
                            aria-checked={active}
                            className={[
                              "group w-full flex items-center justify-between rounded-xl px-3 py-2 transition text-left",
                              "border border-white/10 bg-white/[0.05] hover:bg-white/[0.07]",
                              "border-l-2",
                              active
                                ? "border-l-emerald-400 bg-emerald-400/10 border-emerald-400/50 shadow-[0_0_0_1px_rgba(16,185,129,0.25)]"
                                : "border-l-transparent hover:border-l-emerald-400/70",
                            ].join(" ")}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <span
                                className={[
                                  "h-3.5 w-3.5 rounded-sm border transition",
                                  active
                                    ? "border-emerald-400 bg-emerald-400/80"
                                    : "border-white/20 bg-transparent group-hover:border-emerald-400/60"
                                ].join(" ")}
                              />
                              <span
                                className={[
                                  "truncate text-sm transition-colors",
                                  active ? "text-white" : "text-gray-300 group-hover:text-white"
                                ].join(" ")}
                              >
                                {cap(name)}
                              </span>
                            </span>

                            <span
                              className={[
                                "shrink-0 text-xs px-2 py-0.5 rounded-full border transition-colors",
                                active
                                  ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                                  : "border-white/10 bg-white/5 text-gray-400 group-hover:text-gray-300"
                              ].join(" ")}
                            >
                              {count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <main className="flex-1">
            <div
              className={`grid ${
                dense
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                  : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              } gap-4 sm:gap-5`}
            >
              {isLoading
                ? Array.from({ length: dense ? 12 : 8 }).map((_, i) => <SkeletonProductItem key={i} />)
                : filtered.map((item) => (
                    <div
                      key={item._id}
                      className="group rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition backdrop-blur overflow-hidden"
                    >
                      <ProductItem
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                      />
                    </div>
                  ))}
            </div>

            {/* Empty state */}
            {!isLoading && filtered.length === 0 && (
              <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
                <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <span aria-hidden>🔍</span>
                </div>
                <h3 className="text-lg font-semibold">No wallets match your filters</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Try clearing filters or searching a different keyword.
                </p>
                {brands.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm underline text-gray-300 hover:text-white"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-[60] sm:hidden transition ${
          mobileFiltersOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!mobileFiltersOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileFiltersOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            mobileFiltersOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Sheet */}
        <div
          className={`absolute bottom-0 left-0 right-0 rounded-t-2xl border-t border-white/10 bg-[#0b0b0b] shadow-2xl transition-transform ${
            mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Filters</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-sm text-gray-300 hover:text-white"
              >
                Done
              </button>
            </div>

            {/* Mobile Brands — same emerald hover/active vibe, vertical */}
            <div className="mt-4">
              <p className="mb-3 text-xs font-semibold text-gray-300">Brands</p>
              {brandMeta.length === 0 ? (
                <p className="text-xs text-gray-500">No products found.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {brandMeta.map(({ name, count }) => {
                    const active = brands.includes(name);
                    return (
                      <li key={name}>
                        <button
                          type="button"
                          onClick={() => toggleBrand(name)}
                          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleBrand(name)}
                          role="checkbox"
                          aria-checked={active}
                          className={[
                            "group w-full flex items-center justify-between rounded-xl px-3 py-2 transition text-left",
                            "border border-white/10 bg-white/[0.05] hover:bg-white/[0.07]",
                            "border-l-2",
                            active
                              ? "border-l-emerald-400 bg-emerald-400/10 border-emerald-400/50 shadow-[0_0_0_1px_rgba(16,185,129,0.25)]"
                              : "border-l-transparent hover:border-l-emerald-400/70",
                          ].join(" ")}
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <span
                              className={[
                                "h-3.5 w-3.5 rounded-sm border transition",
                                active
                                  ? "border-emerald-400 bg-emerald-400/80"
                                  : "border-white/20 bg-transparent group-hover:border-emerald-400/60"
                              ].join(" ")}
                            />
                            <span
                              className={[
                                "truncate text-sm transition-colors",
                                active ? "text-white" : "text-gray-300 group-hover:text-white"
                              ].join(" ")}
                            >
                              {cap(name)}
                            </span>
                          </span>

                          <span
                            className={[
                              "shrink-0 text-xs px-2 py-0.5 rounded-full border transition-colors",
                              active
                                ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                                : "border-white/10 bg-white/5 text-gray-400 group-hover:text-gray-300"
                            ].join(" ")}
                          >
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {brands.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-xs underline text-gray-300 hover:text-white"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wallet;
