import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WhyChooseUsSlider from '../components/common/WhyChooseUsSlider';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentWhyChooseSlide, setCurrentWhyChooseSlide] = useState(0);

  const slides = [
    {
      image: "/images/smart-home-1.jpg",
      alt: "Modern smart home automation",
      caption: "Transform your living space with smart automation"
    },
    {
      image: "/images/smart-home-2.jpg",
      alt: "Home security system",
      caption: "Advanced security for peace of mind"
    },
    {
      image: "/images/smart-home-3.jpg",
      alt: "Smart home controls",
      caption: "Intuitive control at your fingertips"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const principles = [
    {
      title: "Simplicity",
      description: "Designing intuitive systems that eliminate hassle and make life easier."
    },
    {
      title: "Efficiency",
      description: "Helping you reclaim time by automating the mundane, so you can focus on what matters."
    },
    {
      title: "Empowerment",
      description: "Giving you complete control over your home with seamless, personalized automation."
    }
  ];

  const leadershipTeam = [
    {
      name: "John Smith",
      position: "Chief Executive Officer",
      image: "/images/leader-1.jpg",
      description: "20+ years of experience in home automation"
    },
    {
      name: "Sarah Johnson",
      position: "Chief Technology Officer",
      image: "/images/leader-2.jpg",
      description: "Expert in smart home integration"
    },
    {
      name: "Michael Chen",
      position: "Head of Design",
      image: "/images/leader-3.jpg",
      description: "Innovative design solutions specialist"
    },
    {
      name: "Emily Brown",
      position: "Customer Success Director",
      image: "/images/leader-4.jpg",
      description: "Dedicated to exceptional service delivery"
    }
  ];

  const whyChooseUs = [
    {
      title: "Personalized & Scalable Designs",
      description: "From single-room makeovers to full-home transformations, we adapt to your needs."
    },
    {
      title: "Seamless Virtual & In-Person Consultation",
      description: "Connect with our designers from anywhere through advanced digital tools."
    },
    {
      title: "Efficient Project Planning & Execution",
      description: "We streamline the design process with technology, ensuring a smooth and hassle-free experience."
    }
  ];

  const nextWhyChooseSlide = () => {
    setCurrentWhyChooseSlide((prev) => (prev + 1) % whyChooseUs.length);
  };

  const prevWhyChooseSlide = () => {
    setCurrentWhyChooseSlide((prev) => (prev - 1 + whyChooseUs.length) % whyChooseUs.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Slider Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h2 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
                  {slide.caption}
                </h2>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                <span className="sr-only">Slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Mission</h1>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              Our mission is to simplify everyday life through seamless home automation, giving you more time for what truly matters—living life. By integrating cutting-edge technology with intuitive design, we create smart, efficient, and personalized living experiences—so your home works for you, not the other way around.
            </p>
            <p>
              With a focus on ease, security, and convenience, we empower individuals and families to take control of their space effortlessly, making every interaction smarter, smoother, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* What Drives Us Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Drives Us?</h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              We are driven by a deep passion for innovation, efficiency, and the power of automation to transform daily life. We believe that technology should work for you—not create more complexity.
            </p>
            
            <h3 className="text-2xl font-semibold mt-8 mb-6">Our commitment is rooted in three key principles:</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-3">{principle.title}</h4>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              ))}
            </div>

            <p className="mt-8">
              We are inspired by the idea that a well-designed smart home is more than just convenience—it's about freedom, security, and balance. Our goal is to create smarter living spaces that enhance comfort, improve well-being, and bring peace of mind to every home we touch.
            </p>
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Message from the Owner</h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              We believe that technology should make life simpler, not more complicated. When I first started this journey, I saw how overwhelming and time-consuming managing a home could be—juggling daily tasks, security, energy efficiency, and comfort. I knew there had to be a better way.
            </p>
            <p>
              That's why we created a seamless home automation experience—one that puts you in control while removing the stress of everyday routines. Our mission is to design solutions that fit effortlessly into your life, giving you back your most valuable resource—time.
            </p>
            <p>
              Whether you're a busy professional, a parent managing a household, or simply someone who values ease and efficiency, our team is here to help you create a smarter, more intuitive home.
            </p>
            <p>
              We're not just building technology—we're building a better way to live. And we can't wait to bring that vision to your home.
            </p>
            <div className="mt-8">
              <p className="font-semibold">[Owner's Name]</p>
              <p>Founder & CEO, [Your Company Name]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
                  <p className="text-blue-600 mb-3">{leader.position}</p>
                  <p className="text-gray-600 text-sm">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSlider />

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Ready to get Started?</h2>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Book your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
