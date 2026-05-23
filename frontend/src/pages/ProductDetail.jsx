import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductService } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Ürün bulunamadı veya yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center max-w-md w-full">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Bir Sorun Var</h3>
          <p className="text-gray-600 mb-6">{error || 'Ürün bulunamadı.'}</p>
          <button onClick={() => navigate('/urunler')} className="bg-[#1e3a8a] text-white px-6 py-2 rounded-md hover:bg-[#1e40af] transition-colors">
            Kataloğa Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Geri Dönüş Linki */}
        <Link to="/urunler" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1e3a8a] mb-8 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Tüm Ürünlere Dön
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Sol: Görsel */}
            <div className="bg-gray-50 flex items-center justify-center p-8 md:border-r border-gray-100 min-h-[400px]">
              <img 
                src={product.imageUrl || 'https://via.placeholder.com/600x400?text=Ambalaj+Resmi'} 
                alt={product.name} 
                className="max-w-full max-h-[500px] object-contain rounded-lg drop-shadow-md"
              />
            </div>

            {/* Sağ: Ürün Detayları */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
                  {product.categoryName || 'Kategori Yok'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                  Stok Kodu (SKU): <span className="text-gray-800">{product.sku}</span>
                </span>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                  Stok Durumu: 
                  <span className={product.stockQuantity > 0 ? "text-green-600 ml-1 font-bold" : "text-red-600 ml-1 font-bold"}>
                    {product.stockQuantity > 0 ? `${product.stockQuantity} Adet` : 'Tükendi'}
                  </span>
                </span>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-black text-[#1e3a8a]">{product.price} ₺</span>
                <span className="text-sm text-gray-500 ml-2">/ KDV Dahil</span>
              </div>

              {/* Açıklama */}
              <div className="border-t border-gray-200 pt-8 mb-8 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ürün Detayları</h3>
                <div className="prose prose-sm md:prose-base text-gray-600 leading-relaxed">
                  {product.description ? (
                    <p>{product.description}</p>
                  ) : (
                    <p className="italic text-gray-400">Bu ürün için henüz detaylı bir açıklama girilmemiştir.</p>
                  )}
                </div>
              </div>

              {/* Aksiyon Butonu */}
              <div className="mt-auto">
                <a href="mailto:satis@dempaambalaj.com" className="w-full sm:w-auto inline-flex justify-center items-center bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Fiyat Teklifi İste
                </a>
                <p className="text-xs text-gray-500 mt-3 text-center sm:text-left">
                  Toptan siparişleriniz için bizimle e-posta yoluyla iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;