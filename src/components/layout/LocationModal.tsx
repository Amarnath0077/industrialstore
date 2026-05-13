import { X, Search, MapPin, Edit3, Loader2, AlertCircle, Home, Briefcase, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useMapsLibrary, useApiLoadingStatus, APILoadingStatus } from '@vis.gl/react-google-maps';
import { useAuth } from '../../lib/AuthContext';
import { dbService } from '../../lib/dbService';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const geocodingLib = useMapsLibrary('geocoding');
  const apiStatus = useApiLoadingStatus();
  const { user, login } = useAuth();
  
  const [fetching, setFetching] = useState(false);
  const [zip, setZip] = useState('');
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const isApiBroken = apiStatus === APILoadingStatus.FAILED;

  useEffect(() => {
    if (isOpen && user) {
      loadAddresses();
    }
  }, [isOpen, user]);

  const loadAddresses = async () => {
    if (!user) return;
    setLoadingAddresses(true);
    try {
      const data = await dbService.getAddresses(user.uid);
      setAddresses(data || []);
      // Pre-select default or first address
      const def = data?.find((a: any) => a.isDefault);
      if (def) setSelectedAddressId(def.id);
      else if (data && data.length > 0) setSelectedAddressId(data[0].id);
    } catch (err) {
      console.error("Failed to load addresses", err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (isApiBroken) {
      alert("Google Maps API failed to load. Please check your API key and connection.");
      return;
    }
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    setFetching(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Location fetched (modal):", latitude, longitude);
        
        if (!geocodingLib) {
          setFetching(false);
          alert("Maps service not ready. Please try again.");
          return;
        }

        try {
          const geocoder = new geocodingLib.Geocoder();
          const response = await geocoder.geocode({ location: { lat: latitude, lng: longitude } });
          if (response.results && response.results.length > 0) {
            const zipComponent = response.results[0].address_components.find(c => c.types.includes('postal_code'));
            if (zipComponent) {
              setZip(zipComponent.long_name);
            }
          } else {
            alert("Unable to find ZIP code for this location.");
          }
        } catch (err: any) {
          console.error("Geocoding error (modal):", err);
          if (err.message?.includes('Billing') || err.status === 'REQUEST_DENIED' || err.code === 'REQUEST_DENIED') {
            alert("Google Maps feature needs setup:\n1. Enable Billing in Google Cloud Console.\n2. Enable 'Geocoding API' for your project.");
          } else {
            alert("Error converting location to address.");
          }
        } finally {
          setFetching(false);
        }
      },
      (error) => {
        setFetching(false);
        console.warn("Geolocation error (modal):", error);
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location permission denied.");
        } else if (error.code === error.TIMEOUT) {
          alert("Location request timed out.");
        } else {
          alert("Unable to fetch location.");
        }
      },
      { timeout: 15000, enableHighAccuracy: false }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4"
          >
            <div className="bg-surface-container-lowest w-full max-w-[450px] rounded-lg shadow-2xl border border-outline-variant overflow-hidden flex flex-col pointer-events-auto">
              {/* Modal Header */}
              <div className="bg-surface-container-high text-on-surface p-4 flex items-center justify-between border-b border-outline-variant">
                <h2 className="text-lg font-bold tracking-tight">Choose your location</h2>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-on-surface/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-on-surface-variant" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-0 overflow-y-auto max-h-[80vh]">
                <div className="p-6 space-y-6">
                  {isApiBroken && (
                    <div className="bg-error/10 border border-error/20 p-4 rounded-lg flex items-start gap-3 text-error">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-bold mb-1">Maps API Error</p>
                        <p className="opacity-90">The Google Maps API failed to load. Ensure you have enabled the <strong>Maps JavaScript API</strong> and <strong>Geocoding API</strong> in your Cloud Console.</p>
                      </div>
                    </div>
                  )}

                  {!user ? (
                    <div className="bg-surface-container-low p-5 rounded-lg border border-outline-variant text-center">
                      <p className="text-sm text-on-surface-variant mb-4">Sign in to see your addresses and set a default shipping location.</p>
                      <button 
                        onClick={login}
                        className="w-full bg-primary text-on-primary py-2.5 px-4 shadow-sm hover:opacity-90 transition-all font-bold text-sm rounded-md"
                      >
                        Sign in to see your addresses
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <p className="text-sm font-bold text-on-surface">Select a delivery address</p>
                        <button className="text-xs text-primary font-bold hover:underline">Add new address</button>
                      </div>
                      
                      {loadingAddresses ? (
                        <div className="flex justify-center p-8">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      ) : addresses.length === 0 ? (
                        <div className="text-center p-6 border border-dashed border-outline-variant rounded-lg">
                          <p className="text-xs text-on-surface-variant italic">No saved addresses found.</p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                          {addresses.map((addr) => (
                            <button
                              key={addr.id}
                              onClick={() => setSelectedAddressId(addr.id)}
                              className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${
                                selectedAddressId === addr.id 
                                ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                                : 'bg-surface hover:bg-surface-container border-outline-variant'
                              }`}
                            >
                              <div className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                selectedAddressId === addr.id ? 'border-primary' : 'border-outline'
                              }`}>
                                {selectedAddressId === addr.id && <div className="h-2 w-2 rounded-full bg-primary" />}
                              </div>
                              <div className="text-sm">
                                <p className="font-bold flex items-center gap-2">
                                  {addr.fullName}
                                  {addr.isDefault && <span className="text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded uppercase tracking-wider">Default</span>}
                                </p>
                                <p className="text-on-surface-variant text-xs line-clamp-1">{addr.street}</p>
                                <p className="text-on-surface-variant text-xs">{addr.city}, {addr.state} {addr.zip}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-outline-variant"></div>
                    <span className="flex-shrink mx-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">or</span>
                    <div className="flex-grow border-t border-outline-variant"></div>
                  </div>

                  {/* ZIP Code Entry */}
                  <div className="space-y-3">
                    <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Enter a US zip code
                    </p>
                    <div className="flex gap-2">
                      <input 
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="flex-1 border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2 text-sm bg-surface" 
                        placeholder="ZIP Code" 
                        type="text"
                      />
                      <button className="bg-primary text-on-primary px-6 font-bold rounded-md shadow-sm hover:opacity-90 transition-all text-sm">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Geolocation Button */}
                  <button 
                    onClick={handleUseCurrentLocation}
                    disabled={fetching}
                    className="w-full flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface py-3 rounded-md font-bold text-sm border border-outline-variant transition-all disabled:opacity-50"
                  >
                    {fetching ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-4 h-4" />}
                    {fetching ? 'Locating...' : 'Use my current location'}
                  </button>

                  {/* Pickup Points */}
                  <div className="space-y-3">
                    <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-1">
                      <Search className="w-3.5 h-3.5" />
                      Ship to a Store
                    </p>
                    <div className="relative">
                      <input 
                        className="w-full border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary pl-10 pr-3 py-2.5 text-sm bg-surface" 
                        placeholder="Search by city, state or zip" 
                        type="text"
                      />
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                    </div>
                  </div>

                  {/* Manage Addresses */}
                  <div className="pt-2">
                    <button className="text-sm text-primary font-bold hover:underline flex items-center gap-2">
                      <Edit3 className="w-4 h-4" />
                      Manage Address Book
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-surface-container-high p-4 flex justify-end gap-3 border-t border-outline-variant">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 border border-outline-variant text-on-surface font-bold text-sm rounded-md hover:bg-surface-container transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={onClose}
                  className="bg-primary text-on-primary px-8 py-2 font-bold text-sm rounded-md shadow-md hover:opacity-90 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
