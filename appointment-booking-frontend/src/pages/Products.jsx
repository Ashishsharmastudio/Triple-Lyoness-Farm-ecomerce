import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const { products } = useProducts();
    const [filterCategory, setFilterCategory] = useState(categoryParam || 'All');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart, toggleCart } = useCart();

    // Dynamically derive categories from products + defaults
    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = filterCategory === 'All' ? true : product.category === filterCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [products, filterCategory, searchQuery]);

    const handleCategoryClick = (cat) => {
        setFilterCategory(cat);
        // Clean up URL if All or set it
        if (cat === 'All') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category: cat });
        }
    };

    const groupedProducts = useMemo(() => {
        // If sorting by category "All", display headers for each.
        if (filterCategory !== 'All') return { [filterCategory]: filteredProducts };

        return filteredProducts.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        }, {});
    }, [filteredProducts, filterCategory]);

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header */}
            <div className="bg-primary text-white py-12 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-serif font-bold mb-4">Shop our Products</h1>
                    <p className="max-w-2xl mx-auto text-white/80">
                        Products are updated with availability as soon as we are able, however sometimes we are delayed and some items might be sold out. Prices are subject to change without notice. Thank you and happy shopping!
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border rounded transition-colors ${filterCategory === cat
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white text-primary border-primary/20 hover:border-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2 border border-primary/20 rounded focus:border-primary focus:outline-none"
                        />
                        <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" />
                    </div>
                </div>

                {/* Product List */}
                <div className="space-y-16">
                    {Object.entries(groupedProducts).length === 0 ? (
                        <div className="text-center py-20 text-text/50">
                            <h3 className="text-xl">No products found.</h3>
                        </div>
                    ) : (
                        Object.entries(groupedProducts).map(([category, products]) => (
                            <section key={category}>
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-primary">{category} Products</h2>
                                    <div className="h-px bg-primary/10 flex-1"></div>
                                </div>

                                {/* Specialized Notes for categories */}
                                {category === 'Turkey' && <p className="mb-6 text-sm italic text-secondary">*Send us an email to get your name on the list for 2025!</p>}
                                {category === 'Bulk Beef' && <p className="mb-6 text-sm italic text-secondary">*Taking orders now for spring 2026. Sold out of butcher dates for 2025.</p>}
                                {category === 'Bulk Pork' && <p className="mb-6 text-sm italic text-secondary">*Taking orders now for spring 2026.</p>}
                                {category === 'Lamb' && <p className="mb-6 text-sm italic text-secondary">We partner with neighbouring farms that raise their lambs out on pasture with added grain...</p>}
                                {category === 'Bulk Lamb' && <p className="mb-6 text-sm italic text-secondary">*Contact us to get your name on our list for fall 2026 butcher dates!</p>}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {products.map(product => {
                                        const isSoldOut = product.status === 'Sold Out';
                                        return (
                                            <div key={product.id} className={`bg-white border rounded-lg overflow-hidden transition-all hover:shadow-lg flex flex-col ${isSoldOut ? 'border-gray-200 opacity-75' : 'border-primary/10'}`}>
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-accent">{product.category}</span>
                                                        <span className={`text-xs px-2 py-1 rounded font-bold ${isSoldOut ? 'bg-gray-100 text-gray-500' : 'bg-primary/10 text-primary'}`}>
                                                            {product.status}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-bold text-lg text-primary mb-2 capitalize">{product.name}</h3>
                                                    <p className="text-secondary font-medium mt-auto">{product.price}</p>
                                                </div>
                                                <div className="p-4 border-t border-gray-100 bg-gray-50">
                                                    <button
                                                        onClick={() => {
                                                            addToCart(product);
                                                            toggleCart();
                                                        }}
                                                        disabled={isSoldOut}
                                                        className={`w-full py-2 font-bold uppercase tracking-wider text-sm transition-colors rounded ${isSoldOut
                                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                                : 'bg-primary text-white hover:bg-primary/90'
                                                            }`}
                                                    >
                                                        {isSoldOut ? 'Sold Out' : 'Add to Cart'}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
