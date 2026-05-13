import Hero from '../components/home/Hero';
import CategoryBento from '../components/home/CategoryBento';
import PricingTiers from '../components/home/PricingTiers';
import ProductGrid from '../components/home/ProductGrid';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryBento />
      <PricingTiers />
      <ProductGrid />
    </>
  );
}
