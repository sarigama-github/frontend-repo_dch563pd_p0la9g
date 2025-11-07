import React from 'react';
import NavBar from './components/NavBar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import LoyaltyPanel from './components/LoyaltyPanel';

function App() {
  const [activePage, setActivePage] = React.useState('shop');
  const [role, setRole] = React.useState('customer');
  const [cart, setCart] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [loyalty, setLoyalty] = React.useState({ points: 220, history: [] });
  const [isCartOpen, setCartOpen] = React.useState(false);

  const handleAddToCart = (product) => {
    setCartOpen(true);
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    // Earn loyalty points: 1pt per $1 (preview demo logic)
    const earned = Math.round(product.price);
    setLoyalty((l) => ({
      points: l.points + earned,
      history: [
        { title: `Purchased ${product.name}`, points: earned, date: new Date().toISOString() },
        ...l.history,
      ].slice(0, 5),
    }));
  };

  const onCheckout = () => {
    alert('Checkout complete! (demo)');
    setCart([]);
  };

  const AdminInline = () => (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Admin Overview</h2>
        <p className="text-slate-600">Snapshot of store performance and inventory</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Revenue (30d)</div>
          <div className="text-2xl font-bold text-slate-800">$24,320</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Products in stock</div>
          <div className="text-2xl font-bold text-slate-800">148</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Active customers</div>
          <div className="text-2xl font-bold text-slate-800">1,204</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Orders pending</div>
          <div className="text-2xl font-bold text-slate-800">12</div>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Low stock alerts</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Blue Diamond Discus — 3 left</li>
            <li>Cherry Shrimp — 5 packs left</li>
            <li>Mini Anubias — 7 left</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Recent orders</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>#1024 — Betta Koi Galaxy — $29.99</li>
            <li>#1023 — Oranda Goldfish — $19.50</li>
            <li>#1022 — Cherry Shrimp — $14.99</li>
          </ul>
        </div>
      </div>
    </section>
  );

  const content = () => {
    if (activePage === 'loyalty') return <LoyaltyPanel points={loyalty.points} history={loyalty.history} />;
    if (activePage === 'admin' || role === 'admin') return <AdminInline />;
    return (
      <div className="space-y-10">
        <Hero />
        <ProductGrid onAddToCart={handleAddToCart} search={search} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-sky-50">
      <NavBar
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        onSearch={setSearch}
        role={role}
        setRole={setRole}
      />

      <main className="py-8">
        {content()}
      </main>

      {isCartOpen && (
        <CartDrawer items={cart} onClose={() => setCartOpen(false)} onCheckout={onCheckout} />
      )}

      <Footer />
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 p-8 sm:p-12 text-white">
        <div className="relative z-10 grid gap-6 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Discover rare ornamental fish and aquascaping essentials
            </h1>
            <p className="mt-3 text-white/90">
              Curated species, ethical sourcing, and expert care. Earn points with every purchase through our loyalty program.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#shop" className="rounded-lg bg-white px-4 py-2 text-slate-900 font-semibold hover:bg-white/90">Shop now</a>
              <a href="#loyalty" className="rounded-lg border border-white/30 px-4 py-2 text-white hover:bg-white/10">How loyalty works</a>
            </div>
          </div>
          <div className="lg:flex lg:items-center lg:justify-end">
            <img
              src="https://images.unsplash.com/photo-1544551763-7ef420be2f20?q=80&w=1974&auto=format&fit=crop"
              alt="Aquarium scape"
              className="h-56 w-full rounded-2xl object-cover shadow-2xl sm:h-72 lg:h-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white">
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Zona Aquarium. All rights reserved.</p>
        <div className="text-sm text-slate-500">Ethically bred • Live arrival guarantee • Expert support</div>
      </div>
    </div>
  </footer>
);

export default App;
