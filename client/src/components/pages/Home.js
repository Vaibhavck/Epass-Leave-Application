import React from 'react';
import '../../App.css';
import Cards from '../shared/Cards';
import HeroSection from '../HeroSection';
import Footer from '../shared/Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
    </>
  );
}

export default Home;