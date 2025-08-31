import React from 'react';
import HeroSection from '../HeroSection';
import StatsRow from '../StatsRow';
import FeaturesSection from '../FeaturesSection';
import CodeShowcase from '../CodeShowcase';
import TestimonialsSlider from '../TestimonialsSlider';
import ApproachSection from '../ApproachSection';
import ProductsMarquee from '../ProductsMarquee';
import CTASection from '../CTASection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      <HeroSection onNavigate={onNavigate} />
      <StatsRow />
      <FeaturesSection onNavigate={onNavigate} />
      <CodeShowcase />
      <TestimonialsSlider />
      <ApproachSection />
      <ProductsMarquee />
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};

export default HomePage;