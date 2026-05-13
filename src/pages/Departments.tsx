import { 
  Wrench, 
  ShieldCheck, 
  Fan, 
  Zap, 
  Truck, 
  Droplets, 
  Construction, 
  Trash2, 
  Building2, 
  ChevronRight 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Power Tools',
    icon: Wrench,
    items: ['Drills & Drivers', 'Saws & Cutting', 'Grinders & Polishers', 'Pneumatic Tools', 'Sanders & Finishers'],
    link: '#',
    cta: 'Shop All Power Tools'
  },
  {
    title: 'Safety Equipment',
    icon: ShieldCheck,
    items: ['Protective Eyewear', 'Hard Hats & Helmets', 'Respiratory Protection', 'Work Gloves & Hand Protection', 'Fall Protection Harnesses'],
    link: '#',
    cta: 'Shop All PPE'
  },
  {
    title: 'HVAC',
    icon: Fan,
    items: ['Air Conditioners & Units', 'Fans & Ventilation', 'Heating Equipment', 'Ducting & Fittings', 'Thermostats & Controls'],
    link: '#',
    cta: 'Shop All HVAC'
  },
  {
    title: 'Electrical',
    icon: Zap,
    items: ['Conduit & Raceway', 'Wire & Cable', 'Circuit Breakers & Panels', 'Industrial Lighting', 'Test & Measurement'],
    link: '/circuit-breakers',
    cta: 'Shop All Electrical'
  },
  {
    title: 'Material Handling',
    icon: Truck,
    items: ['Carts & Trucks', 'Conveyors', 'Lifting & Rigging', 'Storage Shelving', 'Packaging & Shipping'],
    link: '#',
    cta: 'Shop All Material Handling'
  },
  {
    title: 'Plumbing',
    icon: Droplets,
    items: ['Pipes & Tubing', 'Valves & Fittings', 'Pumps & Accessories', 'Hoses & Couplings', 'Water Heaters'],
    link: '#',
    cta: 'Shop All Plumbing'
  },
  {
    title: 'Building Materials',
    icon: Construction,
    items: ['Fasteners & Anchors', 'Structural Steel', 'Lumber & Sheet Goods', 'Insulation & Sealants', 'Roofing & Siding'],
    link: '#',
    cta: 'Shop All Materials'
  },
  {
    title: 'Janitorial',
    icon: Trash2,
    items: ['Cleaning Chemicals', 'Floor Care Equipment', 'Trash Cans & Liners', 'Paper Products', 'Spill Control'],
    link: '#',
    cta: 'Shop All Janitorial'
  }
];

export default function Departments() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Banner Section */}
      <section className="relative mb-12 rounded-lg overflow-hidden h-64 flex items-end p-12 border border-outline-variant bg-primary-container group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5tTCZvgd9TUGVh98VZk4IOovU_iXYV2YwYa10qu3qE3-oUa-8Nuj8zXbWU1RSWQBRMDRKLeBhUgzHBUCgYB0DsaHbXCYBIn1zOXGkQf35OwqmOMpQLgESciEy8mmzqk_vny2CoMl-zK0m7YBzTLrSC-V7FyRnD31ErLRWxMb3VVqKghQMDzTSv8VO6WXDQsS7N9TxshQIEXtWpKU_500aBmmb_og5WZC7S-KRgYfnDIft76Y8AdeCAW1KQE1p4xLDDo1mZvs8eGXy')" }}
        />
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-white mb-2 tracking-tighter"
          >
            All Departments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-on-primary-container text-sm max-w-xl leading-relaxed"
          >
            Browse our complete catalog of industrial supplies, heavy machinery, safety equipment, and precision tools. Use the directory below to find exactly what your project needs.
          </motion.p>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-secondary-container text-on-secondary-fixed font-bold text-[10px] px-2 py-1 rounded shadow-sm">DIRECTORY 2024</span>
          <span className="bg-white/10 text-white font-bold text-[10px] px-2 py-1 rounded border border-white/20 backdrop-blur-sm">VERIFIED SUPPLIERS</span>
        </div>
      </section>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <motion.div 
            key={cat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-surface-container-lowest border border-outline-variant p-6 flex flex-col space-y-4 hover:shadow-lg transition-all rounded-lg group"
          >
            <div className="flex items-center gap-3 border-b border-outline-variant pb-2">
              <cat.icon className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-bold text-primary tracking-tight">{cat.title}</h2>
            </div>
            <ul className="space-y-2 flex-1">
              {cat.items.map(item => (
                <li key={item}>
                  <a className="text-sm text-on-surface hover:text-secondary hover:underline transition-all cursor-pointer block" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <Link 
              to={cat.link}
              className="text-xs font-bold text-secondary flex items-center gap-1 group/link pt-2"
            >
              {cat.cta}
              <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Promotion Bento Grid */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          whileHover={{ y: -4 }}
          className="md:col-span-2 bg-secondary-container text-on-secondary-fixed p-8 flex items-center justify-between border border-outline-variant rounded-lg overflow-hidden relative shadow-md"
        >
          <div className="z-10">
            <h3 className="text-xl font-bold mb-1 tracking-tight">Wholesale Accounts</h3>
            <p className="text-sm mb-6 max-w-sm font-medium opacity-80">Apply for industrial-grade credit lines and tax-exempt status for your enterprise.</p>
            <Link 
              to="/pro-account"
              className="bg-primary text-on-primary px-8 py-3 font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all rounded shadow-sm inline-block"
            >
              Request Account
            </Link>
          </div>
          <Building2 className="w-32 h-32 opacity-10 absolute -right-4 -bottom-4 rotate-12" />
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-surface-container-lowest border border-outline-variant p-8 flex flex-col items-center justify-center text-center space-y-2 rounded-lg shadow-md"
        >
          <Truck className="w-12 h-12 text-secondary mb-2" />
          <h3 className="text-lg font-bold tracking-tight">Same Day Delivery</h3>
          <p className="text-xs text-on-surface-variant font-medium">Order by 10 AM for same-day site delivery in metropolitan areas.</p>
        </motion.div>
      </section>
    </div>
  );
}
