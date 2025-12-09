import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Icon } from '@iconify/react';

const CartDrawer = () => {
    const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderSubmitted, setOrderSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', notes: ''
    });

    if (!isCartOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend.

        // Construct mailto link as fallback/demo
        const itemsList = cartItems.map(item => `${item.quantity}x ${item.name} ($${item.price})`).join('%0D%0A');
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0ANotes: ${formData.notes}%0D%0A%0D%0AOrder:%0D%0A${itemsList}%0D%0A%0D%0ATotal (approx): $${cartTotal.toFixed(2)}`;
        const mailto = `mailto:info@triplelyoness.com?subject=New Order Request from ${formData.name}&body=${body}`;

        window.location.href = mailto;
        setOrderSubmitted(true);
        setTimeout(() => {
            clearCart();
            setIsCheckout(false);
            setOrderSubmitted(false);
            setIsCartOpen(false);
            setFormData({ name: '', email: '', phone: '', notes: '' });
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-background h-full shadow-2xl flex flex-col transform transition-transform animate-slide-in-right">
                <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-primary text-background">
                    <h2 className="text-xl font-serif font-bold">
                        {isCheckout ? 'Request Order' : `Your Cart (${cartCount})`}
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="hover:text-accent transition-colors">
                        <Icon icon="solar:close-circle-linear" width="24" height="24" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {orderSubmitted ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <Icon icon="solar:check-circle-linear" width="64" height="64" className="text-primary mb-4" />
                            <h3 className="text-2xl font-bold text-primary mb-2">Order Requested!</h3>
                            <p className="text-text/70">Thank you. We will contact you shortly to confirm availability and pickup details.</p>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-text/50">
                            <Icon icon="solar:cart-large-linear" width="48" height="48" className="mb-4 opacity-50" />
                            <p>Your cart is empty.</p>
                            <button onClick={() => setIsCartOpen(false)} className="mt-4 text-primary font-bold hover:underline">Continue Shopping</button>
                        </div>
                    ) : isCheckout ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input required type="text" className="w-full p-2 border border-primary/20 rounded focus:border-primary focus:outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input required type="email" className="w-full p-2 border border-primary/20 rounded focus:border-primary focus:outline-none" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input required type="tel" className="w-full p-2 border border-primary/20 rounded focus:border-primary focus:outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Notes / Pickup Pref</label>
                                <textarea className="w-full p-2 border border-primary/20 rounded focus:border-primary focus:outline-none" rows="3" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                            </div>

                            <div className="bg-primary/5 p-4 rounded mt-6">
                                <h4 className="font-bold mb-2 text-sm uppercase">Order Summary</h4>
                                <ul className="text-sm space-y-1 mb-2 max-h-40 overflow-y-auto">
                                    {cartItems.map(item => (
                                        <li key={item.name} className="flex justify-between text-text/70">
                                            <span>{item.quantity}x {item.name}</span>
                                            {/* Parse price for display if needed, simplified here */}
                                            {/* <span>{item.price}</span> */}
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-primary/10 pt-2 flex justify-between font-bold">
                                    <span>Total Est.</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button type="button" onClick={() => setIsCheckout(false)} className="w-full py-2 text-text/60 hover:text-text mb-2">Back to Cart</button>
                            <button type="submit" className="w-full py-3 bg-primary text-white font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">Submit Request</button>
                        </form>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.name} className="flex gap-4 border-b border-primary/5 pb-4 last:border-0">
                                    {/* Placeholder image interaction */}
                                    <div className="w-16 h-16 bg-primary/5 flex items-center justify-center shrink-0 rounded">
                                        <Icon icon="solar:box-linear" className="text-primary/40" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm text-primary">{item.name}</h4>
                                        <p className="text-xs text-text/60 mb-2">{item.price}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-primary/20 rounded overflow-hidden">
                                                <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="px-2 py-1 hover:bg-primary/10">-</button>
                                                <span className="px-2 text-sm">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="px-2 py-1 hover:bg-primary/10">+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.name)} className="text-xs text-red-500 hover:text-red-700 underline">Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {!isCheckout && cartItems.length > 0 && (
                    <div className="p-6 border-t border-primary/10 bg-background">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-text/70">Estimated Total</span>
                            <span className="font-bold text-xl text-primary">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button onClick={() => setIsCheckout(true)} className="w-full py-3 bg-secondary text-white font-bold uppercase tracking-wider hover:bg-secondary/90 transition-colors">
                            Proceed to Request
                        </button>
                        <p className="text-center text-xs text-text/40 mt-3">Payment collected upon pickup/delivery.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
