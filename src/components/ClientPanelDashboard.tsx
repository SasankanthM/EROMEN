import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_CONFIG } from '../data/shopConfig';
import { Order, OrderStatus } from '../types';
import {
  LayoutDashboard,
  Package,
  Scissors,
  CheckCircle2,
  Truck,
  Clock,
  RefreshCw,
  MessageCircle,
  Printer,
  ShieldAlert,
  User as UserIcon,
  Phone,
  MapPin,
  IndianRupee,
  Save,
  ArrowRight
} from 'lucide-react';

const ORDER_STAGES: OrderStatus[] = [
  'Order Received',
  'In Tailoring & Alteration',
  'Quality Check & Packed',
  'Ready at Tex Valley / Dispatched',
  'Completed',
  'Cancelled'
];

const STATUS_BADGE_STYLES: Record<OrderStatus, string> = {
  'Order Received': 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  'In Tailoring & Alteration': 'bg-blue-500/15 text-blue-300 border-blue-500/40',
  'Quality Check & Packed': 'bg-purple-500/15 text-purple-300 border-purple-500/40',
  'Ready at Tex Valley / Dispatched': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  'Completed': 'bg-[#c5a880]/20 text-[#e6d5b8] border-[#c5a880]/50',
  'Cancelled': 'bg-red-500/15 text-red-300 border-red-500/40'
};

