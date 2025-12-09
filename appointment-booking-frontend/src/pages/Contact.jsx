import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="max-w-xl mx-auto text-white/80">
            Have questions or want to place a bulk order? Reach out to us.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary mb-8">Get In Touch</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                  <Icon icon="solar:map-point-linear" width="24" height="24" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Location</h3>
                  <p className="text-text/70">Rural Canada (Family Farm)</p>
                  <p className="text-sm text-text/50 mt-1">Pickup details provided upon order confirmation.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                  <Icon icon="solar:letter-linear" width="24" height="24" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <a href="mailto:info@triplelyoness.com" className="text-text/70 hover:text-primary transition-colors">info@triplelyoness.com</a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-black/5 rounded-lg h-64 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=52.1332, -106.6700&zoom=8&size=600x300')] bg-cover opacity-50 grayscale hover:grayscale-0 transition-all"></div>
                {/* Note: Static map URL is dummy w/o key, relying on placeholder styling mainly */}
                <span className="relative z-10 bg-white px-4 py-2 rounded shadow text-sm font-bold flex items-center gap-2">
                  <Icon icon="solar:map-point-bold" className="text-red-500" /> Farm Location
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 border border-primary/10 shadow-lg rounded-sm">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Send a Message</h2>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Icon icon="solar:check-circle-linear" width="32" height="32" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
                <p className="text-text/70">Thank you for contacting us. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Name</label>
                    <input required type="text" className="w-full px-4 py-3 bg-background border border-primary/20 focus:border-primary focus:outline-none transition-colors" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Email</label>
                    <input required type="email" className="w-full px-4 py-3 bg-background border border-primary/20 focus:border-primary focus:outline-none transition-colors" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Phone (Optional)</label>
                  <input type="tel" className="w-full px-4 py-3 bg-background border border-primary/20 focus:border-primary focus:outline-none transition-colors" placeholder="(555) 123-4567" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Subject</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-background border border-primary/20 focus:border-primary focus:outline-none appearance-none transition-colors">
                      <option>General Question</option>
                      <option>Order Request</option>
                      <option>Bulk Beef Order</option>
                      <option>Bulk Pork Order</option>
                      <option>Bulk Lamb Order</option>
                    </select>
                    <Icon icon="solar:alt-arrow-down-linear" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Message</label>
                  <textarea required rows="5" className="w-full px-4 py-3 bg-background border border-primary/20 focus:border-primary focus:outline-none transition-colors" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
