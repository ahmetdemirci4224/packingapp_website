using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PackagingApp.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string SKU { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? Price { get; set; }

    public int StockQuantity { get; set; } = 0;

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public int CategoryId { get; set; }
    
    [System.Text.Json.Serialization.JsonIgnore]
    public Category? Category { get; set; }

    [System.Text.Json.Serialization.JsonIgnore]
    public ICollection<ProductSpecification>? Specifications { get; set; } = new List<ProductSpecification>();
}