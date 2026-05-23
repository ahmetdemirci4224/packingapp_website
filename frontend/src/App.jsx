import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-900 antialiased flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/urunler" element={<Catalog />} />
            <Route path="/urun/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/hakkimizda" element={<PlaceholderPage title="Hakkımızda" description="Dempa Ambalaj kurumsal bilgileri çok yakında eklenecektir." />} />
            <Route path="/iletisim" element={<PlaceholderPage title="İletişim" description="Bize info@dempaambalaj.com adresinden ulaşabilirsiniz." />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;