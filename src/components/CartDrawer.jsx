import React from 'react';

const CartDrawer = ({ items, onClose, onCheckout }) => {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-xl">
        <div className="sticky top-0 z-10 border-b bg-white p-4">
          <h3 className="text-lg font-semibold">Your Cart</h3>
        </div>
        <div className="p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-slate-500">Your cart is empty.</p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-3">
              <img src={it.image} alt={it.name} className="h-16 w-16 rounded object-cover" />
              <div className="flex-1">
                <div className="font-medium text-slate-800">{it.name}</div>
                <div className="text-sm text-slate-500">Qty: {it.qty}</div>
              </div>
              <div className="font-semibold text-slate-800">${(it.price * it.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 z-10 border-t bg-white p-4">
          <div className="mb-3 flex items-center justify-between text-slate-700">
            <span>Subtotal</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full rounded-lg bg-teal-600 py-2 text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
