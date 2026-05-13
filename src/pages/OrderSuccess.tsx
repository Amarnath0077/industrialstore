import { CheckCircle2, Package, ArrowRight, Home, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const { orderId, shippingAddress, estimate, items, status } = location.state || {};

  const getStatusProgress = () => {
    switch(status) {
      case 'pending_payment': return 'w-[20%]';
      case 'pending': return 'w-[50%]';
      case 'shipped': return 'w-[80%]';
      case 'delivered': return 'w-[100%]';
      default: return 'w-[20%]';
    }
  };

  const getStatusColor = () => {
    if (status === 'pending_payment') return 'bg-warning text-on-warning';
    return 'bg-primary text-on-primary';
  };

  const isStepActive = (step: string) => {
    switch(step) {
      case 'placed': return true;
      case 'confirmed': return ['pending', 'shipped', 'delivered'].includes(status);
      case 'shipped': return ['shipped', 'delivered'].includes(status);
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-container-lowest max-w-2xl w-full p-8 rounded-2xl shadow-xl border border-outline-variant text-center"
      >
        <div className="flex justify-center mb-6">
          <div className={`${status === 'pending_payment' ? 'bg-warning/10' : 'bg-primary/10'} p-4 rounded-full`}>
            {status === 'pending_payment' ? (
              <Clock className="w-16 h-16 text-warning" />
            ) : (
              <CheckCircle2 className="w-16 h-16 text-primary" />
            )}
          </div>
        </div>

        <h1 className={`text-3xl font-black ${status === 'pending_payment' ? 'text-warning' : 'text-primary'} mb-2 tracking-tighter`}>
          {status === 'pending_payment' ? 'Payment Pending (COD)' : 'Order Confirmed!'}
        </h1>
        <p className="text-on-surface-variant font-medium">
          {status === 'pending_payment' 
            ? 'Your order is placed. Please have the exact amount ready for Cash on Delivery.' 
            : 'Thank you for your purchase. Your industrial equipment is being prepared.'}
        </p>

        {/* Status Tracker */}
        <div className="mt-8 mb-6">
          <div className="relative flex items-center justify-between px-2">
            <div className="absolute left-0 right-0 h-0.5 bg-outline-variant top-1/2 -translate-y-1/2 z-0"></div>
            <div className={`absolute left-0 h-0.5 ${status === 'pending_payment' ? 'bg-warning' : 'bg-primary'} top-1/2 -translate-y-1/2 z-0 ${getStatusProgress()} transition-all duration-1000`}></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${getStatusColor()} flex items-center justify-center`}>
                {status === 'pending_payment' ? <Clock className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              </div>
              <span className={`text-[10px] font-black uppercase mt-2 ${status === 'pending_payment' ? 'text-warning' : 'text-primary'}`}>
                {status === 'pending_payment' ? 'Pending' : 'Placed'}
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${isStepActive('confirmed') ? 'bg-primary text-on-primary' : 'bg-surface-container border-2 border-outline-variant text-on-surface-variant'} flex items-center justify-center`}>
                <CheckCircle2 className={isStepActive('confirmed') ? "w-5 h-5" : "w-4 h-4"} />
              </div>
              <span className={`text-[10px] font-black uppercase mt-2 ${isStepActive('confirmed') ? 'text-primary' : 'text-on-surface-variant'}`}>Confirmed</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${isStepActive('shipped') ? 'bg-primary text-on-primary' : 'bg-surface-container border-2 border-outline-variant text-on-surface-variant'} flex items-center justify-center`}>
                <Package className={isStepActive('shipped') ? "w-5 h-5" : "w-4 h-4"} />
              </div>
              <span className={`text-[10px] font-black uppercase mt-2 ${isStepActive('shipped') ? 'text-primary' : 'text-on-surface-variant'}`}>Shipped</span>
            </div>
          </div>
        </div>

        <div className="my-8 p-6 bg-surface-container rounded-xl border border-outline-variant text-left space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Order ID</span>
            <span className="font-mono text-sm font-bold">#{orderId || 'IS-' + Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Shipping To</p>
            <p className="text-sm font-bold text-on-surface">{shippingAddress?.fullName || 'Valued Customer'}</p>
            <p className="text-xs text-on-surface-variant italic">
              {shippingAddress?.street}, {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zip}
            </p>
          </div>

          <div className="flex items-start gap-3 pt-4 border-t border-outline-variant">
            <Package className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-widest">Delivery Estimate</p>
              <p className="text-sm font-bold text-on-surface">{estimate || '3-5 Business Days'}</p>
            </div>
          </div>

          {items && items.length > 0 && (
            <div className="pt-4 border-t border-outline-variant">
               <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Ordered Items</p>
               <div className="space-y-3">
                 {items.map((item: any) => (
                   <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded border border-outline-variant p-1 shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-on-surface truncate">{item.title}</p>
                        <p className="text-[10px] text-on-surface-variant">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-black text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            Continue Shopping
          </Link>
          <Link 
            to="/history"
            className="flex items-center justify-center gap-2 bg-surface-container border border-outline-variant text-on-surface py-3 rounded-lg font-bold text-sm hover:bg-surface-container-high transition-all"
          >
            View Orders
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
          A confirmation email has been sent to your inbox.
        </p>
      </motion.div>
    </div>
  );
}
