import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MENS_IMAGES } from '../assets/mensImages';
import {
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  ShoppingBag
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const {
    login,
    register,
    loginIntent,
    setLoginIntent,
    loginRoleTab,
    setLoginRoleTab,
    setActivePage,
    setIsCheckoutOpen,
    currentUser
  } = useShop();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSuccessRedirect = (role: 'customer' | 'seller') => {
    if (role === 'seller') {
      setLoginIntent(null);
      setActivePage('client-panel');
      return;
    }

    if (loginIntent === 'checkout') {
      setLoginIntent(null);
      setActivePage('shop');
      setIsCheckoutOpen(true);
      return;
    }

    setLoginIntent(null);
    setActivePage('home');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (authMode === 'login' || loginRoleTab === 'seller') {
      const res = await login(email, password, loginRoleTab);
      setSubmitting(false);
      if (!res.success || !res.user) {
        setError(res.error || 'Invalid credentials.');
        return;
      }
      handleSuccessRedirect(res.user.role);
    } else {
      const res = await register(name, email, phone, password);
      setSubmitting(false);
      if (!res.success || !res.user) {
        setError(res.error || 'Could not create account.');
        return;
      }
      handleSuccessRedirect(res.user.role);
    }
  };

  const handleCustomerDemoLogin = async () => {
    setError(null);
    setAuthMode('login');
    setLoginRoleTab('customer');
    setEmail('karthik@eromen.in');
    setPassword('customer123');
    setSubmitting(true);
    const res = await login('karthik@eromen.in', 'customer123', 'customer');
    setSubmitting(false);
    if (res.success && res.user) {
      handleSuccessRedirect(res.user.role);
    } else {
      setError(res.error || 'Demo sign in failed.');
    }
  };

  return (
    <section className="w-full min-h-[85vh] bg-[#0a0b0e] py-10 sm:py-16 px-4 sm:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-[#12141a] border border-[#262934] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT EDITORIAL MEN'S SHOWCASE (5 COLS) */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-8 bg-[#0e1015] overflow-hidden">
          <img
            src={MENS_IMAGES.heroSuit}
            alt="EROMEN Men's Bespoke Atelier"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top brightness-[0.42] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/55 to-transparent" />

          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c5a880] flex items-center space-x-1.5">
              <Sparkles size={12} />
              <span>EXCLUSIVELY FOR GENTLEMEN</span>
            </span>
            <h2 className="text-3xl font-bold font-editorial text-white">
              ERO<span className="text-[#c5a880]">MEN</span> Atelier
            </h2>
          </div>

          <div className="relative z-10 space-y-4">
            <p className="text-sm font-editorial italic text-[#e6d5b8] leading-relaxed">
              "Guests are welcome to explore our entire catalog freely. Sign in to unlock order placement, bespoke alteration tracking, and VIP Tex Valley store pickup."
            </p>
            <div className="space-y-2 text-xs text-[#d1ccc4]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-[#c5a880]" />
                <span>Track tailoring & alteration status in real time</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-[#c5a880]" />
                <span>Reserve Express 2-hour pickup at Tex Valley</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-[#c5a880]" />
                <span>Restricted Owner Panel for store order procedures</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AUTH FORM PANEL (7 COLS) */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
          {/* ORDER GATING NOTICE WHEN REDIRECTED */}
          {loginIntent === 'checkout' && (
            <div className="bg-[#1b1812] border border-[#c5a880]/50 rounded-xl p-3.5 flex items-start space-x-3 text-xs">
              <ShoppingBag size={18} className="text-[#c5a880] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#e6d5b8] block">
                  Login Required to Place Order
                </span>
                <p className="text-[#b8b1a3] mt-0.5">
                  Visitors can browse freely, and verified members can place orders. Sign in below to continue directly to your checkout.
                </p>
              </div>
            </div>
          )}

          {/* ALREADY SIGNED IN NOTICE */}
          {currentUser && (
            <div className="bg-[#132018] border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between text-xs">
              <div>
                <span className="text-emerald-300 font-bold block">
                  Signed in as {currentUser.name} ({currentUser.role === 'seller' ? 'OWNER' : 'CUSTOMER'})
                </span>
                <span className="text-[#a09a8e]">You can switch accounts below if needed.</span>
              </div>
              <button
                onClick={() =>
                  setActivePage(currentUser.role === 'seller' ? 'client-panel' : 'shop')
                }
                className="px-3 py-1.5 bg-[#c5a880] text-[#0e0f12] font-bold rounded uppercase text-[10px]"
              >
                Continue
              </button>
            </div>
          )}

          {/* ROLE SWITCHER: CUSTOMER VS OWNER/SELLER */}
          <div className="grid grid-cols-2 gap-2 bg-[#0c0d11] p-1.5 rounded-xl border border-[#222530]">
            <button
              type="button"
              onClick={() => {
                setLoginRoleTab('customer');
                setError(null);
              }}
              className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                loginRoleTab === 'customer'
                  ? 'bg-[#c5a880] text-[#0e0f12] shadow-md'
                  : 'text-[#a09a8e] hover:text-white'
              }`}
            >
              <UserIcon size={14} />
              <span>Customer Account</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginRoleTab('seller');
                setAuthMode('login');
                setEmail('');
                setPassword('');
                setError(null);
              }}
              className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                loginRoleTab === 'seller'
                  ? 'bg-[#c5a880] text-[#0e0f12] shadow-md'
                  : 'text-[#a09a8e] hover:text-white'
              }`}
            >
              <LayoutDashboard size={14} />
              <span>Owner / Seller Panel</span>
            </button>
          </div>

          {/* TITLE & SUBTITLE */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
              {loginRoleTab === 'seller'
                ? 'Owner & Seller Client Panel Login'
                : authMode === 'login'
                ? 'Member Sign In'
                : 'Create Gentleman Account'}
            </h1>
            <p className="text-xs text-[#a09a8e]">
              {loginRoleTab === 'seller'
                ? 'Restricted access: Enter the authorized EROMEN owner email and password to view and manage customer orders.'
                : authMode === 'login'
                ? 'Sign in to place orders, book Tex Valley pickups, and track alterations.'
                : 'Register once for instant checkout and tailoring updates.'}
            </p>
          </div>

          {/* ERROR BANNER */}
          {error && (
            <div className="p-3 bg-[#261416] border border-[#702a30] rounded-lg flex items-center space-x-2 text-xs text-[#f28b82]">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* AUTH FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && loginRoleTab === 'customer' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#a09a8e] block mb-1">Full Name *</label>
                  <div className="relative">
                    <UserIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#787a82]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Rajesh Kannan"
                      className="w-full bg-[#171922] border border-[#2b2e3b] rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#a09a8e] block mb-1">WhatsApp / Phone *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#787a82]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98427 00000"
                      className="w-full bg-[#171922] border border-[#2b2e3b] rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] text-[#a09a8e] block mb-1">
                {loginRoleTab === 'seller' ? 'Owner Email Address *' : 'Email Address *'}
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#787a82]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={loginRoleTab === 'seller' ? 'Enter authorized owner email' : 'karthik@eromen.in'}
                  className="w-full bg-[#171922] border border-[#2b2e3b] rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#a09a8e] block mb-1">
                {loginRoleTab === 'seller' ? 'Owner Password *' : 'Password *'}
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#787a82]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#171922] border border-[#2b2e3b] rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#686a74] focus:outline-none focus:border-[#c5a880]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d8be98] disabled:opacity-50 text-[#0e0f12] text-xs font-bold uppercase tracking-[0.2em] rounded-lg flex items-center justify-center space-x-2 transition-all shadow-xl"
            >
              <span>
                {submitting
                  ? 'Verifying...'
                  : loginRoleTab === 'seller'
                  ? 'Access Client Panel Dashboard'
                  : authMode === 'login'
                  ? 'Sign In & Continue'
                  : 'Register & Continue'}
              </span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* SWITCH BETWEEN LOGIN AND REGISTER (FOR CUSTOMER TAB) */}
          {loginRoleTab === 'customer' && (
            <>
              <div className="text-center text-xs text-[#a09a8e]">
                {authMode === 'login' ? (
                  <>
                    New to EROMEN?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setError(null);
                      }}
                      className="text-[#c5a880] font-bold hover:underline"
                    >
                      Create a Customer Account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setError(null);
                      }}
                      className="text-[#c5a880] font-bold hover:underline"
                    >
                      Sign In Here
                    </button>
                  </>
                )}
              </div>

              {/* CUSTOMER DEMO SIGN-IN FOR QUICK TESTING */}
              <div className="pt-5 border-t border-[#222530] space-y-2.5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#787a82] font-bold">
                  <span>Customer Quick Demo Login</span>
                  <ShieldCheck size={13} className="text-[#c5a880]" />
                </div>

                <button
                  type="button"
                  onClick={handleCustomerDemoLogin}
                  className="w-full p-3 rounded-xl bg-[#161822] hover:bg-[#1e212e] border border-[#2a2d3a] hover:border-[#c5a880] text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#c5a880] uppercase block">
                      Demo Customer Account
                    </span>
                    <span className="text-xs text-white font-mono block mt-0.5">
                      karthik@eromen.in &bull; Pass: customer123
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#c5a880]">Sign In &rarr;</span>
                </button>
              </div>
            </>
          )}

          {loginRoleTab === 'seller' && (
            <div className="pt-4 border-t border-[#222530] flex items-center space-x-2 text-[11px] text-[#8c8982]">
              <ShieldCheck size={14} className="text-[#c5a880] shrink-0" />
              <span>
                Owner Panel is strictly locked to the registered store owner email and password.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
