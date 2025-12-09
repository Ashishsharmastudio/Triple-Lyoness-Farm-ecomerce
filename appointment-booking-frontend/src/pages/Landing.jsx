import React from 'react';
import { Link } from 'react-router-dom';
import WhyChooseUsSlider from '../components/common/WhyChooseUsSlider';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Take the first step toward a smarter, more effortless life.
          </h1>
          <p className="text-xl mb-8">
            Book your consultation today and let's design a home that works for you—not the other way around!
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUsSlider />
    </div>
  );
};

export default Landing; 