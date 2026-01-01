import React from 'react';
import Header from './components/header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Story from './components/Story';
import Transition from './components/Transition';
import Instagram from './components/Instagram';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Story />
        <Transition />
        <Instagram />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
