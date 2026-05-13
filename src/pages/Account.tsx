import { Package, Lock, Award, MapPin, CreditCard, Gift, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const accountLinks = [
  {
    title: 'Your Orders',
    desc: 'Track, return, or buy things again',
    icon: Package,
    href: '/history'
  },
  {
    title: 'Login & Security',
    desc: 'Edit login, name, and mobile number',
    icon: Lock,
    href: '#'
  },
  {
    title: 'Prime',
    desc: 'View benefits and payment settings',
    icon: Award,
    href: '#'
  },
  {
    title: 'Your Addresses',
    desc: 'Edit addresses for orders and gifts',
    icon: MapPin,
    href: '#'
  },
  {
    title: 'Payment options',
    desc: 'Edit or add payment methods',
    icon: CreditCard,
    href: '#'
  },
  {
    title: 'Gift cards',
    desc: 'View balance or redeem a card',
    icon: Gift,
    href: '#'
  },
  {
    title: 'Message center',
    desc: 'View messages from us and sellers',
    icon: Mail,
    href: '#'
  }
];

const recentlyViewed = [
  {
    id: 1,
    title: 'Professional Grade Digital Precision Tool',
    price: 149.99,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB9MKAt5sTqkCRkcFIV6pocMLarIjjLm-PcgOcC1YWiXxV_RFM1oqh-ttE2DWQl-JEpV5VOszkrTmv3887lAjKV2qVaR09qABOj7pzYcDTxAsVkj1uaiyctxlQgpuSB3DJZ1_RN1EyKP4QQZfPyuOGWDgnEebbmnApURi9kMUkIsCh-D5sAG2DPW9iuPd1OD1r740l3l9aJqPJto0ZBZTGxiHG0yzcCe8IbtK-eJv7ragTnh-nO4jj6PgdeJLT9-1iHyu2qQcxmCbU'
  },
  {
    id: 2,
    title: 'Noise Cancelling Studio Headphones',
    price: 299.00,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbFugfYq2EbnWTbqR-Y_DXxTKmnG9KgL0eFdqSgXeLVp29Kmq0PriKit2l_HqVobuCYcQDDTVxrichCOjBvaII1LumNlXd7fsGsLaBe_RbEJac1GV0yrvJApU_ha-i6U0oODoqp-lGXrMXXxbxw7IrvkQ6G54lsFWx01-Q7hHoIaFWujCKzwplIk9Oe6tZQ9tzvwfCuQwyizJhQDSRvofrrV81DNp9BFrUQGrHVNk02k0KHIcalaG5cyXnWmlaNzPCudyO7aqMNb5f'
  },
  {
    id: 3,
    title: 'Compact Industrial Visual Capture System',
    price: 89.95,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkmW2YYVtj4TNmFqTpBWdhQYuE0en4DBJN6eCFYMdxJWoFLRoiaKQN0izP1rM8rgR87H53JNencaxghm9pV_nRatWrBhwfjXSeR3nojZZd56cqo66ew7PaYOeXEURjfpajZSzsJTuYXhcqmt7HRAn1RKCzvQA_HfwLrILUiof7Sfsuu8A74OF0_HI2Oac45zO1dOYHubTKhagKgW-d_CVyB4rDnMQyu9lx8YLMRrxzIV2IaBUdaRQedQ8SETtXVf7BQSl57ITtw-7O'
  },
  {
    id: 4,
    title: 'Mechanical Heavy-Duty Interface Device',
    price: 124.00,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtlBLBMjOof52N2xeTzjyjgpwudehYyPUbYztQhj8rOVVBYZgs3hW3s-M3mnlaIw_7C-DjAuPJPHr-yVl7QppO3fRmQrN_FJm3TpxwUEkmMm61M9IQaBuPZzR85lnDwHUnwmpg9z1pTBNb1WUHeuX5on_axCSvVPCVBEc9CfzDUlIPqH4oSpo4H6PtBFV-n5S9lGHbr9qOLK9Cc1ll6RPMBNeTbzJ6MT8neKUFk7gnNzPIDZKBmuLKsLfsW6xN5ZFZzQdZkfx1I1BM'
  },
  {
    id: 5,
    title: 'All-Weather Utility Commuter Pack',
    price: 75.50,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRnnBmPEzuLYd93V_xuZDfG4Ss8UlOZ8YwRj35B7ChR14ectLfLIOzWuSk_f-4UnPeInjp0AWm_M5hFuyq3orff8AMeBBIXzY0TL7WRGNSEm6vlX8Ilu8SIVYj1LaOUobwRDxglpIIZmBJqy8xwCS3SvvO9Q3mb1LeD37uSq0ifbZtx3n6LCFe0cFTnuGc2v9Uzj7rp7RQMZSlv3gcJv5aJOp9Fm-ucJKV6XBnx8UOClI7mtTupMxZHG81t2GDS2wr1HCgfb_bPNZg'
  }
];

export default function Account() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-on-surface mb-8">Your Account</h1>
      
      {/* Account Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {accountLinks.map((link, idx) => (
          <Link
            key={link.title}
            to={link.href}
            className="group"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg hover:bg-surface-container-low transition-all cursor-pointer flex items-start gap-4 h-full"
            >
              <div className="w-16 h-16 bg-surface-container-low rounded-lg flex items-center justify-center flex-shrink-0">
                <link.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-on-surface mb-1 group-hover:text-secondary transition-colors text-left">
                  {link.title}
                </h2>
                <p className="text-sm text-on-surface-variant font-medium text-left">
                  {link.desc}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Recently Viewed */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-bold text-on-surface">Recently Viewed</h2>
          <button className="text-secondary text-xs font-bold hover:underline">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {recentlyViewed.map((product) => (
            <div key={product.id} className="min-w-[180px] bg-surface-container-lowest border border-outline-variant p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-full aspect-square bg-surface-container-low rounded mb-2 overflow-hidden">
                <img className="w-full h-full object-cover mix-blend-multiply" src={product.img} alt={product.title} />
              </div>
              <p className="text-sm font-medium line-clamp-2 text-primary mb-1 h-10">{product.title}</p>
              <span className="text-xl font-bold text-on-surface">${product.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inspired by History */}
      <section>
        <h2 className="text-xl font-bold text-on-surface mb-6">Inspired by your browsing history</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-full aspect-square bg-surface-container-low rounded mb-2 overflow-hidden">
                 <div className="w-full h-full bg-surface-container flex items-center justify-center text-outline-variant">
                    <Package className="w-12 h-12" />
                 </div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1 rounded uppercase">Best Seller</span>
              </div>
              <p className="text-sm font-medium line-clamp-2 text-primary mb-1 h-10">Industrial Product Recommendation {i}</p>
              <span className="text-xl font-bold text-on-surface">$450.00</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
