import { Lock, Plus, ShieldCheck, HelpCircle, Undo2, Loader2, MapPin, AlertCircle, Save, User as UserIcon, Banknote } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../lib/AuthContext';
import { dbService } from '../lib/dbService';
import { CartItem } from '../lib/types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default function Checkout() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [shippingOption, setShippingOption] = useState('std');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveAddress, setSaveAddress] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    fullName: '',
    street: '',
    city: '',
    state: 'IL',
    zip: '',
    phone: ''
  });

  useEffect(() => {
    let unsubscribeFn: any;
    
    const loadData = async () => {
      try {
        if (user) {
          const addr = await dbService.getAddresses(user.uid);
          setSavedAddresses(addr || []);
        } else {
          setSavedAddresses([]);
        }
        
        unsubscribeFn = dbService.getCartItems(user?.uid || null, (cartItems) => {
          setItems(cartItems);
          setLoading(false);
        });
      } catch (err) {
        console.error("Failed to load checkout data:", err);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      if (typeof unsubscribeFn === 'function') unsubscribeFn();
    };
  }, [user]);

  const selectSavedAddress = (addr: any) => {
    setFormData({
      fullName: addr.fullName,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      phone: addr.phone
    });
  };

  const deliveryOptions = [
    { id: 'std', title: 'Standard (3-5 days)', desc: 'FREE Shipping for IndustrialStore Members', price: 0 },
    { id: 'exp', title: 'Expedited (2 days)', desc: '$14.99 - Guaranteed Delivery', price: 14.99 },
    { id: 'next', title: 'Next Day Air', desc: '$29.99 - Next business day by 5PM', price: 29.99 }
  ];

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCharge = deliveryOptions.find(o => o.id === shippingOption)?.price || 0;
  const taxRate = paymentMethod === 'pro' ? 0 : 0.06;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCharge + tax;

  const handlePlaceOrder = async () => {
    if (!user || items.length === 0) return;
    
    // Validation
    if (!formData.fullName || !formData.street || !formData.city || !formData.zip) {
      alert("Please fill in all shipping details.");
      return;
    }

    setPlacing(true);
    
    // Safety timeout: If it takes more than 15s, reset placing state
    const processTimeout = setTimeout(() => {
      setPlacing(false);
      console.warn("Checkout operation timed out.");
    }, 15000);

    try {
      // 1. Save address if requested (Non-blocking)
      if (saveAddress && !savedAddresses.some(a => a.street === formData.street)) {
        dbService.addAddress(user.uid, formData).catch(err => console.warn("Background address save failed", err));
      }

      // 2. Stripe Checkout (if Card is selected)
      if (paymentMethod === 'card') {
        if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
          throw new Error("Stripe Publishable Key is missing. Please use Cash on Delivery or Pro Account for testing.");
        }

        const stripe = await stripePromise;
        if (!stripe) throw new Error("Stripe failed to load. Check your internet connection.");

        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(i => ({ title: i.title, price: i.price, quantity: i.quantity, img: i.img })),
            successUrl: `${window.location.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/checkout`,
          }),
        });

        if (!response.ok) {
           const errorData = await response.json().catch(() => ({}));
           throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const session = await response.json();
        if (session.error) throw new Error(session.error);

        // Clear timeout as we are redirecting away
        clearTimeout(processTimeout);

        if (session.url) {
          clearTimeout(processTimeout);
          setPlacing(false);
          setCheckoutUrl(session.url);

          // Attempt automatic redirect in new tab
          try {
            const stripeTab = window.open(session.url, '_blank', 'noopener,noreferrer');
            if (stripeTab) {
              // Redirected successfully in new tab
              return;
            }
          } catch (err) {
            console.warn("Popup blocked or failed:", err);
          }
          
          // If we are here, automatic redirect didn't work (popup blocked)
          // The UI will show the checkoutUrl button due to state change
          return;
        }

        // Fallback for older sessions or misconfigured backends
        const result = await (stripe as any).redirectToCheckout({ sessionId: session.id });
        if (result.error) throw new Error(result.error.message);
        return;
      }

      // 3. Place Order (COD, Pro, or others)
      const selectedShipping = deliveryOptions.find(o => o.id === shippingOption);
      const paymentLabel = 
        paymentMethod === 'pro' ? 'Business Line of Credit' : 
        paymentMethod === 'cod' ? 'Cash on Delivery' : 
        'PayPal';

      const orderPayload: any = {
        items,
        subtotal,
        tax,
        total,
        shippingAddress: formData,
        deliveryOption: selectedShipping?.title || 'Standard',
        paymentMethod: paymentLabel,
        status: paymentMethod === 'cod' ? 'pending_payment' : 'pending'
      };

      const orderId = await dbService.placeOrder(user.uid, orderPayload);
      
      clearTimeout(processTimeout);

      navigate('/order-success', { 
        replace: true, // Use replace for better navigation flow
        state: { 
          orderId, 
          total, 
          shippingAddress: formData,
          estimate: selectedShipping?.title || 'Standard',
          items: items,
          status: paymentMethod === 'cod' ? 'pending_payment' : 'pending'
        } 
      });
    } catch (error: any) {
      clearTimeout(processTimeout);
      console.error("Checkout failed:", error);
      alert(error.message || "There was an error processing your checkout. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
          <p className="text-sm font-bold text-on-surface-variant animate-pulse lowercase tracking-widest">Initialising checkout...</p>
        </div>
      </div>
    );
  }

  if (checkoutUrl) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-container-lowest border border-outline-variant p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-black text-primary mb-2 tracking-tight">One Last Step</h2>
          <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
            Stripe's secure payment system must open in a new window to protect your data. Click the button below to complete your order.
          </p>
          <a 
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-on-primary py-4 px-8 rounded-xl font-black text-lg shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Open Stripe Payment
          </a>
          <button 
            onClick={() => setCheckoutUrl(null)}
            className="mt-6 text-xs font-bold text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
          >
            ← Back to Checkout
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-primary-container text-on-primary-container border-b border-outline-variant fixed top-0 w-full z-50">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-black text-on-primary tracking-tighter">
              IndustrialStore
            </Link>
            <span className="text-on-primary-container font-medium border-l border-on-primary-container pl-4">
              Checkout
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-on-primary-container" />
            <span className="text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary tracking-tight">1. Shipping Address</h2>
              </div>

              {savedAddresses.length > 0 && (
                <div className="mb-8 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Your Saved Addresses</p>
                  <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        onClick={() => selectSavedAddress(addr)}
                        className={`shrink-0 text-left p-3 border rounded-md transition-all w-[240px] ${
                          formData.street === addr.street ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-outline'
                        }`}
                      >
                        <p className="font-bold text-xs">{addr.fullName}</p>
                        <p className="text-[10px] text-on-surface-variant line-clamp-1">{addr.street}</p>
                        <p className="text-[10px] text-on-surface-variant">{addr.city}, {addr.state} {addr.zip}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold mb-1 uppercase tracking-widest text-on-surface-variant">Full Name</label>
                  <input 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full border border-outline-variant rounded p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                    placeholder="Enter full name" type="text"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold mb-1 uppercase tracking-widest text-on-surface-variant">Street Address</label>
                  <input 
                    value={formData.street}
                    onChange={(e) => setFormData({...formData, street: e.target.value})}
                    className="w-full border border-outline-variant rounded p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                    placeholder="Street and house number" type="text"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold mb-1 uppercase tracking-widest text-on-surface-variant">City</label>
                  <input 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full border border-outline-variant rounded p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                    placeholder="City" type="text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold mb-1 uppercase tracking-widest text-on-surface-variant">State</label>
                    <select 
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="w-full border border-outline-variant rounded p-2.5 text-sm bg-white cursor-pointer outline-none"
                    >
                      {['IL', 'NY', 'TX', 'CA', 'WA', 'FL'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold mb-1 uppercase tracking-widest text-on-surface-variant">ZIP</label>
                    <input 
                      value={formData.zip}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                      className="w-full border border-outline-variant rounded p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                      placeholder="ZIP" type="text"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold mb-1 uppercase tracking-widest text-on-surface-variant">Phone Number</label>
                  <input 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-outline-variant rounded p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                    placeholder="For delivery updates" type="tel"
                  />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                   <input 
                    id="save-addr"
                    type="checkbox" 
                    checked={saveAddress} 
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                   />
                   <label htmlFor="save-addr" className="text-xs font-bold text-on-surface-variant cursor-pointer flex items-center gap-1">
                     <ShieldCheck className="w-3 h-3" />
                     Save this address for legacy use
                   </label>
                </div>
              </form>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg"
            >
              <h2 className="text-xl font-bold text-primary mb-6 tracking-tight">2. Delivery Options</h2>
              <div className="space-y-3">
                {deliveryOptions.map(opt => (
                  <label key={opt.id} className="flex items-start gap-4 p-4 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
                    <input 
                      checked={shippingOption === opt.id}
                      onChange={() => setShippingOption(opt.id)}
                      className="mt-1 text-primary focus:ring-primary w-4 h-4" 
                      name="shipping" 
                      type="radio"
                    />
                    <div>
                      <span className="block font-bold text-sm tracking-tight">{opt.title}</span>
                      <span className="block text-xs text-on-surface-variant mt-1">{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg"
            >
              <h2 className="text-xl font-bold text-primary mb-6 tracking-tight">3. Payment Method</h2>
              <div className="space-y-4">
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`border ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:bg-surface-container-low'} p-4 rounded-lg flex items-center justify-between transition-all cursor-pointer`}
                >
                   <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                    <input checked={paymentMethod === 'card'} readOnly className="text-primary w-4 h-4" name="payment" type="radio" />
                    Credit or Debit Card
                    <span className="ml-2 text-[10px] text-on-surface-variant font-normal">(Secured by Stripe)</span>
                  </label>
                </div>
                
                <div 
                  onClick={() => setPaymentMethod('pro')}
                  className={`border ${paymentMethod === 'pro' ? 'border-secondary bg-secondary/5' : 'border-outline-variant hover:bg-surface-container-low'} p-4 rounded-lg flex items-center justify-between transition-all cursor-pointer`}
                >
                  <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                    <input checked={paymentMethod === 'pro'} readOnly className="text-primary w-4 h-4" name="payment" type="radio" />
                    Business Line of Credit
                  </label>
                  <span className="bg-primary text-on-primary text-[10px] font-black px-2 py-1 rounded-sm uppercase">PRO USER</span>
                </div>

                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`border ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:bg-surface-container-low'} p-4 rounded-lg flex items-center justify-between transition-all cursor-pointer`}
                >
                  <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                    <input checked={paymentMethod === 'cod'} readOnly className="text-primary w-4 h-4" name="payment" type="radio" />
                    <div className="flex items-center gap-2">
                       <Banknote className="w-5 h-5 text-success" />
                       <span>Cash on Delivery (COD)</span>
                    </div>
                  </label>
                  <span className="text-[10px] text-on-surface-variant font-bold">Standard Delivery only</span>
                </div>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg"
            >
              <h2 className="text-xl font-bold text-primary mb-6 tracking-tight">4. Review Items</h2>
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-6 pb-6 border-b border-outline-variant last:border-0 last:pb-0">
                    <div className="w-20 h-20 bg-surface-container-high rounded overflow-hidden p-2 flex-shrink-0">
                      <img className="w-full h-full object-contain mix-blend-multiply" src={item.img} alt={item.title} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-primary line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-on-surface-variant mt-1">Quantity: {item.quantity}</p>
                      <p className="text-sm font-black mt-1">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-4">
            <aside className="sticky top-24">
              <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold text-primary mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Shipping:</span>
                    <span className="font-medium">${shippingCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-outline-variant">
                    <span className="text-on-surface-variant">Tax ({paymentMethod === 'pro' ? 'Exempt' : '6%'}):</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-secondary pt-3">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                {!user ? (
                  <button 
                    onClick={login}
                    className="w-full mt-8 bg-primary text-on-primary py-4 font-black text-base rounded shadow hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <UserIcon className="w-5 h-5" />
                    Sign in to Complete Purchase
                  </button>
                ) : (
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={placing || items.length === 0}
                    className="w-full mt-8 bg-secondary-container text-on-secondary-fixed py-4 font-black text-base rounded shadow hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {placing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                    {placing ? 'Processing...' : (
                      paymentMethod === 'card' ? 'Pay with Stripe' : 
                      paymentMethod === 'cod' ? 'Confirm COD Order' : 
                      'Complete Order'
                    )}
                  </button>
                )}
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <ShieldCheck className="w-5 h-5 opacity-60" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Safe & Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Undo2 className="w-5 h-5 opacity-60" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">30-Day Easy Returns</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
