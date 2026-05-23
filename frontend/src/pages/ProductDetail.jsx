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
                <a 
                  href={`https://wa.me/905380316280?text=Merhaba, "${product.name}" ürünü için fiyat teklifi almak istiyorum.`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex justify-center items-center bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp'tan Sipariş Ver
                </a>
                <p className="text-xs text-gray-500 mt-3 text-center sm:text-left">
                  Müşteri temsilcimize yönlendiriliyorsunuz. Ürün bilgisi otomatik olarak eklenecektir.
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