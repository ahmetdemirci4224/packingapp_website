import axios from 'axios';

// Vite projelerinde .env değişkenlerine import.meta.env ile erişilir.
const API_BASE_URL = 'https://packingapp-website-api.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const ProductService = {
  // Tüm ürünleri getirir
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      console.error('Ürünleri çekerken hata oluştu:', error);
      throw error; // Hatayı çağıran bileşene (component) fırlat
    }
  },

  // Tekil ürün detayı getirir
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ürün (ID: ${id}) detayını çekerken hata oluştu:`, error);
      throw error;
    }
  },

  // Belirli bir kategoriye ait ürünleri getirir
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await apiClient.get(`/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Kategoriye (ID: ${categoryId}) ait ürünleri çekerken hata oluştu:`, error);
      throw error;
    }
  },

  // Yeni ürün ekler
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Ürün eklenirken hata oluştu:', error);
      throw error;
    }
  },

  // Resim yükler
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post('/products/upload-image', formData);
      // Artık backend doğrudan Cloudinary'nin "https://res.cloudinary.com/..." şeklindeki tam adresini döndürüyor
      return response.data.imageUrl;
    } catch (error) {
      console.error('Resim yüklenirken hata oluştu:', error);
      throw error;
    }
  },

  // Ürünü günceller (Fiyat, stok vb.)
  updateProduct: async (id, productData) => {
    try {
      const response = await apiClient.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Ürün (ID: ${id}) güncellenirken hata oluştu:`, error);
      throw error;
    }
  },

  // Ürünü siler
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ürün (ID: ${id}) silinirken hata oluştu:`, error);
      throw error;
    }
  }
};

export default apiClient;