export const ClientPanelDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    ordersLoading,
    refreshOrders,
    updateOrderProcedure,
    formatPrice,
    setActivePage,
    setLoginRoleTab
  } = useShop();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Editable procedure fields for selected order
  const [editStatus, setEditStatus] = useState<OrderStatus>('Order Received');
  const [editTailor, setEditTailor] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editEta, setEditEta] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const selectedOrder: Order | undefined =
    orders.find(o => o.id === selectedOrderId) || orders[0];

  useEffect(() => {
    if (currentUser?.role === 'seller' && currentUser.email.toLowerCase() === 'eromen20@gmail.com') {
      refreshOrders();
    }
  }, [currentUser?.id, currentUser?.role, currentUser?.email, refreshOrders]);

  useEffect(() => {
    if (selectedOrder) {
      setSelectedOrderId(selectedOrder.id);
      setEditStatus(selectedOrder.status);
      setEditTailor(selectedOrder.assignedTailor || '');
      setEditNotes(selectedOrder.tailorNotes || '');
      setEditEta(selectedOrder.estimatedReadyTime || '');
    }
  }, [selectedOrder?.id, selectedOrder?.updatedAt]);

  // Access Gate if not logged in strictly as the authorized Owner / Seller
  if (
    !currentUser ||
    currentUser.role !== 'seller' ||
    currentUser.email.toLowerCase() !== 'eromen20@gmail.com'
  ) {
    return (
      <section className="w-full min-h-[80vh] bg-[#0a0b0e] py-16 px-4 sm:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#12141a] border border-[#2b2e3c] rounded-2xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 text-[#c5a880] flex items-center justify-center mx-auto">
            <ShieldAlert size={28} />
          </div>
          <h2 className="text-2xl font-bold font-editorial text-white">
            Owner / Seller Access Required
          </h2>
          <p className="text-xs text-[#a09a8e] leading-relaxed">
            The Client Panel Dashboard is restricted to EROMEN shop owners and staff to view incoming orders and manage tailoring & dispatch procedures.
          </p>
          <button
            onClick={() => {
              setLoginRoleTab('seller');
              setActivePage('login');
            }}
            className="w-full py-3 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
          >
            Sign In as Store Owner / Seller
          </button>
        </div>
      </section>
    );
  }

  const filteredOrders = orders.filter(o =>
    statusFilter === 'All' ? true : o.status === statusFilter
  );

  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const newCount = orders.filter(o => o.status === 'Order Received').length;
  const tailoringCount = orders.filter(
    o => o.status === 'In Tailoring & Alteration' || o.status === 'Quality Check & Packed'
  ).length;
  const readyCount = orders.filter(
    o => o.status === 'Ready at Tex Valley / Dispatched' || o.status === 'Completed'
  ).length;

  const handleSaveProcedure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setSaving(true);
    await updateOrderProcedure(selectedOrder.id, {
      status: editStatus,
      assignedTailor: editTailor,
      tailorNotes: editNotes,
      estimatedReadyTime: editEta
    });
    setSaving(false);
  };

  const handleQuickAdvance = async (order: Order) => {
    const idx = ORDER_STAGES.indexOf(order.status);
    if (idx === -1 || idx >= 4) return;
    const nextStage = ORDER_STAGES[idx + 1];
    await updateOrderProcedure(order.id, { status: nextStage });
  };

  const handleNotifyCustomerWhatsApp = (order: Order) => {
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = encodeURIComponent(
      `Vanakkam ${order.customerName}! Update from EROMEN Atelier (Tex Valley, Perundurai):\n\n` +
      `• Order ID: ${order.id}\n` +
      `• Current Procedure Stage: ${order.status}\n` +
      `• Assigned Master: ${order.assignedTailor}\n` +
      `• Ready / Delivery ETA: ${order.estimatedReadyTime}\n` +
      `• Notes: ${order.tailorNotes}\n\n` +
      `Thank you for dressing with EROMEN!`
    );
    window.open(`https://wa.me/${targetPhone || SHOP_CONFIG.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section className="w-full min-h-screen bg-[#0a0b0e] text-[#f4efe6] py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f2129]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.25em] uppercase text-[#c5a880] mb-1">
              <LayoutDashboard size={14} />
              <span>OWNER & SELLER PORTAL • TEX VALLEY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-white">
              Client Panel Dashboard
            </h1>
            <p className="text-xs text-[#a09a8e] mt-1">
              Manage incoming menswear orders, assign Tex Valley master tailors, update alteration procedures, and dispatch shipments.
            </p>
          </div>

          <button
            onClick={refreshOrders}
            disabled={ordersLoading}
            className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 bg-[#15171f] hover:bg-[#1e212c] border border-[#2d303d] rounded-lg text-xs font-semibold text-[#e6d5b8] transition-all"
          >
            <RefreshCw size={14} className={ordersLoading ? 'animate-spin' : ''} />
            <span>Refresh Live Orders</span>
          </button>
        </div>

        {/* KPI SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#12141a] border border-[#242733] rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#a09a8e]">
              <span>Incoming / New</span>
              <Package size={16} className="text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-editorial text-white">{newCount}</p>
            <span className="text-[11px] text-amber-300">Awaiting owner review</span>
          </div>

          <div className="bg-[#12141a] border border-[#242733] rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#a09a8e]">
              <span>In Tailoring & QC</span>
              <Scissors size={16} className="text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-editorial text-white">{tailoringCount}</p>
            <span className="text-[11px] text-blue-300">Active at Tex Valley bench</span>
          </div>

          <div className="bg-[#12141a] border border-[#242733] rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#a09a8e]">
              <span>Ready / Dispatched</span>
              <Truck size={16} className="text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-editorial text-white">{readyCount}</p>
            <span className="text-[11px] text-emerald-300">Pickup or courier sent</span>
          </div>

          <div className="bg-[#12141a] border border-[#242733] rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#a09a8e]">
              <span>Total Order Value</span>
              <IndianRupee size={16} className="text-[#c5a880]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-editorial text-[#c5a880]">
              {formatPrice(totalRevenue)}
            </p>
            <span className="text-[11px] text-[#a09a8e]">Across {orders.length} total orders</span>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {['All', ...ORDER_STAGES].map(stage => (
            <button
              key={stage}
              onClick={() => setStatusFilter(stage)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                statusFilter === stage
                  ? 'bg-[#c5a880] text-[#0e0f12] border-[#c5a880] font-bold'
                  : 'bg-[#12141a] text-[#a09a8e] border-[#242733] hover:text-white'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* MAIN SPLIT WORKSPACE: ORDERS LIST (LEFT 6 COLS) + PROCEDURE PANEL (RIGHT 6 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: INCOMING ORDERS LIST */}
          <div className="lg:col-span-6 space-y-3">
            {filteredOrders.length === 0 ? (
              <div className="bg-[#12141a] border border-[#242733] rounded-xl p-10 text-center space-y-2.5">
                <Package size={30} className="text-[#c5a880] mx-auto opacity-80" />
                <p className="text-sm font-bold text-white">
                  {orders.length === 0 ? 'No Customer Orders Yet' : `No Orders in "${statusFilter}"`}
                </p>
                <p className="text-xs text-[#a09a8e] max-w-sm mx-auto leading-relaxed">
                  {orders.length === 0
                    ? 'Orders placed by logged-in customers will appear here automatically for tailoring and dispatch procedures.'
                    : 'Switch filter tabs or wait for new customer orders.'}
                </p>
              </div>
            ) : (
              filteredOrders.map(order => {
                const isSelected = selectedOrder?.id === order.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 ${
                      isSelected
                        ? 'bg-[#171a24] border-[#c5a880] shadow-xl'
                        : 'bg-[#12141a] border-[#232632] hover:border-[#3b3f52]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#c5a880]">{order.id}</span>
                        <h3 className="text-sm font-bold text-white">{order.customerName}</h3>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          STATUS_BADGE_STYLES[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs text-[#a09a8e] gap-2">
                      <span>
                        {order.items.reduce((s, i) => s + i.quantity, 0)} garment(s) &bull;{' '}
                        <strong className="text-white uppercase">{order.paymentMethod}</strong> &bull;{' '}
                        {order.deliveryType === 'pickup' ? 'Tex Valley Pickup' : `Delivery (${order.city})`}
                      </span>
                      <span className="text-sm font-bold text-white font-editorial">
                        {formatPrice(order.total)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#1e212b] flex items-center justify-between text-[11px] text-[#8c8982]">
                      <span>Tailor: <strong className="text-[#d1ccc4]">{order.assignedTailor}</strong></span>
                      {ORDER_STAGES.indexOf(order.status) < 4 && (
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleQuickAdvance(order);
                          }}
                          className="text-[#c5a880] hover:underline font-bold flex items-center space-x-1"
                        >
                          <span>Advance Stage</span>
                          <ArrowRight size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT: ORDER DETAILS & FURTHER PROCEDURES FORM */}
          <div className="lg:col-span-6">
            {selectedOrder ? (
              <div className="bg-[#12141a] border border-[#282b37] rounded-2xl p-6 shadow-2xl space-y-6 sticky top-24">
                <div className="flex items-start justify-between border-b border-[#222530] pb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#c5a880]">
                      ORDER PROCEDURE WORKSPACE
                    </span>
                    <h2 className="text-xl font-bold font-editorial text-white mt-0.5">
                      {selectedOrder.id} — {selectedOrder.customerName}
                    </h2>
                    <span className="text-[11px] text-[#8c8982]">
                      Placed: {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="p-2 rounded-lg bg-[#1a1d26] border border-[#2c303e] text-[#d1ccc4] hover:text-white"
                    title="Print Tailor / Dispatch Slip"
                  >
                    <Printer size={16} />
                  </button>
                </div>

                {/* CUSTOMER & DELIVERY INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#0e1015] p-4 rounded-xl border border-[#20232d]">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-[#a09a8e]">
                      <UserIcon size={13} className="text-[#c5a880]" />
                      <span className="text-white font-semibold">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[#a09a8e]">
                      <Phone size={13} className="text-[#c5a880]" />
                      <span>{selectedOrder.customerPhone}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-start space-x-1.5 text-[#a09a8e]">
                      <MapPin size={13} className="text-[#c5a880] shrink-0 mt-0.5" />
                      <span>
                        {selectedOrder.deliveryType === 'pickup'
                          ? 'Self Pickup at Tex Valley Mall Flagship'
                          : `${selectedOrder.address || ''}, ${selectedOrder.city || ''} - ${selectedOrder.pincode || ''}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ITEMS ORDERED */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#a09a8e] block">
                    Garments in Order ({selectedOrder.items.length})
                  </span>
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={`${item.sku}-${idx}`}
                        className="flex items-center justify-between bg-[#161922] p-3 rounded-lg border border-[#242733] text-xs"
                      >
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-[11px] text-[#a09a8e]">
                            Size: <strong className="text-[#e6d5b8]">{item.selectedSize}</strong> &bull; Color:{' '}
                            {item.selectedColorName} &bull; Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-[#c5a880] font-editorial">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 text-xs">
                    <span className="text-[#a09a8e]">
                      Payment: <strong className="text-white uppercase">{selectedOrder.paymentMethod}</strong>
                    </span>
                    <span className="text-base font-bold text-[#c5a880] font-editorial">
                      Total: {formatPrice(selectedOrder.total)}
                    </span>
                  </div>
                </div>

                {/* PROCEDURE UPDATE FORM */}
                <form onSubmit={handleSaveProcedure} className="space-y-4 pt-4 border-t border-[#222530]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#a09a8e] block mb-1">
                        Procedure Stage / Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={e => setEditStatus(e.target.value as OrderStatus)}
                        className="w-full bg-[#181a23] border border-[#2d303d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                      >
                        {ORDER_STAGES.map(stage => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-[#a09a8e] block mb-1">
                        Assigned Master Tailor / Desk
                      </label>
                      <select
                        value={editTailor}
                        onChange={e => setEditTailor(e.target.value)}
                        className="w-full bg-[#181a23] border border-[#2d303d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                      >
                        <option value="Unassigned (Queue)">Unassigned (Queue)</option>
                        <option value="Master Murugan (Tex Valley Suite)">Master Murugan (Tex Valley Suite)</option>
                        <option value="Master Selvam (Bespoke Bench)">Master Selvam (Bespoke Bench)</option>
                        <option value="Master Rajesh (Ethnic & Zari)">Master Rajesh (Ethnic & Zari)</option>
                        <option value="Tex Valley Dispatch Desk">Tex Valley Dispatch Desk</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a09a8e] block mb-1">
                      Estimated Ready / Delivery Time
                    </label>
                    <input
                      type="text"
                      value={editEta}
                      onChange={e => setEditEta(e.target.value)}
                      placeholder="e.g. Today, 5:30 PM"
                      className="w-full bg-[#181a23] border border-[#2d303d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#a09a8e] block mb-1">
                      Alteration & Procedure Notes
                    </label>
                    <textarea
                      rows={2}
                      value={editNotes}
                      onChange={e => setEditNotes(e.target.value)}
                      placeholder="Add sleeve/hem measurements, packing status, or courier tracking..."
                      className="w-full bg-[#181a23] border border-[#2d303d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 py-3 bg-[#c5a880] hover:bg-[#d8be98] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg"
                    >
                      <Save size={14} />
                      <span>{saving ? 'Saving...' : 'Save Procedure Update'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNotifyCustomerWhatsApp(selectedOrder)}
                      className="py-3 px-4 bg-[#1c2e22] hover:bg-[#233a2b] border border-[#2e593a] text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center space-x-2 transition-all"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp Customer</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-[#12141a] border border-[#242733] rounded-2xl p-10 text-center space-y-3">
                <Scissors size={30} className="text-[#c5a880] mx-auto opacity-75" />
                <h3 className="text-lg font-bold font-editorial text-white">
                  Order Procedure Workspace
                </h3>
                <p className="text-xs text-[#a09a8e] max-w-sm mx-auto leading-relaxed">
                  Select an incoming customer order to assign a Tex Valley master tailor, update tailoring status, and notify the customer.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
