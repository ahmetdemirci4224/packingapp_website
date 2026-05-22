namespace PackagingApp.DTOs;

public record ProductListDto(
    int Id,
    string Name,
    string SKU,
    decimal? Price,
    int StockQuantity,
    string? ImageUrl,
    string CategoryName
);