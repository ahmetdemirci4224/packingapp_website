import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form State'i
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: 1,
    price: '',
    stockQuantity: '',
    imageUrl: '',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Yeni Ürün Ekle butonuna tıklandığında
  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: '',
      categoryId: 1, // Varsayılan: Karton Kutu
      price: '',
      stockQuantity: '',
      imageUrl: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  // Düzenle butonuna tıklandığında
  const handleEdit = (product) => {
    setEditingProduct(product);
    // Seçilen ürünün verilerini forma doldur
    setFormData({
      name: product.name,
      sku: product.sku,
      categoryId: getCategoryIdByName(product.categoryName),
      price: product.price || '',
      stockQuantity: product.stockQuantity,
      imageUrl: product.imageUrl || '',
      description: product.description || ''
    });
    setIsModalOpen(true);
  };

  // Sil butonuna tıklandığında
  const handleDelete = async (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      try {
        await ProductService.deleteProduct(id);
        // Listeden silinen ürünü çıkar
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        alert("Silme işlemi sırasında hata oluştu!");
      }
    }
  };

  // Form değişiklerini yakala
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [uploadingImage, setUploadingImage] = useState(false);

  // Form gönderildiğinde (Ekle/Güncelle)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // API'nin beklediği formata çeviriyoruz
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stockQuantity: parseInt(formData.stockQuantity, 10) || 0,
      categoryId: parseInt(formData.categoryId, 10)
    };

    try {
      if (editingProduct) {
        // Güncelleme İşlemi
        payload.id = editingProduct.id;
        await ProductService.updateProduct(editingProduct.id, payload);
      } else {
        // Yeni Ekleme İşlemi
        await ProductService.createProduct(payload);
      }
      
      // Modal'ı kapat ve listeyi yenile
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("İşlem başarısız: " + (error.response?.data?.title || error.message));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const uploadedUrl = await ProductService.uploadImage(file);
      setFormData(prev => ({ ...prev, imageUrl: uploadedUrl }));
    } catch (error) {
      alert("Resim yüklenemedi!");
    } finally {
      setUploadingImage(false);
    }
  };

  // Kategori adından ID bulmak için geçici fonksiyon (API'de kategori listesi olmadığı için)
  const getCategoryIdByName = (name) => {
    if (name.includes("Kutu")) return 1;
    if (name.includes("Poşet")) return 2;
    if (name.includes("Bant")) return 3;
    if (name.includes("Naylon")) return 4;
    return 1;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Paneli</h1>
            <p className="text-gray-500 mt-1">Dempa Ambalaj ürün ve stok yönetimi</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2.5 rounded-md font-medium transition-colors shadow-sm flex items-center gap-2"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
             Yeni Ürün Ekle
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Görsel</th>
                  <th scope="col" className="px-6 py-4">Ürün Adı</th>
                  <th scope="col" className="px-6 py-4">SKU</th>
                  <th scope="col" className="px-6 py-4">Kategori</th>
                  <th scope="col" className="px-6 py-4">Fiyat</th>
                  <th scope="col" className="px-6 py-4">Stok</th>
                  <th scope="col" className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-10">Yükleniyor...</td></tr>
                ) : products.map((product) => (
                  <tr key={product.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <img src={product.imageUrl || 'https://via.placeholder.com/150?text=Resim+Yok'} alt={product.name} className="w-12 h-12 object-cover rounded border border-gray-200" />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4">{product.sku}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{product.categoryName}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-700">{product.price} ₺</td>
                    <td className="px-6 py-4">
                      {product.stockQuantity > 0 
                        ? <span className="text-green-600 font-semibold">{product.stockQuantity}</span>
                        : <span className="text-red-500 font-semibold">Tükendi</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button onClick={() => handleEdit(product)} className="font-medium text-blue-600 hover:underline mr-3">Düzenle</button>
                      <button onClick={() => handleDelete(product.id)} className="font-medium text-red-600 hover:underline">Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ürün Ekleme / Düzenleme Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Stok Kodu)</label>
                  <input type="text" name="sku" required value={formData.sku} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]">
                    <option value={1}>Plastik ürünler</option>
                    <option value={2}>Karton ürünler</option>
                    <option value={3}>Özel tasarım ürünler</option>
                    <option value={4}>Poşetler</option>
                    <option value={5}>Temizlik ürünleri</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (₺)</label>
                  <input type="number" step="0.01" name="price" required value={formData.price} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok Miktarı</label>
                  <input type="number" name="stockQuantity" required value={formData.stockQuantity} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Görsel Yükle</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                  {uploadingImage && <p className="text-xs text-blue-600 mt-1">Resim yükleniyor, lütfen bekleyin...</p>}
                  {formData.imageUrl && !uploadingImage && <p className="text-xs text-green-600 mt-1">Resim başarıyla yüklendi.</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"></textarea>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">
                  İptal
                </button>
                <button type="submit" className="px-4 py-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white rounded-md font-medium">
                  {editingProduct ? 'Değişiklikleri Kaydet' : 'Ürünü Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;