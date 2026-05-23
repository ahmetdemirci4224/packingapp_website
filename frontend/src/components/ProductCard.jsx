import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Resim yoksa placeholder atayalım
  const imageUrl = product.imageUrl || 'https://via.placeholder.com/300x200?text=Ambalaj+Resmi';

  return (
    <Link to={`/urun/${product.id}`} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 block">
      <div className="relative h-48 w-full">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {product.categoryName}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate group-hover:text-[#1e3a8a] transition-colors">{product.name}</h3>
        
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <span>SKU: {product.sku}</span>
          {product.price && <span className="font-bold text-lg text-blue-700">{product.price} ₺</span>}
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <p className="text-sm font-medium text-gray-500">
            Stok Durumu: 
            <span className={product.stockQuantity > 0 ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} Adet` : 'Tükendi'}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;