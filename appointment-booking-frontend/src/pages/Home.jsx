import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/slideshow_1.webp',
    '/slideshow_3.webp',
    '/slideshow_4.webp',
    '/slideshow_5.webp'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Premium Redesign with Image Slideshow */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-secondary text-background overflow-hidden">
        {/* Animated Image Slideshow Background */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-2000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center animate-ken-burns"
                style={{
                  backgroundImage: `url(${slide})`,
                  animationDelay: `${index * 5}s`
                }}
              ></div>
            </div>
          ))}
          {/* Dark Overlay for text readability - reduced opacity to show images */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Animated Background Elements - Removed for cleaner look */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid Pattern - Very subtle */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full animate-slide-down">
              <Icon icon="solar:leaf-linear" className="text-accent" width="20" />
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Est. Rural Canada</span>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading with Gradient */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-8 animate-fade-in-up">
              <span className="block bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-gradient-shift">
                Triple Lyoness
              </span>
              <span className="block text-white mt-2 animate-fade-in-up delay-200">Farm</span>
            </h1>

            {/* Subtitle with Icon */}
            <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in-up delay-300">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent"></div>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wide">
                Pasture-Raised Excellence
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up delay-400">
              {['Beef', 'Chicken', 'Turkey', 'Pork', 'Eggs'].map((item, i) => (
                <span
                  key={item}
                  className="px-5 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/80 hover:bg-white/10 hover:border-accent/50 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <Link
                to="/products"
                className="group relative px-10 py-5 bg-accent text-primary font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/50 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Shop Products
                  <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" width="20" />
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>

              <Link
                to="/our-farm"
                className="group px-10 py-5 border-2 border-white/30 text-white font-bold uppercase tracking-wider backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Our Story
                <Icon icon="solar:heart-linear" className="group-hover:scale-110 transition-transform" width="20" />
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce-slow">
              <div className="flex flex-col items-center gap-2 text-white/60">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <Icon icon="solar:alt-arrow-down-linear" width="24" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/10"></div>
      </section >

      {/* Intro Section */}
      < section className="py-24 bg-background relative" >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Our Story</span>
            <h2 className="text-4xl font-serif font-bold text-primary mb-8">Welcome to our Family Farm</h2>
            <div className="prose prose-lg mx-auto text-text/80 leading-relaxed">
              <p className="mb-6">
                Triple Lyoness Farm is family run and operated by the three Carlyon daughters; Andria, Jessica, Briana, and their parents; Rod and Janet Carlyon. We created the name Triple Lyoness to represent the three Carlyon daughters. Our family is proud to produce pastured raised beef, chicken and turkey and free range pork and eggs.
              </p>
              <p>
                Together, we maintain a small rural farming business that is not specialized in one area of agriculture. Instead, we choose to be diverse and have many different means of production. As the main operators, Rod and Janet are the core to a successful enterprise providing constant care to the animals, record keeping, and labor. The three daughters have contributed in many ways on the farm throughout their life and continue to immerse themselves in the agriculture industry while helping with large tasks on the farm and marketing meat products.
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* Product Highlight Section */}
      < section className="py-24 bg-white" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Farm Fresh Products</h2>
            <p className="text-text/60">Pasture-raised and ethically produced.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Chicken', icon: 'solar:chef-hat-heart-linear' }, // Placeholder icon
              { name: 'Turkey', icon: 'solar:star-linear' },
              { name: 'Beef', icon: 'solar:medal-ribbon-star-linear' },
              { name: 'Pork', icon: 'solar:heart-linear' },
              { name: 'Lamb', icon: 'solar:leaf-linear' },
              { name: 'Eggs', icon: 'solar:sun-2-linear' },
            ].map((cat) => (
              <Link key={cat.name} to={`/products?category=${cat.name}`} className="group relative overflow-hidden bg-background border border-primary/10 hover:border-primary/30 transition-all duration-300 p-8 flex flex-col items-center justify-center text-center aspect-[4/3] hover:shadow-xl">
                <div className="mb-6 p-4 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon icon={cat.icon} width="40" height="40" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">{cat.name}</h3>
                <span className="text-sm uppercase tracking-wider text-secondary font-medium group-hover:underline decoration-secondary underline-offset-4">View Products</span>
              </Link>
            ))}
          </div>
        </div>
      </section >

      {/* Latest News Teaser */}
      < section className="py-24 bg-background border-t border-primary/5" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="mb-6 md:mb-0">
              <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Journal</span>
              <h2 className="text-4xl font-serif font-bold text-primary">Latest News</h2>
            </div>
            <Link to="/news" className="text-primary font-bold uppercase tracking-wider hover:text-secondary transition-colors flex items-center gap-2">
              View All Posts <Icon icon="solar:arrow-right-linear" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 md:p-12 border border-primary/10 shadow-sm">
              <span className="text-xs font-bold text-accent uppercase tracking-wider mb-4 block">December 5, 2020</span>
              <h3 className="text-3xl font-serif font-bold text-primary mb-6">World Soil Day 2020</h3>
              <p className="text-text/70 mb-8 leading-relaxed">
                Hey everyone, this weekend, on December 5 was INTERNATIONAL Soil Day and I wanted to share my view on the topic. Soil is just one of the many moving parts...
              </p>
              <Link to="/news/world-soil-day-2020" className="inline-block px-6 py-3 border border-primary/20 text-primary uppercase text-sm font-bold tracking-wider hover:bg-primary hover:text-white transition-all">
                Read Full Article
              </Link>
            </div>
            <div className="relative h-full min-h-[300px] bg-primary/5 flex items-center justify-center">
              {/* Placeholder for blog image */}
              <div className="text-primary/20">
                <Icon icon="solar:gallery-linear" width="64" height="64" />
              </div>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};

export default Home;
