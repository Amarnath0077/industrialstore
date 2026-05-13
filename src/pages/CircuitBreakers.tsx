import { Zap, TrendingUp, Sparkles, ChevronRight, FileText, Construction, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../components/common/AddToCartButton';

const categories = [
  {
    title: '1-Pole Breakers',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDljL88bS1qQWIy117eNeHAJ0OuAsHlGU82r7b7CdZZQu6NoOhrqY_Xv107DMD3mVv77jVVgBkvvRa58vv1yIin86tEcWMztYhHr8VpxPC4WPib6pEiTQFZ7UlsgNXS7CO1PXFFG6wUyWlghoNYGdF1QoW7NV21lL0pRxvpDgpsm73KhX2B1-KUHYLPIUjo3RVD9Uk0zQ75olzTMFwdS408EZI-EsOoMkYypUwaGVR2rLMIIA5KH-eSfNe_cReJdVzI1yx-sLkpMoRh'
  },
  {
    title: '2-Pole Breakers',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2bBlwvx-Af8-BOLt7jy_wTEOPw_76JxUOC-OZz1KXsqxnhc5ik5UQvUXMb-eWQmg3Tc6XfBNIPKLreoHzboyyHehHTdQeHzZdbrRtSR6SOslp5tey0p8xR0q1gVMBT9v0tWSwoGDw_yAbK1HFPt7lWSFV1knQ9PDdiOuVNgBvBkqIPNQYLQROdkaCOjJEGpVuVKMPgh71Tmz5xoGc-gx409w3CNdWw9DSQpd3M2y1Wfjr4_mvrdb8YcvPC5nhY-jLI9BIB-wEhNNy'
  },
  {
    title: '3-Pole Breakers',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9FlM4gf1AOMJ6rfqqebKUBcl4g9Jf1rwt5jBRm3lqqZQVpiFle7Kv1kEZyLeDaWrnMfIOfS2sAre8JmspP2Z1Ybzit7gSYKAv8opoY24AnRS9sWFZDHg4mKQ3Aaf0gkc4bGOEEg_QdHV3OjtJrjBhA4A_Yth8JZczncm3XLS99nlVdSZ59LXxvKEsv73yl9Z6o6N14GBnMBZAbnntFqcpm1wY6xLlrpJGxRISEoxWr0NgDPAQxO5OdXfqO1uevtgoiya4v8Wci2y7'
  },
  {
    title: 'Main Breaker Panels',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaELIMBcOC3Xv1wOwlgpr_JzZwhJXPk2SsvJnxYsXusDd1qbocaa0XS_jvOHPQIaQCU--54lF19UWuGRqJhu9ZUPQuesGcS4boXWkU6DIR_zdXErewNE2BxLiWKQHeQP69tUAMM_S8Tb9lQ9r0_grXPrGKNXeJ6A0i-b3xNpvXMHKsF4B5mYWQEwYHcJv348trRBi-4ec95UUeGIRa6BzKLwkzUSvUSQ7ANtN3CHNMuH-dGEKiG65ELq4drW01Ss8eovKNSHjKOL0Y'
  },
  {
    title: 'Sub-Panels',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYKFZ0xFDdjwbg2LGhT85G2itdwBdZIMEVTkm6t5oZE3eDCydWc3im5gC_gmuPkIXbmwmZ2yLHbJ9Ne7qxFs7s9joLVqK4y1cdl3jqRnVCYvLujDaImfCdSILWJGE1wVzzA6LpDN77TEDbHusufbLeNKOBgplFmg6kB5Z3A2YgOX96HMi-JFXlO5AKZ0rFaUaAfVVmJacJkU_JFAuZfrCiY62G1lNaok6BdlB_U6kecRIRI7QGKTSjwJYfisTZ0TgWJW8BqfL7wD4H'
  },
  {
    title: 'Enclosures',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7SYWvzxOF9xZY13liigXQp5WmUO7onv2fHT9ia_-L5K84L1FAxlksvFU5F5o60l-tsHEjqYmCw7UmhTdv6Djp_w1y321uFegZ6W-sfPu1g8JuEQxXb20Rfpx0FgdT3Et5-ADfR-4s31iiopeu7AwOkAASQ0-5__BXI73AMZVAp_vrs5CmS3pUBHLPKiHRe3eLbHkKze3-vh38fX8texGIGjyRlU_tvJ5s3mR6JhlAhOBXdk7lizUF3XAQ0T_4AmMj1BwefxdpwiEm'
  }
];

const bestSellers = [
  {
    id: 'sqd-hom-20a-cb',
    title: 'Square D Homeline 20 Amp Single-Pole Circuit Breaker',
    price: 6.48,
    rating: 4.5,
    reviews: 1245,
    tag: 'Best Seller',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQzhoayA2KTp2NWz6d5UhfKvYlcxaPL_HR8ryNGgbXXr3yEsH2M8jRP7h3wR2Bmx1ZdiQwQupbdA0fSzgb89nBTckB7rWC76Z4n4TaFrceoJvtxfozbZVVpysZQZXdSlkoLD4xovw9GFZ65BM4IBF70aPwG4HkXWsOP1EutuOEUhQkzTOnuj_nXdl_oOnXRGK0MOCqU4ImkpTHaBGQ4P9O0SHE1rb-LYbiNh4VDj1TtMNyv55lhA-riKEVYZus5PcA2nLKKeTFdNF-'
  },
  {
    id: 'siemens-100a-main',
    title: 'Siemens QP 100-Amp Double-Pole Main Circuit Breaker',
    price: 48.97,
    rating: 5,
    reviews: 892,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS9TxRvP4Fa5Imu4Iqbl9Ic7Xh-JtPIdYLIbOeHBUmyN6wkTMaympVS-mIYpBanC8ogWT1Hah5xiOquJKAonYeK0UMNfy06St6Itd20YnyPtIXoEQGTM421quvFS-3Mcs_wHKHsbj90R4LFbK0aL4l3BikCauGttLPRVXaxlKu1dmfUTrWx_jyXa699y8LwMkyDQO8BBgDmwFNJg-1wT7EqC_IxaErAmYo4MGTdp246RY_s8-RA6VsLtGVlwE7I1XnM_JyY1qmN3-U'
  },
  {
    id: 'eaton-125a-icenter',
    title: 'Eaton BR 125-Amp 12-Space Indoor Load Center',
    price: 82.00,
    rating: 4.8,
    reviews: 531,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJRXzv8jd2Uqcvaz1olDHMlxIl4qnOuSGwcV4lF4ZXyJMiqn-vP0lYvB5SmRc4mwNTWO5HlBj4friCihYVsBKJgrhT_ZpGwe4geDb-UgXMJaa4ap7bgzTEdwpLul1xdJAD5ayoHRpw84ZLkMY9WIXcTTUCPF_ZM5R0MJbDEHOfS-KccTgc0FyYLZtOcwVrGFn0s904J4D7Ww-nBj-WJ-SI5F2dx1qxVPIgo_WbbooQHt6S23M_wn3BjktaP6v3yxUqH7T1WGORmaKj'
  },
  {
    id: 'sqd-qo-30a-cb',
    title: 'Square D QO 30-Amp Double-Pole Circuit Breaker',
    price: 18.45,
    rating: 5,
    reviews: 2110,
    tag: 'Industrial Grade',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9pV6GlNp-aKHjC54vb5-8K9eFRDgtD0Rs8c7CUa2WSUkUGlfmTKYsyzp71shyG0WKw0fcg8UAHHO2uVI2UVunb496MLjgCNeag_oDUSNgiD9RE3w2WRaM4AipgiQjvlcifcupI_CaaLvIdlmcu6nVd1j-ioefcp_QQAo-Jk_QVbuNdjzXANATPm0WDTe02NMWDCR8OO3Frdsjx1xcaNPRLxeiVMxjyH1eQyJV3V9l7OmzYPzpaYGWEOJh8ZrdfQQ54svAuGHuasPH'
  }
];

export default function CircuitBreakers() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 space-y-4 shrink-0">
        <div>
          <h3 className="text-xs font-bold text-on-surface-variant uppercase mb-4 tracking-wider">Department</h3>
          <div className="space-y-1">
            <div className="flex items-center bg-surface-container-high text-primary font-bold px-3 py-2 rounded cursor-pointer transition-all">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm">Electronics</span>
            </div>
            <div className="flex items-center text-on-surface hover:bg-surface-container px-3 py-2 rounded cursor-pointer transition-all">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-sm">Best Sellers</span>
            </div>
            <div className="flex items-center text-on-surface hover:bg-surface-container px-3 py-2 rounded cursor-pointer transition-all">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm">New Releases</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-outline-variant">
          <h3 className="text-xs font-bold text-on-surface-variant uppercase mb-4 tracking-wider">Filters</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold mb-2">Amperage</p>
              <div className="space-y-2">
                {['15A', '20A', '30A', '50A', '100A+'].map(amp => (
                  <label key={amp} className="flex items-center text-sm cursor-pointer hover:text-primary">
                    <input type="checkbox" className="rounded border-outline text-secondary-container mr-2" /> {amp}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold mb-2">Voltage</p>
              <div className="space-y-2">
                {['120V', '240V', '480V'].map(v => (
                  <label key={v} className="flex items-center text-sm cursor-pointer hover:text-primary">
                    <input type="checkbox" className="rounded border-outline text-secondary-container mr-2" /> {v}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:underline cursor-pointer">Electrical</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-bold text-on-surface">Circuit Breakers & Load Centers</span>
        </nav>

        {/* Hero */}
        <section className="bg-primary-container text-on-primary rounded-lg p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl font-black mb-2 tracking-tighter">Circuit Breakers & Load Centers</h1>
            <p className="text-base text-on-primary-container leading-relaxed">
              Professional-grade power distribution solutions for industrial, commercial, and residential applications. Engineered for safety, reliability, and precision power management.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
             <Zap className="w-64 h-64 absolute -right-16 -top-16 stroke-[1px]" />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 border-b border-outline-variant pb-2">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-surface-container-lowest border border-outline-variant p-4 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="aspect-square bg-surface-container mb-4 overflow-hidden rounded">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                </div>
                <p className="font-semibold text-sm text-center">{cat.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6 border-b border-outline-variant pb-2">
            <h2 className="text-xl font-bold">Best Sellers</h2>
            <button className="text-secondary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestSellers.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface-container-lowest border border-outline-variant p-4 flex flex-col hover:shadow-md transition-shadow group"
              >
                <div className="h-40 bg-surface-container-low mb-4 overflow-hidden rounded flex items-center justify-center">
                  <img src={product.img} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform mix-blend-multiply" />
                </div>
                <div className="flex-grow">
                  {product.tag && (
                    <span className={`text-[10px] px-1 font-bold uppercase mb-1 inline-block rounded-sm ${product.tag === 'Best Seller' ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary text-on-primary'}`}>
                      {product.tag}
                    </span>
                  )}
                  <h3 className="text-sm font-semibold line-clamp-2 mb-1">{product.title}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-secondary-container">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-on-surface-variant ml-1">({product.reviews})</span>
                  </div>
                  <p className="text-2xl font-bold mb-4">${product.price}</p>
                </div>
                <AddToCartButton product={product} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="bg-surface-container p-8 border border-outline-variant rounded-lg">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-lg font-bold">Technical Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: 'Wiring Diagrams', desc: 'Standard configurations for load center installation.' },
              { icon: Construction, title: 'Installation Guides', desc: 'Step-by-step PDF manuals for professional electricians.' },
              { icon: ShieldCheck, title: 'Safety Standards (NEC 2024)', desc: 'Compliance documentation for the latest electrical codes.' }
            ].map((res) => (
              <a key={res.title} href="#" className="flex items-start gap-3 group">
                <res.icon className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors shrink-0" />
                <div>
                  <p className="text-sm font-bold text-primary group-hover:underline">{res.title}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{res.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
