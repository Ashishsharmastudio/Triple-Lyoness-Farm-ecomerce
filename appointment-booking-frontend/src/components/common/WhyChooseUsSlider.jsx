import React, { useState } from 'react';

const WhyChooseUsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const items = [
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="overflow-hidden mx-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {items.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white p-8 rounded-lg shadow-lg mx-4">
                      <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-blue-600 scale-110' : 'bg-gray-300 hover:bg-blue-400'
                }`}
              >
                <span className="sr-only">Slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSlider; 