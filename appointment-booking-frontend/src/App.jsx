import React from 'react';
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import OurFarm from "./pages/OurFarm";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsPost from "./pages/NewsPost";
import CartDrawer from "./components/layout/CartDrawer";
import Chatbot from "./components/chat/Chatbot";

// Scroll to top component
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col font-sans">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/our-farm" element={<OurFarm />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsPost />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <Chatbot />
        </div>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
