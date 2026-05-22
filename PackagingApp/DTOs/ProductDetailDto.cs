namespace PackagingApp.DTOs;

public record ProductDetailDto(
    int Id,
    string Name,
    string SKU,
    string? Description,
    decimal? Price,
    int StockQuantity,
    string? ImageUrl,
    string CategoryName,
    IEnumerable<ProductSpecificationDto> Specifications
);