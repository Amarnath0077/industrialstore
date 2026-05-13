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
import { APIProvider, useApiLoadingStatus, APILoadingStatus } from '@vis.gl/react-google-maps';
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

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function MapsErrorScreen({ status }: { status?: string }) {
  const isDenied = status?.includes('REQUEST_DENIED') || status === 'FAILED';
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-surface-container-low p-6 font-sans">
      <div className="max-w-md w-full bg-surface p-8 rounded-xl border border-outline-variant shadow-lg text-center">
        <div className="bg-error/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-on-surface mb-2 tracking-tight">Maps Setup Required</h2>
        <p className="text-sm text-error font-medium mb-6">
          {status === 'Missing or placeholder API key.' 
            ? 'API Key Not Found' 
            : isDenied 
              ? 'Billing or API Not Enabled' 
              : `Error: ${status}`}
        </p>
        
        <div className="text-left space-y-4 mb-8 text-sm text-on-surface-variant leading-relaxed">
          {status === 'Missing or placeholder API key.' ? (
            <div className="p-4 bg-surface-container rounded-lg border border-outline-variant space-y-3">
              <h3 className="font-bold text-on-surface flex items-center gap-2">
                <span className="bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                Add your API key
              </h3>
              <p>Open <strong>Settings</strong> (⚙️ icon) → <strong>Secrets</strong> and add <code>GOOGLE_MAPS_PLATFORM_KEY</code>.</p>
            </div>
          ) : (
            <>
              <div className="p-4 bg-surface-container rounded-lg border border-outline-variant space-y-3">
                <h3 className="font-bold text-on-surface flex items-center gap-2">
                  <span className="bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                  Enable Billing
                </h3>
                <p>Google Maps requires a billing account. Go to <a href="https://console.cloud.google.com/project/_/billing/enable" target="_blank" rel="noopener" className="text-primary hover:underline underline-offset-2">Cloud Billing</a> to enable it.</p>
              </div>

              <div className="p-4 bg-surface-container rounded-lg border border-outline-variant space-y-3">
                <h3 className="font-bold text-on-surface flex items-center gap-2">
                  <span className="bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                  Enable APIs
                </h3>
                <p>Ensure <strong>Maps JavaScript API</strong> and <strong>Geocoding API</strong> are enabled in the <a href="https://console.cloud.google.com/google/maps-apis/library" target="_blank" rel="noopener" className="text-primary hover:underline underline-offset-2">Library</a>.</p>
              </div>
            </>
          )}
        </div>
        
        <div className="text-xs text-on-surface-variant/70 italic bg-surface-container-high p-3 rounded font-mono break-all">
          Status: {status || 'FAILED'}
        </div>
      </div>
    </div>
  );
}

function AppContent({ onOpenLocation }: { onOpenLocation: () => void }) {
  const location = useLocation();
  const apiStatus = useApiLoadingStatus();
  const isCheckout = location.pathname === '/checkout';

  // Log status for debugging
  console.log("Maps API Status:", apiStatus);

  return (
    <div className="min-h-screen bg-background">
      {!isCheckout && <Navbar onOpenLocation={onOpenLocation} />}
      <main className={!isCheckout ? 'pt-[112px]' : ''}>
        {apiStatus === APILoadingStatus.FAILED && (
          <div className="bg-error/10 text-error p-2 text-[10px] text-center font-bold">
            Maps API failed to load. Location features may be limited.
          </div>
        )}
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
  const apiStatus = useApiLoadingStatus();

  if (!hasValidKey) {
    return <MapsErrorScreen status="Missing or placeholder API key." />;
  }

  if (apiStatus === APILoadingStatus.FAILED) {
    return <MapsErrorScreen status="FAILED" />;
  }

  return (
    <ErrorBoundary>
      <APIProvider apiKey={API_KEY} version="weekly" libraries={['geocoding']}>
        <BrowserRouter>
          <AppContent onOpenLocation={() => setIsLocationOpen(true)} />
          
          <LocationModal 
            isOpen={isLocationOpen} 
            onClose={() => setIsLocationOpen(false)} 
          />
        </BrowserRouter>
      </APIProvider>
    </ErrorBoundary>
  );
}

