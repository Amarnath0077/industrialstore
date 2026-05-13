import * as React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-error/5 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-xl shadow-2xl border border-error/20">
            <h1 className="text-2xl font-black text-error mb-4">Something went wrong</h1>
            <p className="text-on-surface-variant text-sm mb-6">
              The application encountered a runtime error.
            </p>
            <div className="bg-surface-container p-4 rounded font-mono text-[10px] text-left overflow-auto max-h-40 mb-6">
              {/* @ts-ignore */}
              {this.state.error?.toString()}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold text-sm tracking-tight"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Deals from './pages/Deals';
import Account from './pages/Account';
import CircuitBreakers from './pages/CircuitBreakers';
import Checkout from './pages/Checkout';
import ProAccount from './pages/ProAccount';
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess';
import Departments from './pages/Departments';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import LocationModal from './components/layout/LocationModal';

function AppContent({ onOpenLocation }: { onOpenLocation: () => void }) {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <div className="min-h-screen bg-background">
      {!isCheckout && <Navbar onOpenLocation={onOpenLocation} />}
      <main className={!isCheckout ? 'pt-[112px]' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/account" element={<Account />} />
          <Route path="/circuit-breakers" element={<CircuitBreakers />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pro-account" element={<ProAccount />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/product/romex-wire" element={<ProductDetails />} />
          <Route path="/history" element={<Orders />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isCheckout && <Footer />}
    </div>
  );
}

export default function App() {
  const [isLocationOpen, setIsLocationOpen] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('user_manual_location');
    if (!saved) {
      // Small delay to ensure UI is ready and not jarring
      const timer = setTimeout(() => {
        setIsLocationOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent onOpenLocation={() => setIsLocationOpen(true)} />
        
        <LocationModal 
          isOpen={isLocationOpen} 
          onClose={() => setIsLocationOpen(false)} 
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

