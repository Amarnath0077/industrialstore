import { X, MapPin, Edit3, Save, Home, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { dbService } from '../../lib/dbService';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { user } = useAuth();
  
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  useEffect(() => {
    // Load saved manual location from localStorage
    const savedLocation = localStorage.getItem('user_manual_location');
    if (savedLocation) {
      const { city: c, state: s, pincode: p } = JSON.parse(savedLocation);
      setCity(c || '');
      setState(s || '');
      setPincode(p || '');
    }

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
      const def = data?.find((a: any) => a.isDefault);
      if (def) setSelectedAddressId(def.id);
      else if (data && data.length > 0) setSelectedAddressId(data[0].id);
    } catch (err) {
      console.error("Failed to load addresses", err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleSaveLocation = () => {
    if (!city || !state || !pincode) {
      alert("Please fill in all location fields.");
      return;
    }
    const locationObj = { city, state, pincode };
    localStorage.setItem('user_manual_location', JSON.stringify(locationObj));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('manual_location_updated', { detail: locationObj }));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4"
          >
            <div className="bg-surface-container-lowest w-full max-w-[450px] rounded-lg shadow-2xl border border-outline-variant overflow-hidden flex flex-col pointer-events-auto">
              <div className="bg-surface-container-high text-on-surface p-4 flex items-center justify-between border-b border-outline-variant">
                <h2 className="text-lg font-bold tracking-tight">Set Delivery Location</h2>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-on-surface/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-on-surface-variant" />
                </button>
              </div>

              <div className="p-0 overflow-y-auto max-h-[80vh]">
                <div className="p-6 space-y-6">
                  
                  {/* Manual Entry Section */}
                  <div className="space-y-4">
                    <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Manual Location Input
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1 ml-1">City</label>
                        <input 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2 text-sm bg-surface" 
                          placeholder="e.g. New York" 
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1 ml-1">State</label>
                        <input 
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2 text-sm bg-surface" 
                          placeholder="e.g. NY" 
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1 ml-1">Pincode / ZIP</label>
                        <input 
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2 text-sm bg-surface" 
                          placeholder="e.g. 10001" 
                          type="text"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleSaveLocation}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-md font-bold text-sm shadow-md hover:bg-primary/90 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save & Set Location
                    </button>
                  </div>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-outline-variant"></div>
                    <span className="flex-shrink mx-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-opacity-40">or select saved</span>
                    <div className="flex-grow border-t border-outline-variant"></div>
                  </div>

                  {user && (
                    <div className="space-y-4">
                      {addresses.length > 0 && (
                        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                          {addresses.map((addr) => (
                            <button
                              key={addr.id}
                              onClick={() => {
                                setSelectedAddressId(addr.id);
                                // Also update manual state for UI consistency if needed
                                setCity(addr.city);
                                setState(addr.state);
                                setPincode(addr.zip);
                              }}
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

                  {!user && (
                    <div className="bg-surface-container-low p-5 rounded-lg border border-outline-variant text-center">
                      <p className="text-sm text-on-surface-variant mb-4">Sign in to see your addresses and set a default shipping location.</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button className="text-sm text-primary font-bold hover:underline flex items-center gap-2">
                      <Edit3 className="w-4 h-4" />
                      Manage Address Book
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-high p-4 flex justify-end gap-3 border-t border-outline-variant">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 border border-outline-variant text-on-surface font-bold text-sm rounded-md hover:bg-surface-container transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
