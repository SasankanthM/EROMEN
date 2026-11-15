import React from 'react';
import { useShop } from '../context/ShopContext';
import { ClipboardList, Scissors, Package, RefreshCw, ShoppingBag } from 'lucide-react';

export const CustomerOrdersPage: React.FC = () => {
  const { currentUser, orders, ordersLoading, refreshOrders, formatPrice, setActivePage } = useShop();

  if (!currentUser) {
    return (
      <section className="w-full min-h-[75vh] bg-[#0a0b0e] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md bg-[#12141a] border border-[#262934] rounded-2xl p-8 text-center space-y-4">
          <ClipboardList size={32} className="text-[#c5a880] mx-auto" />
          <h2 className="text-2xl font-bold font-editorial text-white">Sign In to View Your Orders</h2>
          <p className="text-xs text-[#a09a8e]">
            Track your bespoke suit fittings, Tex Valley pickup readiness, and delivery status.
          </p>
          <button
            onClick={() => setActivePage('login')}
            className="px-6 py-3 bg-[#c5a880] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded-lg"
          >
            Go to Login Page
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#0a0b0e] text-[#f4efe6] py-10 sm:py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f2129]">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#c5a880]">
              MEMBER ORDER TRACKING
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-white mt-1">
              My Orders & Tailoring Status
            </h1>
            <p className="text-xs text-[#a09a8e] mt-1">
              Welcome, {currentUser.name}. Here are your active and completed orders at EROMEN Tex Valley.
            </p>
          </div>

          <button
            onClick={refreshOrders}
            className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2 bg-[#15171f] border border-[#2c2f3b] rounded-lg text-xs text-[#e6d5b8]"
          >
            <RefreshCw size={14} className={ordersLoading ? 'animate-spin' : ''} />
            <span>Refresh Status</span>
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#12141a] border border-[#242733] rounded-2xl p-12 text-center space-y-4">
            <ShoppingBag size={36} className="text-[#c5a880] mx-auto opacity-75" />
            <h3 className="text-xl font-bold font-editorial text-white">No Orders Placed Yet</h3>
            <p className="text-xs text-[#a09a8e] max-w-sm mx-auto">
              Browse our menswear collection and place your first order for Tex Valley pickup or express Tamil Nadu delivery.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-3 bg-[#c5a880] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded-lg"
            >
              Explore Men's Collection
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-[#12141a] border border-[#242733] rounded-2xl p-6 space-y-4 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f222c] pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#c5a880]">{order.id}</span>
                    <p className="text-[11px] text-[#8c8982]">
                      Placed on {new Date(order.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 text-[#e6d5b8] text-xs font-bold">
                      {order.status}
                    </span>
                    <span className="text-lg font-bold font-editorial text-white">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Live Tailor Procedure Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#0d0f14] p-4 rounded-xl border border-[#1f222c]">
                  <div className="flex items-start space-x-2">
                    <Scissors size={15} className="text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#8c8982] block">Assigned Master:</span>
                      <span className="text-white font-semibold">{order.assignedTailor}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Package size={15} className="text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#8c8982] block">Estimated Ready:</span>
                      <span className="text-emerald-400 font-semibold">{order.estimatedReadyTime}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#8c8982] block">Atelier Notes:</span>
                    <span className="text-[#d1ccc4]">{order.tailorNotes}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-[#d1ccc4]">
                      <span>
                        {item.quantity}× {item.name} ({item.selectedSize}, {item.selectedColorName})
                      </span>
                      <span className="font-semibold text-white">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
