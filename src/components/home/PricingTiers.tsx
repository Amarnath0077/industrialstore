import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function PricingTiers() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <div className="bg-surface-container-high border border-outline-variant p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-xl font-bold">Contractor Multi-Tier Pricing</h2>
            <p className="text-on-surface-variant text-sm">Unlock deeper discounts based on your annual spending and volume requirements.</p>
          </div>
          <Link 
            to="/pro-account"
            className="bg-primary text-on-primary px-6 py-3 text-xs font-bold hover:bg-primary/90 transition-all text-center rounded"
          >
            Sign Up for Pro Account
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Silver */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-lowest border border-outline-variant p-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-outline-variant text-on-surface text-[10px] font-bold px-2 py-1">SILVER</div>
            <h4 className="text-xs font-bold text-secondary mb-1">Level 1</h4>
            <div className="text-2xl font-bold mb-2">5% OFF</div>
            <ul className="space-y-1 text-xs text-on-surface-variant">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Any spend up to $10k/yr</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Standard Project Support</li>
            </ul>
          </motion.div>

          {/* Gold */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-lowest border-2 border-secondary-container p-4 relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-fixed text-[10px] font-bold px-2 py-1">GOLD</div>
            <h4 className="text-xs font-bold text-secondary mb-1">Level 2</h4>
            <div className="text-2xl font-bold mb-2">12% OFF</div>
            <ul className="space-y-1 text-xs text-on-surface-variant">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Over $10k annual spend</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Dedicated Account Manager</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Priority Inventory Access</li>
            </ul>
          </motion.div>

          {/* Platinum */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-lowest border border-outline-variant p-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold px-2 py-1">PLATINUM</div>
            <h4 className="text-xs font-bold text-secondary mb-1">Level 3</h4>
            <div className="text-2xl font-bold mb-2">Custom VPP</div>
            <ul className="space-y-1 text-xs text-on-surface-variant">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Volume Purchase Programs</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Direct Manufacturer Liaison</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
