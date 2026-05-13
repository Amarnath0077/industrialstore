import { History, ShieldCheck, Wrench, Zap, Trash2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const topResults = [
  {
    title: 'Southwire 12/2 Solid Copper Romex Simpull NMB Cable (100-ft)',
    price: 94.98,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEF167PZ0bESK8C8iu1JN_as1wm-E-ZU06UWzMuCcGEOXqPxiL2ORsQn',
    link: '/product/romex-wire'
  },
  {
    title: 'MAX-IMPACT Lithium-Ion 20V Cordless Drill',
    price: 189.00,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXU8VEfbt7AICVtQsXEKXRWLJlLatEHKzwauTezNcL-rkUKo2ozb1iaQ5uQrQBdRF7EFN53HMj80zsvdBDGWHnFrGEADUaGgBbKWLXRME27rRCZhQGK72NW5DFIcXMaboijWYFq5MMcg1peLScN-QgP8gnEo5maJw_bNb789-xcsk_X-_yQcNoSbghqc1cnDGy1djIsHQv7cJppmZ2-ed3Pbw1Pl99BGn7P8z91Jba8dr8XIpdEC0188FxTH84VksAL4lQfMIMKnFb',
    link: '#'
  },
  {
    title: 'Reflect-Pro Class 2 High-Visibility Safety Vest',
    price: 24.50,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjbwmCLFsMXkzY4peb2Bc5Is40qF4uvkvgWJgN92XOAGDPdtYPq9KwZMJymhhlCEkwZYNf3EqqjXstGyHOPKnrXM5TSuZtpG9CLZZBGENoJKuhenXT9uIbDLYC5kmZ3CVax_dE5rbUzlR3Eo7VZ2erwl8UOM4GbaCxZ84CPAQGOUGB9DgkkbsjU8afmXTiF0H2H-cMWt9_wK2J7BFOMeYgNrWeuhiZfVCFbhOduOKWzRavpsBmvQLWBV--gD4Iy_xv1nfGTwkaM856',
    link: '#'
  },
  {
    title: 'VisionShield Anti-Fog Protective Safety Goggles',
    price: 15.99,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGxBoup2bRsa7ruR1tUI3m_U3xKYW3-I6BKxLRKLhk2wPnkagnJKLvCx0y1JGdMW16O5pBcj5rC8_kU0XZgxLIYruX97YYQ6DRHK3-fNFTJ7hAbdJPwxzvdfAP-xuhl5r-ihuNUDu5SmQFgKCYkgbl6DyCew5VrccdzzyywRwnKj6G_mPHZOEX6xdoiZ_3ACkyYimCB8KWt3fogojHYK2F3ofR3iJT-3P3OS_wJStarn0-vpdhiHnS_0x6Ug5aGHXT3n7EJSvrd4jr',
    link: '#'
  }
];

export default function SearchOverlay({ isVisible, onClose }: SearchOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/60 backdrop-blur-[2px] z-[55]"
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full mt-1 bg-surface-container-lowest shadow-2xl rounded-lg border border-outline-variant z-[60] overflow-hidden"
          >
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-outline-variant">
              {/* Left Column: History & Trends */}
              <div className="w-full md:w-1/3 p-4 flex flex-col gap-6">
                {/* Recent Searches */}
                <section>
                  <h3 className="text-[10px] font-bold text-on-surface-variant uppercase mb-4 tracking-widest">Recent Searches</h3>
                  <ul className="flex flex-col gap-1">
                    {[
                      'lithium ion batteries',
                      'safety goggles',
                      '1/2 inch drill bit'
                    ].map((query) => (
                      <li 
                        key={query}
                        className="flex items-center gap-3 p-2 hover:bg-surface-container-high cursor-pointer rounded transition-colors group"
                      >
                        <History className="w-4 h-4 text-outline" />
                        <span className="text-sm font-medium text-on-surface">{query}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Trending Categories */}
                <section>
                  <h3 className="text-[10px] font-bold text-on-surface-variant uppercase mb-4 tracking-widest">Trending Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: ShieldCheck, label: 'PPE' },
                      { icon: Wrench, label: 'Hand Tools' },
                      { icon: Zap, label: 'Electrical' },
                      { icon: Trash2, label: 'Cleaning' }
                    ].map((cat) => (
                      <div 
                        key={cat.label}
                        className="bg-surface-container-low p-3 border border-outline-variant rounded flex flex-col items-center gap-2 hover:border-secondary transition-all cursor-pointer group"
                      >
                        <cat.icon className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{cat.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Top Results */}
              <div className="w-full md:w-2/3 p-4 bg-surface-bright">
                <h3 className="text-[10px] font-bold text-on-surface-variant uppercase mb-4 tracking-widest">Top Results for You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topResults.map((item, idx) => (
                    <Link 
                      key={idx}
                      to={item.link}
                      onClick={onClose}
                      className="flex gap-4 bg-surface border border-outline-variant p-3 rounded hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="w-16 h-16 bg-surface-dim flex-shrink-0 rounded flex items-center justify-center overflow-hidden">
                        <img className="w-full h-full object-contain mix-blend-multiply" src={item.img} alt={item.title} />
                      </div>
                      <div className="flex flex-col justify-between">
                        <p className="text-[11px] font-bold line-clamp-2 text-primary group-hover:text-secondary transition-colors">{item.title}</p>
                        <p className="text-base font-black text-primary">${item.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
