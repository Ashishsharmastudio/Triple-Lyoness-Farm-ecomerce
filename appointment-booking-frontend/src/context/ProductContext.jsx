import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const API_URL = 'http://localhost:5000/api/services';

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            // Backend returns { success: true, data: [...] }
            if (response.data.success) {
                // Map _id to id for frontend compatibility
                const mappedProducts = response.data.data.map(p => ({
                    ...p,
                    id: p._id
                }));
                setProducts(mappedProducts);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const updateProduct = async (updatedProduct) => {
        try {
            const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
            if (response.data.success) {
                setProducts(prev => prev.map(p => p.id === updatedProduct.id ? { ...response.data.data, id: response.data.data._id } : p));
            }
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    const addProduct = async (newProduct) => {
        try {
            // Backend expects 'category', 'name', 'price', etc.
            // We need to ensure we don't send 'id' or 'new' as ID.
            const { id, ...productData } = newProduct;
            const response = await axios.post(API_URL, productData);
            if (response.data.success) {
                const savedProduct = { ...response.data.data, id: response.data.data._id };
                setProducts(prev => [...prev, savedProduct]);
            }
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, updateProduct, addProduct, deleteProduct, loading }}>
            {children}
        </ProductContext.Provider>
    );
};
