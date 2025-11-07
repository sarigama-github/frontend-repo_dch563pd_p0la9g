import React from 'react';
import { Package, DollarSign, TrendingUp, Users } from 'lucide-react';

const Stat = ({ icon: Icon, label, value, trend }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
      </div>
      <div className="rounded-xl bg-teal-50 p-3 text-teal-700">
        <Icon className="h-5 w-5" />
      </div>
    </div>
    {trend && (
      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
        <TrendingUp className="h-3 w-3" /> {trend}
      </div>
    )}
  </div>
);

const AdminDashboard = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Admin Overview</h2>
        <p className="text-slate-600">Quick insight into store performance and inventory</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={DollarSign} label="Revenue (30d)" value="$24,320" trend="+12%" />
        <Stat icon={Package} label="Products in stock" value="148" />
        <Stat icon={Users} label="Active customers" value="1,204" trend="+5%" />
        <Stat icon={Package} label="Orders pending" value="12" />
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
};

export default AdminDashboard;
