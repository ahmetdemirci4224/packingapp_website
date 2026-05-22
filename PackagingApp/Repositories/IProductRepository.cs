using PackagingApp.DTOs;
using PackagingApp.Models;

namespace PackagingApp.Repositories;

public interface IProductRepository
{
    Task<IEnumerable<ProductListDto>> GetAllAsync();
    Task<ProductDetailDto?> GetByIdAsync(int id);
    Task<IEnumerable<ProductListDto>> GetByCategoryAsync(int categoryId);
    Task<Product> AddAsync(Product product);
    Task<Product> UpdateAsync(Product product);
    Task DeleteAsync(int id);
}