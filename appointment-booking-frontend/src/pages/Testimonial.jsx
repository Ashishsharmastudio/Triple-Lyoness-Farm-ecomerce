export default function TestimonialPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=2069&q=80"
          alt="Happy customers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 to-blue-600/90"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              What Our Customers Say
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Hear from our happy customers and learn why they love BookEase.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Testimonials Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                review:
                  "BookEase has transformed how I manage appointments. It's simple, efficient, and saves me hours every week!",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "Michael Chen",
                role: "Freelance Consultant",
                review:
                  "The automated reminders are a game-changer. My clients never miss an appointment anymore!",
                image:
                  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "Emma Wilson",
                role: "Fitness Trainer",
                review:
                  "I love how easy it is to integrate BookEase with my website. My clients can book sessions anytime!",
                image:
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                />
                <h3 className="text-xl font-semibold text-center mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {testimonial.role}
                </p>
                <p className="text-gray-600 text-center italic">
                  "{testimonial.review}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Message from the Owner */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
              alt="Owner"
              className="rounded-xl shadow-xl h-[400px] object-cover"
            />
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                A Message from Our Founder
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                "At BookEase, we believe that time is your most valuable
                resource. That's why we've built a platform that simplifies
                scheduling and helps you focus on what truly matters. Our
                mission is to make appointment booking effortless for everyone."
              </p>
              <p className="text-lg text-gray-600">- Jane Doe, Founder & CEO</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "User-Friendly",
                description:
                  "Our intuitive interface makes booking a breeze for everyone.",
                icon: "😊",
              },
              {
                title: "24/7 Support",
                description: "We're always here to help, day or night.",
                icon: "📞",
              },
              {
                title: "Secure & Reliable",
                description: "Your data is safe with us, always.",
                icon: "🔒",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How do I get started with BookEase?",
                answer:
                  "Simply sign up for an account, set up your availability, and start accepting bookings in minutes!",
              },
              {
                question: "Is BookEase secure?",
                answer:
                  "Yes, we use bank-grade encryption to protect your data and ensure your privacy.",
              },
              {
                question: "Can I integrate BookEase with my website?",
                answer:
                  "Absolutely! We provide easy-to-use widgets and APIs for seamless integration.",
              },
            ].map((faq, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Ready to Simplify Your Scheduling?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and individuals who trust BookEase for
            their appointment management needs.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-4 px-12 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Now
          </button>
        </section>
      </div>
    </div>
  );
}
