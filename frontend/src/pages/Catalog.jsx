import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductService } from '../services/api';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('recommended');
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getAllProducts();
        
        // Parse search query
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('search')?.toLowerCase();

        if (query) {
          const filtered = data.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.categoryName?.toLowerCase().includes(query) ||
            p.sku?.toLowerCase().includes(query)
          );
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Sıralama mantığı
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === 'price-asc') return a.price - b.price;
    if (sortType === 'price-desc') return b.price - a.price;
    if (sortType === 'newest') return b.id - a.id;
    return 0; // recommended
  });

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
        
        {/* Sol Menü / Filtreleme Alanı */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Kategoriler</h3>
            <ul className="space-y-3 mb-6 text-sm text-gray-600">
              <li className="flex items-center gap-2 cursor-pointer hover:text-[#1e3a8a]"><input type="checkbox" className="accent-[#1e3a8a]" /> plastik ürünler</li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-[#1e3a8a]"><input type="checkbox" className="accent-[#1e3a8a]" /> karton ürünler</li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-[#1e3a8a]"><input type="checkbox" className="accent-[#1e3a8a]" /> özel tasarım ürünler</li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-[#1e3a8a]"><input type="checkbox" className="accent-[#1e3a8a]" /> poşetler</li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-[#1e3a8a]"><input type="checkbox" className="accent-[#1e3a8a]" /> temizlik ürünleri</li>
            </ul>

            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Fiyat Aralığı</h3>
            <div className="flex items-center gap-2 mb-6">
              <input type="number" placeholder="En Az" className="w-1/2 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#1e3a8a]" />
              <span className="text-gray-400">-</span>
              <input type="number" placeholder="En Çok" className="w-1/2 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#1e3a8a]" />
              <button className="bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"><svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
            </div>

            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Stok Durumu</h3>
            <ul className="space-y-3 text-sm text-gray-600 mb-2">
              <li className="flex items-center gap-2 cursor-pointer hover:text-[#1e3a8a]"><input type="checkbox" className="accent-[#1e3a8a]" /> Stoktakiler</li>
            </ul>
          </div>
        </aside>

        {/* Ana İçerik / Ürün Listesi */}
        <main className="flex-1">
          {/* Üst Bar (Sıralama ve Bilgi) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-800">Tüm Ürünler</span> araması için <span className="font-bold text-[#1e3a8a]">{products.length}</span> sonuç listeleniyor
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sırala:</span>
              <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md py-1.5 px-3 focus:outline-none focus:border-[#1e3a8a]">
                <option value="recommended">Önerilen Sıralama</option>
                <option value="price-asc">En Düşük Fiyat</option>
                <option value="price-desc">En Yüksek Fiyat</option>
                <option value="newest">En Yeniler</option>
              </select>
            </div>
          </div>

          {/* Ürün Grid */}
          {sortedProducts.length === 0 ? (
             <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <h3 className="text-lg font-bold text-gray-800 mb-2">Aradığınız kriterlere uygun ürün bulunamadı.</h3>
               <p className="text-gray-500 text-sm">Lütfen farklı bir kategori seçin veya filtreleri temizleyin.</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Catalog;