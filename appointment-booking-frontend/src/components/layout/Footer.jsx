import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Footer = () => {
    return (
        <footer className="bg-primary text-background relative overflow-hidden pt-16 pb-8">
            {/* Vertical Lines */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 pointer-events-none md:left-8"></div>
            <div className="absolute right-4 top-0 bottom-0 w-px bg-white/10 pointer-events-none md:right-8"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="font-serif text-2xl mb-4 font-bold">Triple Lyoness Farm</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                            Family-run, pasture-raised beef, chicken, turkey, free-range pork and eggs. Locally produced with care.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            {['solar:facebook-linear', 'solar:instagram-linear', 'solar:twitter-linear'].map((icon) => (
                                <a key={icon} href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-primary transition-colors text-white">
                                    <Icon icon={icon} width="20" height="20" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-accent mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Our Products', path: '/products' },
                                { name: 'Our Farm', path: '/our-farm' },
                                { name: 'Contact Us', path: '/contact' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-white/70 hover:text-accent transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-accent mb-6 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-3 text-white/70 text-sm">
                            <li className="flex items-start gap-3">
                                <Icon icon="solar:map-point-linear" width="20" height="20" className="mt-1 shrink-0" />
                                <span>Rural Canada<br />(Family Farm)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Icon icon="solar:letter-linear" width="20" height="20" className="shrink-0" />
                                <a href="mailto:info@triplelyoness.com" className="hover:text-accent">info@triplelyoness.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-accent mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
                        <p className="text-white/70 text-sm mb-4">Subscribe for farm updates and product availability.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your email" className="bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-2 text-sm w-full focus:outline-none focus:border-accent" />
                            <button className="bg-accent text-primary px-4 py-2 font-medium text-sm hover:bg-white transition-colors">
                                <Icon icon="solar:arrow-right-linear" width="20" height="20" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
                    <p>© 2025 Triple Lyoness Farm. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
