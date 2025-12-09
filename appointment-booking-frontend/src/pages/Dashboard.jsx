import React from 'react';
import AdminLayout from '../components/dashboard/AdminLayout';
import ProductManagement from '../components/dashboard/ProductManagement';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-primary">Overview</h1>
        <p className="text-secondary">Manage your farm inventory and settings.</p>
      </div>

      <ProductManagement />
    </AdminLayout>
  );
};

export default Dashboard;
