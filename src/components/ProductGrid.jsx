import React from 'react';
import { Star } from 'lucide-react';

const sampleProducts = [
  {
    id: 'betta-koi',
    name: 'Betta Koi Galaxy',
    price: 29.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop',
    tags: ['betta', 'premium', 'nano']
  },
  {
    id: 'goldfish-oranda',
    name: 'Oranda Goldfish',
    price: 19.5,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1646116959154-a0627c472026?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxPcmFuZGElMjBHb2xkZmlzaHxlbnwwfDB8fHwxNzYyNTQyMDA1fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    tags: ['goldfish', 'hardy']
  },
  {
    id: 'discus-blue',
    name: 'Blue Diamond Discus',
    price: 85.0,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1700317135098-f3e909bc1744?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCbHVlJTIwRGlhbW9uZCUyMERpc2N1c3xlbnwwfDB8fHwxNzYyNTQyMDA2fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    tags: ['discus', 'show']
  },
  {
    id: 'shrimp-cherry',
    name: 'Cherry Shrimp (10 pack)',
    price: 14.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1628430045314-e20b77ba8b75?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDaGVycnklMjBTaHJpbXAlMjAlMjgxMCUyMHBhY2slMjl8ZW58MHwwfHx8MTc2MjU0MjAwNnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    tags: ['shrimp', 'cleanup-crew']
  }
];

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-800">{product.name}</h3>
          <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-amber-400' : 'text-amber-300'}`} />
          ))}
          <span className="ml-2 text-xs text-slate-500">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">{t}</span>
          ))}
        </div>
        <button onClick={() => onAdd(product)} className="mt-4 w-full rounded-lg bg-teal-600 py-2 text-white transition hover:bg-teal-700">
          Add to cart
        </button>
      </div>
    </div>
  );
};

const ProductGrid = ({ onAddToCart, search }) => {
  const filtered = React.useMemo(() => {
    if (!search) return sampleProducts;
    const q = search.toLowerCase();
    return sampleProducts.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)));
  }, [search]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Featured Fish</h2>
          <p className="text-slate-500">Hand-picked ornamental species for every aquascaper</p>
        </div>
        <div className="text-sm text-slate-500">Showing {filtered.length} items</div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
