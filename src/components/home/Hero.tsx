import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative w-full h-[400px] bg-primary-container overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Industrial Wiring Hero" 
          className="w-full h-full object-cover opacity-40" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJaS8jXZTQqeoBMxsR8QS161061xoTTDh2Zil0_t-0w12_hPWzgB4yS-uQ_NFSqbuQOZZUFvk0I8lEV5c2DqkQ2TfMJL7S6W6NwCEZEMewob34urm-bVBUJR1XzS_ycP0zMFInkXmuiZpXwjZ2sdTbMqWWGsVW_Q2t_aJ6LYiLA9HST7PAOr6g7eAee6N-3kYxhgd3koTEKOPqVIXza4Yz2p6Eb1uoLB2b7yL28merJjStaMCIE5CJbVF1gkcxlc1Ufr3nukfbrTap" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl space-y-4"
        >
          <span className="inline-block bg-secondary-container text-on-secondary-fixed text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
            Industrial Strength
          </span>
          <h1 className="text-5xl leading-tight text-on-primary font-black tracking-tighter">
            Advanced Electrical Solutions & Protection
          </h1>
          <p className="text-xl text-on-primary-container leading-relaxed">
            Engineered for reliability. Delivering mission-critical circuit protection and industrial wiring systems for large-scale operations.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/departments"
              className="bg-secondary-container text-on-secondary-fixed font-black text-sm py-4 px-10 rounded shadow-md hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest border border-secondary"
            >
              Browse Catalog
            </Link>
            <Link 
              to="/pro-account"
              className="bg-primary/40 backdrop-blur-md border-2 border-on-primary text-on-primary font-black text-sm py-4 px-10 rounded hover:bg-on-primary hover:text-primary transition-all uppercase tracking-widest shadow-sm"
            >
              Request Bulk Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
