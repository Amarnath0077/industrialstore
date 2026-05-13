import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { dbService } from '../lib/dbService';
import { Order } from '../lib/types';
import { motion } from 'motion/react';
import { Package, ChevronRight, Clock, MapPin, ExternalLink, Loader2, AlertTriangle, ShoppingBag, Banknote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Orders() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const userOrders = await dbService.getUserOrders(user.uid);
        // Sort by date descending
        const sorted = userOrders.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
        setOrders(sorted);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError("Failed to load your order history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user && !loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-surface-container p-12 rounded-2xl border border-outline-variant inline-block mb-8 shadow-xl">
          <ShoppingBag className="w-16 h-16 text-primary mx-auto mb-6 opacity-20" />
          <h1 className="text-3xl font-black tracking-tight mb-4 text-on-surface">Your Orders</h1>
          <p className="text-on-surface-variant max-w-sm mx-auto mb-8">
            Sign in to view your order history, track shipments, and manage returns.
          </p>
          <button 
            onClick={login}
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg"
          >
            Sign in to your account
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-on-surface-variant font-medium animate-pulse">Retrieving your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight">Your Orders</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Manage your recent purchases and technical equipment acquisitions.
          </p>
        </div>
        <div className="hidden sm:block">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search all orders" 
                    className="bg-surface-container-high border border-outline-variant rounded-md py-1.5 px-4 text-sm w-64 focus:ring-1 focus:ring-primary outline-none"
                />
            </div>
        </div>
      </div>

      {error ? (
        <div className="bg-error/5 border border-error/20 p-6 rounded-xl flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-error shrink-0" />
          <div>
            <h3 className="font-bold text-error">Could not load history</h3>
            <p className="text-sm text-error/80 mt-1">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-xs font-bold underline text-error hover:no-underline"
            >
              Try refreshing the page
            </button>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border-2 border-dashed border-outline-variant">
          <Package className="w-16 h-16 text-on-surface-variant/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-on-surface">No orders found</h3>
          <p className="text-on-surface-variant mt-2 max-w-xs mx-auto mb-8">
            You haven't placed any orders yet. Visit our shop to find industrial products.
          </p>
          <Link 
            to="/" 
            className="text-primary font-black text-sm uppercase tracking-wider hover:underline"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden"
            >
              <div className="bg-surface-container px-6 py-4 border-b border-outline-variant flex flex-wrap gap-y-4 items-center justify-between text-xs sm:text-sm">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest mb-1">Order Placed</p>
                    <p className="font-bold text-on-surface">
                      {order.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest mb-1">Total</p>
                    <p className="font-bold text-on-surface">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest mb-1">Ship To</p>
                    <p className="font-bold text-primary cursor-default group relative">
                      {order.shippingAddress.fullName}
                      <span className="absolute left-0 top-full mt-2 hidden group-hover:block bg-on-surface text-surface text-[10px] p-2 rounded shadow-xl whitespace-nowrap z-10">
                        {order.shippingAddress.street}, {order.shippingAddress.city}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest mb-1">Order #{order.id.slice(-8).toUpperCase()}</p>
                  <div className="flex gap-4">
                    <button className="text-primary font-medium hover:underline">View order details</button>
                    <span className="text-outline">|</span>
                    <button className="text-primary font-medium hover:underline">Invoice</button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  {order.status === 'delivered' ? (
                    <div className="flex items-center gap-2 text-success font-black text-lg">
                      <Package className="w-5 h-5" />
                      Delivered
                    </div>
                  ) : order.status === 'pending_payment' ? (
                    <div className="flex items-center gap-2 text-warning font-black text-lg">
                      <Banknote className="w-5 h-5" />
                      Payment Pending (COD)
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-secondary font-black text-lg">
                      <Clock className="w-5 h-5" />
                      Arriving Soon
                    </div>
                  )}
                </div>

                <div className="grid gap-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 sm:gap-6">
                       <div className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container rounded-lg p-2 flex-shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1">
                        <Link to={item.link || '#'} className="text-primary font-bold text-sm sm:text-base hover:text-primary/80 line-clamp-2">
                          {item.title}
                        </Link>
                        {item.brand && (
                          <p className="text-on-surface-variant text-xs mt-1">Brand: {item.brand}</p>
                        )}
                        <p className="text-xs text-on-surface-variant mt-2">Qty: {item.quantity}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                           <button 
                            onClick={() => {
                                dbService.addToCart(user.uid, item, 1);
                                navigate('/cart');
                            }}
                            className="bg-secondary-container text-on-secondary-fixed text-xs px-4 py-1.5 rounded-full font-bold hover:brightness-105 transition-all"
                           >
                            Buy it again
                           </button>
                           <button className="bg-surface-container text-on-surface-variant text-xs px-4 py-1.5 rounded-full font-bold hover:bg-surface-container-high transition-all">
                            View item
                           </button>
                        </div>
                      </div>
                      <div className="hidden sm:block text-right">
                         <button className="border border-outline-variant px-4 py-2 rounded-md text-xs font-bold w-full hover:bg-surface-container transition-all mb-2">
                            Leave product review
                         </button>
                         <button className="border border-outline-variant px-4 py-2 rounded-md text-xs font-bold w-full hover:bg-surface-container transition-all">
                            Archive order
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="mt-12 pt-8 border-t border-outline-variant text-center">
        <p className="text-on-surface-variant text-sm py-8">
            Can't find an order? <button className="text-primary font-bold hover:underline">View all orders</button>
        </p>
      </div>
    </div>
  );
}
