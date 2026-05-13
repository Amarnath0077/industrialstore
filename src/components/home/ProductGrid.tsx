import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../common/AddToCartButton';

const products = [
  {
    id: 'romex-12-2-100',
    title: 'Southwire 12/2 Solid Copper Romex Simpull NMB Cable (100-ft)',
    price: 94.98,
    bestSeller: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEF167PZ0bESK8C8iu1JN_as1wm-E-ZU06UWzMuCcGEOXqPxiL2ORsQnZbIyv2NSNOb8UURwQalXJfOvlMB___moAg8PCcswzE-zvbLCcMHElxYY0darW9vG_KT4sNMQRu3DQgxHGns_0TrJMms9hvc9eWuPJySBsPdfyXeQW4e8oO3TVXPa70WypUvtm-Nr06cLNG49y37REsF_8VnL_DB-SyEEn5zNuczrOmse3hbc1j6pvtFL29pSBNVoCkOc0WZG5OJNHNuptx',
    delivery: 'Tomorrow',
    link: '/product/romex-wire'
  },
  {
    id: 'sqd-hom-20a',
    title: 'Square D Homeline 20 Amp Single-Pole Circuit Breaker',
    price: 6.47,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoacWvfNa3G8a_ZRbMGH9Hs1VILDYCXAGd7dIVMBXjecV0C2JES1H1ZgP12qsD4lByqqnBnbvjy1rm-MpM4aa5UzBvK7_4zwYepC7ccRc_kBMf_Ukt8XeSHkUL1jEvUCC8YPdDwc6RyycEAN85yh63Ec4miUcbC-JyD9IcNhGLg9ZnQ9ASpO9yWKyyKWbG8tEMcgCFFAWEVB4ot9OKKx1nRCvExL5y0V_xRODaEm5uYLRsfZD3ds7Ato7jgqPH0czjm0D0URg-h8L6',
    delivery: 'Pickup in 2 hours',
    link: '/circuit-breakers'
  },
  {
    id: 'emt-12-10ft',
    title: '1/2-in x 10-ft Galvanized Steel EMT Conduit',
    price: 8.12,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2OEWeML83xTkBqApcBJFHF_f4baF_F4TIEKQ_i6KWSX16BeyOMsGVmkGFCureWm88KmS-7EkfmlGx5uzSXxkFDV4vPqxl0DtIsNEzvmz83juYQc_OwDK0dYdMP1vPXIegb07Rlst2NWHcJ2GafNh0O6YVGjs1vfWHROM8cv01JtEyKENpn0wka57WHknIVnQi6nd-lxKQhHWzsow6IMLQg3mnLn2FhJdx8Y3iaCN-KhmbuLomeByrGQYEqP_buxz10BZ2yNdI8xb',
    delivery: 'In stock at Chicago',
    link: '#'
  },
  {
    id: 'cord-reel-50ft',
    title: 'Pro-Series 50-ft 12-Gauge Triple Outlet Cord Reel',
    price: 124.00,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq7012VmA32BiQBIv-hjEwhn3EjOtEaZodpF5Qm6di2uFzccYk-pGLukHj9ZKjUAkI7zR5hYbVodhoXpNdyN1L6IqofddnHerA5ORgqt1yalYjZs2pAewCWWDbxhqJncpTfovbPU0HLH9urebw0SrXIX5sfXpIuAgwkOJseAKng59cPTfrksk-sFlKLKHfzAlm3LBHt7lvF4oyABQeohmymJLTc_ogN0DDRtIM2h_3IYtmwrY3Iue2kDFwJuiH2PZkEPP3EnIG7epd',
    delivery: 'Free shipping',
    link: '#'
  },
  {
    id: 'led-high-bay',
    title: '150W LED UFO High Bay Light, 21,000 Lumens',
    price: 189.50,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDRy3fvvOPAVa_ssNytVJYqSTCdcb1N1Uy5Kc70fZKf99cnYBjTvFajPvioVR6hjw7459ls-5CGclfLFfiZruNYyKqkhtbe1XP3z_AvYol4pJPqf8ARzLUcREcWyBW-5GO5LZkwabLmRe9v76glvA15N8rDwk1TdfQaxBsiQr639XyivhxVR1dj5gCKVBd02du15SwGjBe0HfwTCOUOATDYt7-Sw_v2jd1yMwoRqazHEb9DjGcpMS2BOIfIZFagjGrV96DPpQ3aCEI',
    delivery: 'Bulk pricing available',
    link: '#'
  }
];

export default function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12 pb-12">
      <h2 className="text-xl font-bold mb-6">Best Selling Electrical Supplies</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col h-full bg-surface-container-lowest border border-[#D5D9D9] p-4 group hover:shadow-lg transition-all"
          >
            <Link 
              to={product.link}
              className="flex flex-col"
            >
              <div className="aspect-square bg-surface-container-low mb-3 overflow-hidden flex items-center justify-center rounded">
                <img 
                  alt={product.title} 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" 
                  src={product.img} 
                />
              </div>
              
              <div className="min-h-[20px]">
                {product.bestSeller && (
                  <span className="inline-block bg-secondary text-white text-[10px] font-black px-2 py-0.5 mb-2 rounded-sm tracking-wider">
                    BEST SELLER
                  </span>
                )}
              </div>
              
              <h3 className="text-sm font-bold line-clamp-2 mb-2 group-hover:text-secondary transition-colors h-10 leading-tight">
                {product.title}
              </h3>
              
              <div className="flex items-baseline gap-0.5 mt-auto">
                <span className="text-xs font-bold">$</span>
                <span className="text-3xl font-black text-on-surface">{Math.floor(product.price)}</span>
                <span className="text-sm font-black text-on-surface">{(product.price % 1).toFixed(2).split('.')[1]}</span>
              </div>
              
              <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mt-2">
                Free delivery {product.delivery}
              </p>
            </Link>

            <AddToCartButton 
              product={product} 
              className="mt-4 w-full"
              variant="outline"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
