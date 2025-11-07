import React from 'react';
import { Fish, ShoppingCart, Search, User, Shield, Star } from 'lucide-react';

const NavBar = ({ activePage, setActivePage, cartCount, onSearch, role, setRole }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const navItem = (key, label) => (
    <button
      key={key}
      onClick={() => setActivePage(key)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        activePage === key ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setActivePage('shop')} className="flex items-center gap-2 text-teal-700">
              <Fish className="h-6 w-6" />
              <span className="font-semibold">Zona Aquarium</span>
            </button>
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navItem('shop', 'Shop')}
              {navItem('loyalty', 'Loyalty')}
              {navItem('admin', 'Admin')}
            </nav>
          </div>

          <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-md items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fish, plants, accessories..."
                className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="hidden sm:block rounded-md border border-slate-300 bg-white px-2 py-1 text-sm"
              aria-label="Select role"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={() => setActivePage('loyalty')}
              className="relative inline-flex items-center gap-2 rounded-md bg-amber-500/10 px-3 py-2 text-amber-700 hover:bg-amber-500/20"
            >
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Loyalty</span>
            </button>

            <button
              onClick={() => setActivePage('admin')}
              className="hidden sm:inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50"
            >
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Admin</span>
            </button>

            <button
              onClick={() => setActivePage('cart')}
              className="relative inline-flex items-center rounded-full border border-slate-200 p-2 hover:bg-slate-50"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-teal-600 px-1 text-xs font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActivePage('account')}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 hover:bg-slate-50"
            >
              <User className="h-4 w-4 text-slate-700" />
              <span className="text-sm">Account</span>
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
