import { ReceiptText, Layers, BadgeCheck, Wallet, ArrowRight, UploadCloud } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProAccount() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Value Proposition Header */}
      <section className="mb-12 text-center md:text-left bg-surface-container-lowest p-8 border border-outline-variant rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-black text-primary mb-2 tracking-tighter">Join IndustrialStore Pro - Built for Professionals.</h1>
            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Streamline your procurement process with tools designed for heavy industry, construction, and manufacturing. Get the financial flexibility and dedicated support your business demands.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <button className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 group">
              Learn more about Pro benefits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Benefits & Hero Info */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-surface-container-low p-6 border border-outline-variant rounded-lg">
            <h2 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-6">Exclusive Business Benefits</h2>
            <ul className="space-y-6">
              {[
                { icon: ReceiptText, title: 'Tax-Exempt Purchasing', desc: 'Apply your tax-exempt status across all eligible industrial categories automatically at checkout.' },
                { icon: Layers, title: 'Volume Multi-Tier Pricing', desc: 'Unlock significant discounts on bulk orders. The more your business buys, the more you save.' },
                { icon: BadgeCheck, title: 'Dedicated Account Management', desc: 'Get a single point of contact for sourcing hard-to-find components and logistics coordination.' },
                { icon: Wallet, title: 'Business Line of Credit', desc: 'Manage cash flow with flexible net-30 terms and dedicated credit lines for large projects.' }
              ].map(benefit => (
                <li key={benefit.title} className="flex items-start gap-4">
                  <benefit.icon className="w-6 h-6 text-secondary shrink-0" />
                  <div>
                    <span className="text-sm font-bold block mb-1">{benefit.title}</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-72 rounded-lg overflow-hidden border border-outline-variant shadow-lg group">
            <img 
              alt="Industrial professional in a warehouse environment" 
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp72Mdj0spPmgvGZbegXCTywrXfsjKmo-Lth7yyMQGhjcHXpvs4AZRpslT88sJ82f9TuDBjA1kSMn_4F26pkdXHHsyQoW2NNoyfWCvHMNhCNqvw1p2X63F5yLfKnZydHUN_JMcX4rRG7fMOYBwHPHVuBRmvEMWtC8mM2W9PKIdaYxoeHClnlQBYWwZYU6JwqJImouNqe3Vh_lXDRhm0n8IkD7Bhc17aP6KqoIxpzT4EYp5iPGp3NtdUeiG6BjeaUW94bVzyUjfJ6t5" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-white text-[10px] font-bold uppercase tracking-widest mb-2">Trusted by over 50k firms</span>
              <p className="text-white text-xs italic leading-relaxed">
                "Switching to IndustrialStore Pro saved our electrical contracting firm 14% on annual supplies."
              </p>
            </div>
          </div>
        </aside>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-8 shadow-sm">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Column 1: Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary border-b border-outline-variant pb-2 tracking-tight">Contact Information</h3>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Full Name</label>
                  <input className="border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="e.g. Robert Smith" type="text"/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Job Title</label>
                  <input className="border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="e.g. Procurement Manager" type="text"/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Business Email</label>
                  <input className="border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="robert.smith@company.com" type="email"/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Phone Number</label>
                  <input className="border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="+1 (555) 000-0000" type="tel"/>
                </div>
              </div>

              {/* Column 2: Company Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary border-b border-outline-variant pb-2 tracking-tight">Company Details</h3>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Legal Company Name</label>
                  <input className="border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Enter full legal name" type="text"/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Industry Type</label>
                  <select className="border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all bg-white cursor-pointer">
                    <option>Select Industry</option>
                    <option>Electrical Contracting</option>
                    <option>Manufacturing</option>
                    <option>Construction</option>
                    <option>Oil & Gas</option>
                    <option>Renewable Energy</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Annual Industrial Spend</label>
                  <select className="border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all bg-white cursor-pointer">
                    <option>$0 - $50,000</option>
                    <option>$50,000 - $250,000</option>
                    <option>$250,000 - $1,000,000</option>
                    <option>$1,000,000+</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">HQ Address</label>
                  <input className="border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Street, City, State, ZIP" type="text"/>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-surface-container p-8 border-2 border-dashed border-outline-variant rounded-lg">
              <div className="flex flex-col items-center text-center space-y-4">
                <UploadCloud className="w-10 h-10 text-outline" />
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Upload Business Certification</h4>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-sm">Attach Tax-Exempt Form, Business License, or Articles of Incorporation (PDF, JPG, PNG)</p>
                </div>
                <button 
                  type="button"
                  className="bg-surface-container-lowest border border-outline-variant px-6 py-2 text-xs font-bold hover:bg-surface-container-low transition-colors rounded shadow-sm"
                >
                  Select Files
                </button>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col items-center gap-4 pt-8 border-t border-outline-variant">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full md:w-96 bg-secondary-container text-on-secondary-fixed font-black text-lg py-4 rounded-lg shadow-md hover:brightness-105 transition-all tracking-tighter"
              >
                Submit Application
              </motion.button>
              <p className="text-[10px] text-on-surface-variant text-center max-w-md leading-relaxed uppercase font-bold tracking-widest opacity-60">
                By submitting, you agree to the IndustrialStore Pro Terms of Service and Privacy Policy. Most applications are reviewed within 1-2 business days.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
