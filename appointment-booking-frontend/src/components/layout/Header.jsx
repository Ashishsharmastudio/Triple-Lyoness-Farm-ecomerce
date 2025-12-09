import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="group flex items-center gap-3">
                    <div className="relative w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                        <Icon icon="solar:leaf-bold-duotone" width="24" height="24" />
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif font-bold text-xl text-primary leading-none tracking-tight">Triple Lyoness</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/80">Farm &bull; Est. 1985</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Our Products', path: '/products' },
                        { name: 'Our Farm', path: '/our-farm' },
                        { name: 'Contact Us', path: '/contact' },
                    ].map((link, index) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${isActive ? 'text-primary border-b-2 border-primary' : 'text-text/70'
                                }`
                            }
                        >
                            <div className="flex flex-col items-center group">
                                <span className="text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3">0{index + 1}</span>
                                {link.name}
                            </div>
                        </NavLink>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-text">
                            <Icon icon="solar:magnifer-linear" width="24" height="24" />
                        </button>
                        {/* Simple Search Input Popup */}
                        <div className={`absolute right-0 top-full mt-2 bg-white border border-primary/20 p-2 shadow-lg rounded-md w-64 transition-all duration-200 ${isSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                            <input type="text" placeholder="Search products..." className="w-full px-3 py-2 bg-background border border-primary/20 rounded text-sm focus:outline-none focus:border-primary" />
                        </div>
                    </div>

                    <button onClick={toggleCart} className="relative p-2 hover:bg-primary/10 rounded-full transition-colors text-text">
                        <Icon icon="solar:cart-large-2-linear" width="24" height="24" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-text">
                        <Icon icon="solar:hamburger-menu-linear" width="24" height="24" />
                    </button>
                </div>
            </div>

            {/* Decorative vertical lines */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/5 pointer-events-none md:left-8"></div>
            <div className="absolute right-4 top-0 bottom-0 w-px bg-primary/5 pointer-events-none md:right-8"></div>
        </header>
    );
};

export default Header;
