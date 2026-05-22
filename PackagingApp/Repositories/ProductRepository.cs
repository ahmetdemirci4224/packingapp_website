using Microsoft.EntityFrameworkCore;
using PackagingApp.Data;
using PackagingApp.DTOs;
using PackagingApp.Models;

namespace PackagingApp.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductListDto>> GetAllAsync()
    {
        return await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Select(p => new ProductListDto(
                p.Id,
                p.Name,
                p.SKU,
                p.Price,
                p.StockQuantity,
                p.ImageUrl,
                p.Category.Name
            ))
            .ToListAsync();
    }

    public async Task<ProductDetailDto?> GetByIdAsync(int id)
    {
        var product = await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Include(p => p.Specifications)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null) return null;

        return new ProductDetailDto(
            product.Id,
            product.Name,
            product.SKU,
            product.Description,
            product.Price,
            product.StockQuantity,
            product.ImageUrl,
            product.Category.Name,
            product.Specifications.Select(s => new ProductSpecificationDto(s.Name, s.Value))
        );
    }

    public async Task<IEnumerable<ProductListDto>> GetByCategoryAsync(int categoryId)
    {
        return await _context.Products
            .AsNoTracking()
            .Where(p => p.CategoryId == categoryId)
            .Include(p => p.Category)
            .Select(p => new ProductListDto(
                p.Id,
                p.Name,
                p.SKU,
                p.Price,
                p.StockQuantity,
                p.ImageUrl,
                p.Category.Name
            ))
            .ToListAsync();
    }

    public async Task<Product> AddAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> UpdateAsync(Product product)
    {
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product != null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}