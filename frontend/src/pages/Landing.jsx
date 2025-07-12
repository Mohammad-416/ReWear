import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import FeaturedCarousel from '../components/FeaturedCarousel';

const Landing = () => {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />
      <Hero />
      <CTASection />
      <FeaturedCarousel />
    </div>
  );
};

export default Landing;
