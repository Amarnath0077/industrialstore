import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingCart, Loader2 } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { dbService } from '../../lib/dbService';
import { Product } from '../../lib/types';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  showIcon?: boolean;
}

export default function AddToCartButton({ 
  product, 
  quantity = 1, 
  className = "", 
  variant = 'primary',
  showIcon = false
}: AddToCartButtonProps) {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      await dbService.addToCart(user?.uid || null, product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setLoading(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return added ? 'bg-[#007600] text-white' : 'bg-secondary-container text-on-secondary-fixed hover:brightness-105';
      case 'secondary':
        return added ? 'bg-[#007600] text-white' : 'bg-secondary text-white hover:brightness-110';
      case 'outline':
        return added ? 'bg-[#007600] text-white border-transparent' : 'bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high';
      default:
        return 'bg-secondary-container text-on-secondary-fixed';
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`relative py-2 px-4 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2 overflow-hidden ${getVariantClasses()} ${className}`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
          </motion.div>
        ) : added ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Added</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1"
          >
            {showIcon && <ShoppingCart className="w-3.5 h-3.5" />}
            <span>{showIcon ? 'Add' : 'Add to Cart'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
