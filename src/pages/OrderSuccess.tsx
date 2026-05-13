import { CheckCircle2, Package, ArrowRight, Home, Clock, Printer, Download, Truck, ShieldCheck, Mail, Phone, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { dbService } from '../lib/dbService';
import { useAuth } from '../lib/AuthContext';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stripeData, setStripeData] = useState<any>(null);
  const orderSaved = useRef(false);
  
  const sessionId = searchParams.get('session_id');
  const { orderId, shippingAddress, estimate, items, status, total: stateTotal } = location.state || {};

  useEffect(() => {
    if (sessionId && user && !orderSaved.current) {
      const fetchSessionAndSave = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/get-checkout-session/${sessionId}`);
          if (response.ok) {
            const data = await response.json();
            setStripeData(data);
            
            // Save Stripe order to DB
            const stripeItems = data.line_items?.data.map((li: any) => ({
              id: li.id,
              title: li.description,
              quantity: li.quantity,
              price: li.price.unit_amount / 100,
              img: li.price.product?.images?.[0] || 'https://picsum.photos/seed/elec/200/200',
              addedAt: new Date()
            })) || [];

            const addr = data.customer_details?.address || {};
            const payload = {
              items: stripeItems,
              total: data.amount_total / 100,
              subtotal: (data.amount_total / 100) * 0.94, // Estimation
              tax: (data.amount_total / 100) * 0.06,
              shippingAddress: {
                fullName: data.customer_details?.name || 'Customer',
                street: addr.line1 || 'Stripe Address',
                city: addr.city || '',
                state: addr.state || '',
                zip: addr.postal_code || '',
                phone: data.customer_details?.phone || ''
              },
              deliveryOption: 'Standard',
              paymentMethod: 'Credit Card (Stripe)',
              status: 'pending' as const,
              stripeSessionId: sessionId
            };

            await dbService.placeOrder(user.uid, payload);
            orderSaved.current = true;
          }
        } catch (err) {
          console.error("Failed to fetch/save Stripe session:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchSessionAndSave();
    }
  }, [sessionId, user]);

  const displayOrderId = orderId || sessionId || 'IS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const displayItems = stripeData?.line_items?.data.map((li: any) => ({
    id: li.id,
    title: li.description,
    quantity: li.quantity,
    price: li.price.unit_amount / 100,
    img: li.price.product?.images?.[0] || 'https://picsum.photos/seed/elec/200/200'
  })) || items || [];
  
  const displayTotal = stripeData?.amount_total ? stripeData.amount_total / 100 : stateTotal || 0;
  const displayAddress = stripeData?.customer_details?.address || shippingAddress;
  const displayStatus = stripeData ? 'paid' : status || 'pending';

  const getStatusProgress = () => {
    switch(displayStatus) {
      case 'pending_payment': return 'w-[15%]';
      case 'pending': return 'w-[40%]';
      case 'paid': return 'w-[60%]';
      case 'shipped': return 'w-[80%]';
      case 'delivered': return 'w-[100%]';
      default: return 'w-[15%]';
    }
  };

  const isStepActive = (step: string) => {
    switch(step) {
      case 'placed': return true;
      case 'confirmed': return ['pending', 'paid', 'shipped', 'delivered'].includes(displayStatus);
      case 'shipped': return ['shipped', 'delivered'].includes(displayStatus);
      case 'delivered': return displayStatus === 'delivered';
      default: return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F1F3] flex items-center justify-center">
        <div className="text-center group">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <Loader2 className="w-20 h-20 text-primary animate-spin" />
            <Package className="w-8 h-8 text-primary/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
          </div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant animate-pulse">Syncing Procurement Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F1F3] flex items-start justify-center p-4 pt-12 md:pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-6 mb-12"
      >
        {/* Header Section */}
        <div className="bg-white border-b-4 border-primary p-8 rounded-t-xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-xl ${displayStatus === 'pending_payment' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'}`}>
                {displayStatus === 'pending_payment' ? (
                  <Clock className="w-12 h-12" />
                ) : (
                  <CheckCircle2 className="w-12 h-12" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-black text-primary tracking-tighter uppercase leading-none">
                  {displayStatus === 'pending_payment' ? 'Payment Pending' : 'Order Secured'}
                </h1>
                <p className="text-on-surface-variant font-mono text-xs mt-2 uppercase tracking-widest font-bold">
                  Receipt ID: <span className="text-on-surface">{displayOrderId}</span>
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface-container border border-outline-variant px-4 py-2 rounded font-bold text-xs uppercase tracking-wider hover:bg-surface-container-high transition-colors">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface-container border border-outline-variant px-4 py-2 rounded font-bold text-xs uppercase tracking-wider hover:bg-surface-container-high transition-colors">
                <Download className="w-4 h-4" />
                Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Industrial Status Tracker */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-10 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Logistic Pipeline Status
          </h2>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-0 right-0 h-1 bg-surface-container-high top-4 -translate-y-1/2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: getStatusProgress() }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className={`h-full ${displayStatus === 'pending_payment' ? 'bg-warning' : 'bg-primary'} shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]`}
              />
            </div>
            
            <div className="relative flex justify-between">
              {[
                { id: 'placed', label: displayStatus === 'pending_payment' ? 'Pending' : 'Placed', icon: Clock },
                { id: 'confirmed', label: 'Processing', icon: CheckCircle2 },
                { id: 'shipped', label: 'Deployment', icon: Package },
                { id: 'delivered', label: 'Received', icon: Truck }
              ].map((step, idx) => {
                const active = isStepActive(step.id);
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex flex-col items-center gap-3">
                    <div className={`w-8 h-8 rounded-sm rotate-45 border-2 flex items-center justify-center transition-all duration-500 z-10 ${
                      active 
                        ? (displayStatus === 'pending_payment' && idx === 0 ? 'bg-warning border-warning text-on-warning' : 'bg-primary border-primary text-on-primary shadow-lg') 
                        : 'bg-white border-outline-variant text-on-surface-variant'
                    }`}>
                      <Icon className={`w-4 h-4 -rotate-45 ${active ? 'scale-110' : 'scale-90'}`} />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider transition-colors duration-500 ${
                      active ? 'text-on-surface' : 'text-on-surface-variant/40'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logistic & Dispatch Info */}
          <div className="lg:col-span-2 space-y-6 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Dispatch Details</h3>
                <span className="bg-secondary/10 text-secondary text-[10px] font-black px-2 py-1 rounded border border-secondary/20">PRIORITY FREIGHT</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Facility Destination</h4>
                    <p className="text-sm font-bold text-on-surface">{(displayAddress as any)?.fullName || (displayAddress as any)?.name || 'Valued Customer'}</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {(displayAddress as any)?.street || (displayAddress as any)?.line1}<br />
                      {(displayAddress as any)?.city}, {(displayAddress as any)?.state} {(displayAddress as any)?.zip || (displayAddress as any)?.postal_code}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Site Contact</h4>
                    <p className="text-xs font-bold text-on-surface">{(displayAddress as any)?.phone || 'Reflected in order manifest'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-surface-container/50 p-4 rounded-lg border border-outline-variant/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Estimated Arrival</h4>
                        <p className="text-sm font-black text-primary">{estimate || '3-5 Business Days'}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-on-surface-variant italic">Full tracking link will be active within 24 operational hours.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-success shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Industrial Warranty</h4>
                      <p className="text-[10px] text-on-surface-variant">All components are covered by our 24-month operational guarantee.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Manifest */}
              <div className="mt-10 pt-8 border-t-2 border-dashed border-outline-variant">
                <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-6 flex items-center justify-between">
                  Inventory Manifest
                  <span className="text-[10px] font-normal lowercase opacity-50 font-mono">({displayItems?.length || 0} units)</span>
                </h3>
                <div className="space-y-4">
                  {displayItems?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white border border-outline-variant p-2 rounded flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                        <img src={item.img} alt={item.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-xs font-black text-on-surface truncate group-hover:text-primary transition-colors">{item.title}</p>
                        <p className="text-[10px] font-mono font-bold text-on-surface-variant">QTY: {item.quantity} × UNIT_PRICE: ${item.price.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-on-surface font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-outline-variant flex justify-between items-center bg-surface-container/30 -mx-8 px-8 py-4 mt-6">
                    <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Manifest Valuation</span>
                    <span className="text-xl font-black text-primary font-mono">${displayTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions & Support */}
          <div className="space-y-6 text-center">
            <div className="bg-primary p-6 rounded-xl shadow-lg shadow-primary/20 text-on-primary">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Post-Purchase Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="w-full flex items-center justify-center gap-2 bg-on-primary text-primary py-3 rounded font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                >
                  <Home className="w-4 h-4" />
                  Inventory Portal
                </Link>
                <Link 
                  to="/history"
                  className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container border border-on-primary/20 py-3 rounded font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                >
                  Track Shipments
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] opacity-80 border-t border-on-primary/20 pt-4">
                Transmission complete. A protocol record has been dispatched to your primary email address.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant text-left">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Technical Support</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center bg-surface-container group-hover:bg-primary/5 group-hover:border-primary transition-colors">
                    <Mail className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-on-surface-variant leading-none uppercase">Email Control</p>
                    <p className="text-xs font-bold text-on-surface">ops@industrialstore.io</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center bg-surface-container group-hover:bg-primary/5 group-hover:border-primary transition-colors">
                    <Phone className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-on-surface-variant leading-none uppercase">Priority Line</p>
                    <p className="text-xs font-bold text-on-surface">+1 (800) 555-SPEC</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant">
                  <a href="#" className="flex items-center justify-between text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                    Installation Guides
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

