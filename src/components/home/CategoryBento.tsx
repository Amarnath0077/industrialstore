import { Scissors } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function CategoryBento() {
  return (
    <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Large Featured Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 bg-surface-container-lowest border border-outline-variant p-6 shadow-md flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-1">Circuit Breakers & Load Centers</h3>
            <p className="text-on-surface-variant text-sm mb-4">Premium protection for industrial and commercial power distribution systems.</p>
          </div>
          <Link to="/circuit-breakers" className="h-64 mb-4 overflow-hidden rounded-lg bg-surface-container block">
            <img 
              alt="Circuit Breakers" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArySBP8sM9YAEMf0cD7zY--ruu3FOl3KkTVimfVbYhakLMytf14NBP-kQXFRKHgSMNCf_chp2V2gZ45vV7Ns5_5LSNho0wyjdHE4Ou8i8Xe6oLGMjRCkGNbmAnsoQFDkBmFG454--lkh1QoNbQhjpVlEZtX7b68pQCykdRXLdSqbfdZ0yl9UNXSZCTs_J3UAI3479zW9Q2YscNpZ38_7ofMdlBI3O1UJ6sCE222S70wy0dMiv1pCt-h1zW2jmgHUYL1IE7cz9Py4VJ" 
            />
          </Link>
          <div className="grid grid-cols-2 gap-2">
            {['1-Pole Breakers', '3-Pole Breakers', 'Enclosures', 'Bus Bars'].map(link => (
              <Link key={link} className="text-secondary text-xs font-bold hover:underline" to="/circuit-breakers">{link}</Link>
            ))}
          </div>
        </motion.div>

        {/* Small Cards */}
        {[
          {
            title: 'Conduit & Raceway',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQs-QTShZO1GSZm2cHaGjGn0jbuMkN14YHKYnvUOvVhkYVvYbVzhsVUjl3zHniuCWqf0Ead6UPUV6eJ8xiFUdzF4VuN5gQmJSCEIYiOY_M6bjTfqFQtQMgBpvvDPJGxF0i99H9w_7Qz2p0KeaKXY5iKRtnk3KXM55Pm1Jfe2OuiSr0yyEI4Mbs0sTNBDOyURGoMh5cRBL8ZZYsK4SeUWkWo0KxK-qYJGE15nlPdwqir5dwP-KmHCIlZZysIMyyuP7iMocLZOfQr3na',
            link: 'Shop Rigid & EMT →'
          },
          {
            title: 'Wire & Cable',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI_Ee_a0X496RGnXb4vWwjFd01kTBQWuPCP_upI5Lp1XxQny5UsFXJvesfSKuI7zWs8ZDzSWIYLJan22waKfGobHzYXcwJZROJZNS-cDLRFkkVEM2eO8K0uKDxFTO2MeuaQv1ISMgGKmlKxePj8f0U7peE865gfkIBysMBZxY_stuNyiYYRWMydJQkf6rvzGdd9d-fU3uaZqNtwoXUSeA6FNWIpGJBZwoedafKix9jyLyCO6qI1yywxAFjmpt-p4jUKoHxasTVL4sA',
            link: 'Shop THHN & XHHW →'
          },
          {
            title: 'Industrial Lighting',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXRewXLWJBKNiZgxZonttpwCBUS7LSskchPQ_UYfSRg3-IW8_wyTPpeWUMidTFUih9VLlwC4A2N7cBiUWNwQ6_VIY49c8INOJYtlFsRF9GXcbGIawnMeByRS_f62S4OFRHGOIkkkmiSMPp1nLu_TnRb2LPKJx_ydkV6NDQ3WuS4swVXrvwKAzYzjNMar8H6KdrHLcPXCHcXoPpXz6aYb9srhm12Cxou_4dLeR98DfevX1u5dUGB-2fNgrZdJh7gWmYO_qeVM-39oQb',
            link: 'Shop LED High Bay →'
          }
        ].map((cat, idx) => (
          <motion.div 
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container-lowest border border-outline-variant p-4 shadow-md flex flex-col"
          >
            <h3 className="font-semibold text-base mb-2">{cat.title}</h3>
            <div className="flex-1 bg-surface-container-low mb-2 rounded overflow-hidden">
              <img alt={cat.title} className="w-full h-full object-cover transition-transform hover:scale-105" src={cat.img} />
            </div>
            <a className="text-secondary text-xs font-bold hover:underline" href="#">{cat.link}</a>
          </motion.div>
        ))}

        {/* Service Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-primary-container text-on-primary p-4 shadow-md flex flex-col justify-between border border-primary"
        >
          <div className="flex items-center gap-2 mb-2">
            <Scissors className="w-5 h-5 text-secondary-container" />
            <h3 className="font-semibold text-base">Bulk Wire Cutter</h3>
          </div>
          <p className="text-xs text-on-primary-container mb-4 leading-relaxed">
            Custom length wire cutting service for any project size. Free shipping on reels over 500ft.
          </p>
          <button className="w-full bg-secondary-container text-on-secondary-fixed py-2 text-xs font-bold rounded hover:brightness-105 transition-all">
            Start Custom Order
          </button>
        </motion.div>
      </div>
    </section>
  );
}
