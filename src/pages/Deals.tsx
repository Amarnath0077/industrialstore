import { Bolt, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import AddToCartButton from '../components/common/AddToCartButton';

const dayDeals = [
  {
    id: 'titan-drill-kit',
    title: 'TitanForce 20V Max Lithium-Ion Brushless Cordless Drill Kit',
    price: 129.99,
    originalPrice: 219.00,
    discount: '40% OFF',
    endsIn: '04:12:33',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8gUk3wjJInf0cjI2PRwxRmR1cBfxvU59QZfX4YyIKkf5ddatJKwl45YJX66X3U8fEr3ql-lFM3n0Ag-9oTYaX9RiZpQJoJtMHAnaB2OOHEmKUoAXzctQSMBBWE8pWqTwQNxp4M46PLr5BcMJTLAvG7J8VuU0xv5_0BcEYy60tl90m-BVpLW3v_nqtdB643ahSV_wC9EbVkDZeY2wn15VvKZ3yCvA_zR9VfY6NR8PQkHOMWTNQLnHWkcbar5x2OYb6FArV9ltTIZoF'
  },
  {
    id: 'aeropro-goggles',
    title: 'AeroPro Premium Ventilated Safety Goggles (Pack of 5)',
    price: 34.50,
    originalPrice: 46.00,
    discount: '25% OFF',
    endsIn: '08:45:10',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbcagVGDC37NXHzDXiM4Dx_YHKOlb05NHVg88QGs2alCL_q1jdZAEvJm1N1lObtZ7EZtmvQFSL4oIIXN-IbyxYXy6QWlwHlJyb_Ta8OgQ_hGfMJgSNLb0y_oeR4AkjV8Px31AmTrVAzSoxijTqBpdkWw7TzW0VqpfeT6Zbrpfmp9Wsi1Y1G238ORSa85BH0qj02nWYz6ySLoJiVHZejmedkPd2WGxeWq91lMb3NnUvZjdTRrWVYpysH9bwO4L9W9t1Qu1IKsnXRtF0'
  },
  {
    id: 'voltmaster-multimeter',
    title: 'VoltMaster Pro Digital Multimeter with True RMS',
    price: 89.00,
    originalPrice: 105.00,
    discount: '15% OFF',
    endsIn: '12:20:55',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSeOTldHfDGje1WpAlGjaxYXJzU4ci8EvAIfwImfrSLXyjttq9b-MBps4JEskWe78z1VfkSqJ8NfsI9mBkiCfa3PNNeMBiPqAGIrV2MQkibqpiu7s8Ez1N6x4rEzizGJ35li5ySy-HYxLzbvKRZTP2HqMCNi-_Dj3VdqHlyt-cnnkGdEG_FTSR5LA6bEner9IUiAHAt54_q5v6fnoSKymPQPZVp4i0WBUHzaNedDq6za86BkxcvPcEmdLxcN_rAnYKlZDQ-3nXIxo5'
  },
  {
    id: 'steelbrite-wrench-set',
    title: 'SteelBrite 12-Piece Metric Combination Wrench Set',
    price: 59.99,
    originalPrice: 85.99,
    discount: '30% OFF',
    endsIn: '14:10:02',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpWmbrk4dFQu2fXYrfNg3Iuj29Hk_NeprcqpQh_egY_gPBeYKXeg4hQAKjs9EDSlr9TH0d2Ovq3GfysvlItfo9BNGMwItcZmi-U7E2rRqRs8QZnVEafG0pgc-owQgmrH3Cb36R2-ScNt6rAxPc_toML7OMwO2bQ80v5JYX900VEraDGoyr4-aBt5XfBd6MR7UUwYbA2WwhNM5WCLXoyBRmKcL85SgRlZBJKmDnK29aj1qRZtqhlCi7dZNjmm-uGfO6qWdoVsz83cFe'
  }
];

const lightningDeals = [
  {
    id: 'heavy-duty-worklight',
    title: 'Heavy-Duty LED Work Light',
    price: 19.99,
    originalPrice: 45.00,
    claimed: 82,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs4mlSWBLjfUFQBZJ-ieh8R_O1jWl1Sesv_J5LoTPjBGLpw5nPZV_mnIUtELPU7epg5QiHXSRNilsFVNO7ZTUOOWjtnME-SLnGi20U7M43ASiPg0ZGuMOlA9t9jSKqRNyzvkUhpU3R3tHSzThXIyAwSTOa4cA_e_AUGhnEQZj1EyaXQ8V-FwP9T87es4k3o8tii1OGm9kcB01GkiRVj_2iR1DyjuM7rEq8veNEcfmACp72dLYGfTqIxzCQJzEBlqST4aIlGxE-ShI1'
  },
  {
    id: 'cut-resistant-gloves',
    title: 'Cut-Resistant Pro Gloves',
    price: 12.50,
    originalPrice: 24.99,
    claimed: 45,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC91d5Rb48gRCc7dvK1fhX8uHSpOeimEVN8J5wxs5-py6I5AYu1kjGo3OjXhPUXHOGLcJK0AYSZLTdPiX495LVHzHaJKqFLB13_o7JUZn-Hu5pdERu0vBQLd9q-L7hD9C824FDyLDNWzx5RGGKcUlb1xGV7D52ynQC0KI2XFfn4zL1mL4yErCZtxVy-20eJ0HV1GM2bb7dFNDtBCKEtjvwVgMOhuiB2tJ5EZw6P-S9rjwOQjgLAz8gnJ0vHVPoTeswgeOiapQnJC-92'
  },
  {
    id: 'digital-caliper-6in',
    title: '6" Stainless Steel Digital Caliper',
    price: 28.99,
    originalPrice: 42.00,
    claimed: 15,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2VuBuFEiLlTEL1OJqw4Lu3cvejXiNM-c9syI6Fac08xSwPPmH1YeUiHSx3k1zwxgmWWBuFO-E585ZtL-OimPUN8mRVg9-DbN-DgPOM3hqrVPbZCvVWb3CL9BmRhyMC-5SVtVCYVYUYq6Yl2DHDNDg_7kDHo_c_ZDgv3-KCNTDSD4dSC_N_T6DMeYVrpu4GxZwBlJMeK3wTtsbv-a3rvDffJJLQU_mzPDyuDUycEPt_oMaxhu7aCNir8fgqzXi8UPHWCzJ-7FTZkJK'
  }
];

export default function Deals() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] bg-primary-container rounded-lg overflow-hidden mb-12 border border-outline-variant">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-60" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDauM9KMIlMUwBr6uVly5y3UUXNfjN7bv5rrhH_Dzj7Krxpj60Znd4rRQW6sQeM60xLZpANJtV-ryecNBQwD84h7R9r3e7hHxOKGRiZgCnHMmdFoeiDbKHuZYDAcAja2oasqhp5hCqQ3w7qOoIxOm0udeNUsUlTnv1Z4IOrE0Y3RMiUJ1qC_moSiZUKP-THKwEjH5snaS6dhbzOhEN_fCynbnx6DAAWz7pRpBJP7S6ZPXe7jVHJfdMOkzBPcSuPUizhBWHxti4c8F2V" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10"></div>
        <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-secondary-container text-on-secondary-fixed px-4 py-1 text-xs font-bold rounded mb-4 w-max"
          >
            WAREHOUSE CLEARANCE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl text-white mb-4 font-black tracking-tighter"
          >
            Industrial Inventory Blowout
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-on-primary-container text-lg mb-8 leading-relaxed"
          >
            Save up to 60% on heavy-duty machinery, safety gear, and precision tools. Bulk discounts applied automatically at checkout.
          </motion.p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-secondary-fixed text-xs font-bold uppercase">Deals End In</span>
              <div className="flex gap-2 mt-1">
                {['14h', '22m', '08s'].map(time => (
                  <div key={time} className="bg-primary/80 backdrop-blur-sm p-2 text-white font-black text-lg rounded border border-outline-variant">{time}</div>
                ))}
              </div>
            </div>
            <button className="bg-secondary-container text-on-secondary-fixed px-8 py-3 text-sm font-bold rounded hover:opacity-90 active:scale-95 transition-all mt-auto self-end shadow-lg">
              SHOP ALL CLEARANCE
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg">
            <h3 className="text-xs font-bold text-on-surface border-b border-outline-variant pb-2 mb-4 uppercase">Category Deals</h3>
            <ul className="space-y-3">
              {[
                { name: 'Power Tools', count: 124 },
                { name: 'Safety & PPE', count: 87, active: true },
                { name: 'Electrical', count: 56 },
                { name: 'Measuring Tools', count: 42 }
              ].map(cat => (
                <li key={cat.name} className={`flex items-center justify-between text-sm cursor-pointer transition-colors ${cat.active ? 'font-bold text-primary' : 'text-on-surface-variant hover:text-primary'}`}>
                  <span>{cat.name}</span>
                  <span className="text-xs opacity-60">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg">
            <h3 className="text-xs font-bold text-on-surface border-b border-outline-variant pb-2 mb-4 uppercase">Discount</h3>
            <div className="space-y-3">
              {['50% Off or More', '25% Off or More', '10% Off or More'].map(d => (
                <label key={d} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors text-sm">
                  <input className="w-4 h-4 rounded border-outline-variant text-secondary-container focus:ring-secondary-container" type="checkbox"/>
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-grow space-y-12">
          {/* Sub Nav */}
          <nav className="flex items-center gap-4 border-b border-outline-variant pb-2 overflow-x-auto scrollbar-hide">
            <button className="px-4 py-1 bg-surface-container-high border border-outline-variant rounded text-xs font-bold text-primary whitespace-nowrap">All Deals</button>
            {['Power Tools', 'Safety Gear', 'Electrical'].map(item => (
              <button key={item} className="px-4 py-1 hover:bg-surface-container-high transition-colors rounded text-xs font-bold text-on-surface-variant whitespace-nowrap">{item}</button>
            ))}
            <button className="px-4 py-1 hover:bg-surface-container-high transition-colors rounded text-xs font-bold text-error uppercase whitespace-nowrap">Clearance</button>
          </nav>

          {/* Day Deals */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Deals of the Day</h2>
              <a className="text-secondary text-xs font-bold hover:underline" href="#">See all deals</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dayDeals.map((deal, idx) => (
                <motion.div 
                   key={deal.id}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-surface-container-lowest border border-outline-variant p-4 flex flex-col hover:shadow-md transition-shadow group cursor-pointer"
                 >
                   <div className="relative w-full aspect-square bg-surface-container-low mb-4 overflow-hidden rounded">
                     <img className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" src={deal.img} />
                     <div className="absolute top-2 left-2 bg-error text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase">{deal.discount}</div>
                   </div>
                   <h3 className="text-sm font-semibold text-on-surface mb-2 line-clamp-2 h-10">{deal.title}</h3>
                   <div className="mt-auto">
                     <div className="flex items-baseline gap-2">
                       <span className="text-2xl font-bold text-on-surface">${deal.price}</span>
                       <span className="text-xs text-outline line-through">${deal.originalPrice}</span>
                     </div>
                     <div className="text-error text-[11px] font-bold mt-1">Deal ends in {deal.endsIn}</div>
                     <AddToCartButton 
                        product={deal} 
                        className="w-full mt-4 !py-2 !opacity-100" 
                        variant="primary"
                     />
                   </div>
                 </motion.div>
              ))}
            </div>
          </section>

          {/* Lightning Deals */}
          <section className="bg-surface-container p-6 rounded-lg border border-outline-variant">
            <div className="flex items-center gap-3 mb-6">
              <Bolt className="w-8 h-8 text-secondary" />
              <h2 className="text-xl font-bold text-primary">Lightning Deals</h2>
              <span className="text-sm text-on-surface-variant ml-auto">Ends in <span className="font-black text-error">02:15:44</span></span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lightningDeals.map(deal => (
                <div key={deal.id} className="bg-white p-4 rounded-lg flex gap-4 border border-outline-variant">
                  <div className="w-24 h-24 bg-surface-container-low flex-shrink-0 rounded overflow-hidden">
                    <img className="w-full h-full object-contain" src={deal.img} />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h4 className="text-sm font-bold text-on-surface mb-1 truncate">{deal.title}</h4>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-bold text-error text-xl">${deal.price}</span>
                      <span className="text-xs line-through opacity-50">${deal.originalPrice}</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full mb-1">
                      <div className="bg-secondary-container h-full rounded-full" style={{ width: `${deal.claimed}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-outline-variant font-bold">{deal.claimed}% Claimed</div>
                      <AddToCartButton 
                        product={deal} 
                        showIcon={true} 
                        variant="outline"
                        className="scale-90"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
