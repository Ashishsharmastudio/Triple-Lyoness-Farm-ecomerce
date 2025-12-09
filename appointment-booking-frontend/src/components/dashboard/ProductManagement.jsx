import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Icon } from '@iconify/react';

const ProductManagement = () => {
    const { products, updateProduct, addProduct, deleteProduct } = useProducts();
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);

    const startEdit = (product) => {
        setEditingId(product.id);
        setFormData(product);
        setIsAdding(false);
    };

    const startAdd = () => {
        setEditingId('new');
        setFormData({ name: '', price: '', category: 'Chicken', status: 'Available' });
        setIsAdding(true);
    };

    const handleSave = () => {
        // Validate required fields
        if (!formData.name || !formData.name.trim()) {
            alert('Product name is required');
            return;
        }
        if (!formData.price || !formData.price.trim()) {
            alert('Price is required');
            return;
        }

        if (isAdding) {
            addProduct(formData);
            setIsAdding(false);
        } else {
            updateProduct(formData);
        }
        setEditingId(null);
        setFormData({});
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({});
        setIsAdding(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-primary/10 overflow-hidden">
            <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-primary/5">
                <h2 className="text-xl font-serif font-bold text-primary">Product Management</h2>
                <button
                    onClick={startAdd}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                    <Icon icon="solar:add-circle-linear" width="20" />
                    Add Product
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-secondary uppercase tracking-wider font-bold">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isAdding && (
                            <tr className="bg-yellow-50">
                                <td className="p-4">
                                    <input
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        placeholder="Product Name"
                                        className="w-full p-2 border rounded"
                                    />
                                </td>
                                <td className="p-4">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        {['Chicken', 'Turkey', 'Beef', 'Pork', 'Bulk Beef', 'Bulk Pork', 'Bulk Lamb'].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-4">
                                    <input
                                        name="price"
                                        value={formData.price || ''}
                                        onChange={handleChange}
                                        placeholder="Price"
                                        className="w-full p-2 border rounded"
                                    />
                                </td>
                                <td className="p-4">
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Sold Out">Sold Out</option>
                                    </select>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={handleSave} className="text-green-600 font-bold hover:underline">Save</button>
                                    <button onClick={handleCancel} className="text-gray-500 hover:underline">Cancel</button>
                                </td>
                            </tr>
                        )}

                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 group">
                                <td className="p-4">
                                    {editingId === product.id ? (
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        <span className="font-medium text-primary capitalize">{product.name}</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    {editingId === product.id ? (
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        >
                                            {['Chicken', 'Turkey', 'Beef', 'Pork', 'Bulk Beef', 'Bulk Pork', 'Bulk Lamb'].map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="bg-gray-100 text-xs px-2 py-1 rounded text-secondary">{product.category}</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    {editingId === product.id ? (
                                        <input
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-600">{product.price}</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    {editingId === product.id ? (
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="Available">Available</option>
                                            <option value="Sold Out">Sold Out</option>
                                        </select>
                                    ) : (
                                        <span className={`text-xs px-2 py-1 rounded font-bold ${product.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {product.status}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    {editingId === product.id ? (
                                        <div className="space-x-2">
                                            <button onClick={handleSave} className="text-green-600 font-bold hover:underline">Save</button>
                                            <button onClick={handleCancel} className="text-gray-500 hover:underline">Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                                            <button onClick={() => startEdit(product)} className="p-1 hover:bg-gray-200 rounded text-blue-600">
                                                <Icon icon="solar:pen-linear" width="18" />
                                            </button>
                                            <button onClick={() => deleteProduct(product.id)} className="p-1 hover:bg-gray-200 rounded text-red-600">
                                                <Icon icon="solar:trash-bin-trash-linear" width="18" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
