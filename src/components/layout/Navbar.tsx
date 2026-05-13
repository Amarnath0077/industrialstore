import { MapPin, Search, Globe, ShoppingCart, Menu, LogOut, User as UserIcon, Loader2, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import SearchOverlay from './SearchOverlay';
import { useAuth } from '../../lib/AuthContext';
import { dbService } from '../../lib/dbService';

interface NavbarProps {
  onOpenLocation: () => void;
}

export default function Navbar({ onOpenLocation }: NavbarProps) {
  const navigate = useNavigate();
  const { user, login, logout, signingIn, error: authError } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = dbService.getCartItems(user?.uid || null, (items) => {
      setCartCount(items.reduce((acc, item) => acc + item.quantity, 0));
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-primary text-on-primary border-b border-outline-variant fixed top-0 w-full z-50">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-black text-on-primary cursor-pointer tracking-tighter">
              IndustrialStore
            </Link>
            <button 
              onClick={onOpenLocation}
              className="hidden md:flex items-center gap-2 ml-6 group cursor-pointer hover:outline outline-1 outline-on-primary p-1 transition-all"
            >
              <MapPin className="w-5 h-5 text-on-primary" />
              <div className="flex flex-col items-start">
                <span className="text-[11px] leading-tight text-on-primary-container">Deliver to</span>
                <span className="text-xs font-bold leading-tight">Chicago 60601</span>
              </div>
            </button>
          </div>
          
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <div className={`flex w-full transition-all duration-200 ${showSearch ? 'ring-2 ring-secondary-container rounded-lg overflow-hidden' : ''}`}>
              <select className="bg-surface-container text-on-surface text-xs px-2 rounded-l-lg border-none outline-none focus:ring-0 appearance-none cursor-pointer">
                <option>Electrical</option>
                <option>Tools</option>
              </select>
              <input 
                className="w-full py-2 px-4 text-on-surface focus:outline-none border-none bg-surface-container-lowest" 
                placeholder="Search IndustrialStore" 
                type="text"
                onFocus={() => setShowSearch(true)}
                onClick={() => setShowSearch(true)}
              />
              <button className="bg-secondary-container text-on-secondary-fixed px-6 rounded-r-lg hover:brightness-95 transition-all">
                <Search className="w-5 h-5 text-on-secondary-fixed" />
              </button>
            </div>

            <SearchOverlay 
              isVisible={showSearch} 
              onClose={() => setShowSearch(false)} 
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer hover:bg-primary-container/50 p-1 transition-colors rounded">
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold">EN</span>
            </div>
            
            <div className="relative group">
              {authError && (
                <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-white text-error font-bold rounded shadow-2xl border-2 border-error z-[100] animate-in fade-in slide-in-from-top-2 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-wider opacity-70">Sign In Error</p>
                    <p>{authError}</p>
                  </div>
                </div>
              )}
              
              {user ? (
                <div className="flex items-start">
                  <Link 
                    to="/account" 
                    className="flex flex-col p-1 hover:outline outline-1 outline-on-primary transition-all rounded"
                  >
                    <span className="text-[11px] leading-tight text-on-primary-container">
                      Hello, {user.displayName?.split(' ')[0] || 'Member'}
                    </span>
                    <span className="text-xs font-bold leading-tight">Account & Lists</span>
                  </Link>
                  <button 
                    onClick={(e) => { 
                      e.preventDefault();
                      e.stopPropagation(); 
                      logout(); 
                    }}
                    className="ml-1 p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center mt-1"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4 text-secondary-container" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={login}
                  disabled={signingIn}
                  className="flex flex-col p-1 items-start hover:outline outline-1 outline-on-primary transition-all rounded cursor-pointer text-left disabled:opacity-50 min-w-[100px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] leading-tight text-on-primary-container">
                      {signingIn ? 'Signing in...' : 'Hello, Sign in'}
                    </span>
                    {signingIn && <Loader2 className="w-3 h-3 animate-spin" />}
                  </div>
                  <span className="text-xs font-bold leading-tight">Account & Lists</span>
                </button>
              )}
            </div>

            <Link 
              to="/history" 
              className="hidden lg:flex flex-col p-1 hover:outline outline-1 outline-on-primary transition-all rounded"
            >
              <span className="text-[11px] leading-tight text-on-primary-container">Returns</span>
              <span className="text-xs font-bold leading-tight">& Orders</span>
            </Link>

            <Link to="/cart" className="flex items-center gap-1 cursor-pointer hover:bg-primary-container/50 p-1 transition-colors rounded">
              <div className="relative">
                <ShoppingCart className="w-8 h-8" />
                <span id="cart-badge" className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-fixed text-[10px] font-bold px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-bold mt-2">Cart</span>
            </Link>
          </div>
        </div>

        <nav className="flex items-center gap-4 mt-2 overflow-x-auto whitespace-nowrap custom-scrollbar">
          <button 
            onClick={() => navigate('/departments')}
            className="flex items-center gap-1 text-xs font-bold py-1 px-2 hover:outline outline-1 outline-on-primary transition-all"
          >
            <Menu className="w-4 h-4" /> All
          </button>
          
          <Link to="/deals" className="text-secondary-fixed hover:text-on-primary text-sm py-1 px-2 font-bold transition-colors">
            Deals
          </Link>
          
          <Link to="/history" className="text-on-primary-container hover:text-on-primary text-sm py-1 px-2 transition-colors">Customer Orders</Link>
          <Link to="/gift-cards" className="text-on-primary-container hover:text-on-primary text-sm py-1 px-2 transition-colors">Gift Cards</Link>
          <Link to="/registry" className="text-on-primary-container hover:text-on-primary text-sm py-1 px-2 transition-colors">Registry</Link>
          <Link to="/pro-account" className="text-on-primary-container hover:text-on-primary text-sm py-1 px-2 transition-colors">Sell</Link>

          <div className="flex-1"></div>
          <span className="text-xs font-bold text-secondary-fixed whitespace-nowrap">
            Electrical Professional Solutions
          </span>
        </nav>
      </div>
    </header>
  );
}
