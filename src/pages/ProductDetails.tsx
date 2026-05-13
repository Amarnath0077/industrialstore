import { Star, StarHalf, MapPin, Truck, ShieldCheck, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddToCartButton from '../components/common/AddToCartButton';

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  const productData = {
    id: 'romex-12-2-100',
    title: 'Southwire 12/2 Solid Copper Romex Simpull NMB Cable (100-ft)',
    price: 94.98,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEF167PZ0bESK8C8iu1JN_as1wm-E-ZU06UWzMuCcGEOXqPxiL2ORsQn',
    brand: 'Southwire',
    link: '/product/romex-wire'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-6">
        <Link className="hover:underline" to="/departments">Industrial Equipment</Link>
        <ChevronRight className="w-3 h-3" />
        <Link className="hover:underline" to="/departments">Electrical</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-on-surface font-semibold">Wire & Cable</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Image Section */}
        <div className="md:col-span-5 flex gap-4">
          <div className="flex flex-col gap-2 w-16 shrink-0">
            {[1, 2].map((_, i) => (
              <div key={i} className="border border-outline-variant p-1 cursor-pointer hover:border-secondary transition-all bg-white rounded overflow-hidden aspect-square">
                <img 
                  alt={`Thumbnail ${i + 1}`} 
                  className="w-full h-full object-contain mix-blend-multiply" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEF167PZ0bESK8C8iu1JN_as1wm-E-ZU06UWzMuCcGEOXqPxiL2ORsQn" 
                />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-white border border-outline-variant p-8 flex items-center justify-center min-h-[400px] rounded-lg shadow-sm">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              alt="Main Product" 
              className="max-w-full h-auto mix-blend-multiply" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEF167PZ0bESK8C8iu1JN_as1wm-E-ZU06UWzMuCcGEOXqPxiL2ORsQn" 
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div>
            <span className="bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest inline-block">Best Seller</span>
            <h1 className="text-2xl font-black text-on-surface mt-2 leading-tight tracking-tighter">Southwire 12/2 Solid Copper Romex Simpull NMB Cable (100-ft)</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-secondary fill-current">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <StarHalf className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-secondary hover:underline cursor-pointer">2,458 ratings</span>
            </div>
          </div>

          <div className="border-y border-outline-variant py-6">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold">$</span>
              <span className="text-4xl font-black text-on-surface">94</span>
              <span className="text-sm font-bold">.98</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">In stock at Chicago</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Truck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Free delivery Tomorrow</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-on-surface-variant uppercase tracking-widest mb-2">Product Description</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
              Southwire's Romex® Brand SIMpull® NM-B (non-metallic sheathed) cable may be used for both exposed and concealed work in normally dry locations. SIMpull® technology allows for easier pulling, stripping, and installation. Features solid copper conductors and a durable PVC jacket. Ideal for indoor residential and commercial wiring applications such as outlets, switches, and lighting fixtures.
            </p>
          </div>
        </div>

        {/* Purchase Sidebar */}
        <div className="md:col-span-3">
          <div className="border border-outline-variant rounded-lg p-6 bg-surface-container-lowest shadow-md space-y-6 sticky top-28">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold">$</span>
              <span className="text-3xl font-black">94.98</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Quantity</span>
                <select 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-surface-container-low border border-outline-variant text-on-surface text-sm rounded px-2 py-1 focus:ring-secondary outline-none"
                >
                  {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              
              <div className="space-y-3">
                <AddToCartButton 
                  product={productData} 
                  quantity={quantity}
                  className="w-full py-4 text-sm"
                  variant="primary"
                />
                <button 
                  className="w-full bg-secondary hover:brightness-110 text-white py-3 rounded-full font-black text-sm transition-all active:scale-95 shadow-sm uppercase tracking-widest"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-on-surface-variant">Ships from</span>
                <span className="text-on-surface">IndustrialStore</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-on-surface-variant">Sold by</span>
                <span className="text-on-surface">IndustrialStore</span>
              </div>
            </div>

            <div className="bg-surface-container p-3 rounded flex items-center gap-3 border border-outline-variant/50">
              <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
              <span className="text-[10px] font-bold uppercase text-on-surface leading-tight tracking-wider">Secure transaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <section className="mt-16">
        <h2 className="text-2xl font-black text-on-surface mb-8 border-b-2 border-outline-variant pb-2 tracking-tighter">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {[
            ['Gauge', '12 AWG'],
            ['Number of Conductors', '2'],
            ['Length', '100 ft'],
            ['Voltage', '600V'],
            ['Material', 'Solid Copper'],
            ['Jacket Material', 'PVC']
          ].map(([label, value]) => (
            <div key={label} className="flex border-b border-outline-variant/30 group">
              <span className="w-1/2 text-xs font-black uppercase bg-surface-container-low px-4 py-3 tracking-widest text-on-surface-variant group-hover:bg-surface-container-high transition-colors">{label}</span>
              <span className="w-1/2 px-4 py-3 text-sm font-bold text-on-surface">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently bought together */}
      <section className="mt-16 p-8 border border-outline-variant bg-surface-container-lowest rounded-lg shadow-sm">
        <h2 className="text-xl font-black text-on-surface mb-8 tracking-tighter">Frequently bought together</h2>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 border border-outline-variant p-2 bg-white rounded overflow-hidden">
              <img alt="Product" className="w-full h-full object-contain mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEF167PZ0bESK8C8iu1JN_as1wm-E-ZU06UWzMuCcGEOXqPxiL2ORsQn" />
            </div>
            <Plus className="w-4 h-4 text-outline" />
            <div className="w-24 h-24 border border-outline-variant p-2 bg-surface-container-low rounded overflow-hidden">
              <img 
                alt="Junction Box" 
                className="w-full h-full object-cover mix-blend-multiply" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnAfaTRIDindB9NVTbiMs53xxKufMhN1WhTFMtBZWN10Nu3tj0plW7ftNFi7L_GOpr9eN3V5QJIUZIHV7IwCPgHnqGht-oFxfoelEzCZ8HI-DBGNwkES0Wht9_3LGHduKqIJl8Kntm_zrV6HdjGLmExJeYWIg029_b4deicU4z_pOT8-pZlHnY3tsoBw_7c3SNDkc8AP3EBg_NIo9na888prwWlhxSiFyBJDIsviEUoUJ2cS1OnxYdbJjXI1taqXKQXM8dohz4njad" 
              />
            </div>
            <Plus className="w-4 h-4 text-outline" />
            <div className="w-24 h-24 border border-outline-variant p-2 bg-surface-container-low rounded overflow-hidden">
              <img 
                alt="Strippers" 
                className="w-full h-full object-cover mix-blend-multiply" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChi9dVc38iBebYNsy2Wyrr5Wja4zpBnw1gg6NKyh3MmJIn1JAp8dRwESzyIgILZi8h2fdgwclmepi0B5s53gnfiZajmoYZeC9DgYKSfaB1l5zh10AwVsOgnLSuSsA6f9Cf-aK9SuR0P4bX5XbiJUEhS1G0VFlw20IiM7UEfVMEH6POhB-0cvv_9VOlJfvBIaPhh9wXN6N6SdxY2ar3x7qP81dR2V6AO0S4jPEhqnXxLAIUrfvYR1bcaZYjKNKiPWfAKjHr_fVFawjO" 
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Total price:</span>
              <span className="text-2xl font-black text-secondary">$128.42</span>
            </div>
            <button className="bg-secondary-container hover:brightness-105 text-on-secondary-fixed px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm transition-all border border-secondary/20">
              Add all 3 to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-2xl font-black text-on-surface mb-6 tracking-tighter">Customer Reviews</h2>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex text-secondary fill-current">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <StarHalf className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-black">4.8 out of 5</span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">2,458 ratings</span>
          <div className="mt-8 space-y-4">
            {[
              ['5 star', 82],
              ['4 star', 12],
              ['3 star', 4],
              ['2 star', 1],
              ['1 star', 1]
            ].map(([label, percent]) => (
              <div key={label as string} className="flex items-center gap-3">
                <span className="text-[10px] font-bold w-10 uppercase tracking-widest">{label}</span>
                <div className="flex-1 h-3 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-container" style={{ width: `${percent}%` }}></div>
                </div>
                <span className="text-[10px] font-bold w-8 text-right">{percent}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-8">
          <div className="space-y-12">
            {[
              {
                user: 'James M.',
                title: 'Great for home wiring',
                date: 'November 12, 2023',
                content: 'The Simpull technology really does make a difference. Pulled about 40 feet through studs without a snag. High quality copper and the jacket strips cleanly. Worth the few extra bucks over the generic stuff.'
              },
              {
                user: 'Lisa R.',
                title: 'Standard solid wire',
                date: 'January 4, 2024',
                content: "It's wire. It works. The 100ft roll is a good size for adding a few outlets in a basement. No issues at all with delivery or quality."
              }
            ].map((review, i) => (
              <div key={i} className="pb-8 border-b border-outline-variant/30 last:border-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/50 shadow-inner">
                    <span className="text-xs font-black text-on-surface-variant">{review.user[0]}</span>
                  </div>
                  <span className="text-sm font-black tracking-tight">{review.user}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex text-secondary fill-current scale-75 origin-left">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-sm font-black tracking-tight">{review.title}</span>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Reviewed on {review.date}</p>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{review.content}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1 hover:underline">
            See all customer reviews
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
