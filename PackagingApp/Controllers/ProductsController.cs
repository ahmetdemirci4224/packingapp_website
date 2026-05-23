using Microsoft.AspNetCore.Mvc;
using PackagingApp.DTOs;
using PackagingApp.Repositories;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;

namespace PackagingApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    private readonly IConfiguration _configuration;

    public ProductsController(IProductRepository productRepository, IConfiguration configuration)
    {
        _productRepository = productRepository;
        _configuration = configuration;
    }

    // GET: api/products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductListDto>>> GetAll()
    {
        var products = await _productRepository.GetAllAsync();
        return Ok(products);
    }

    // GET: api/products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDetailDto>> GetById(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    // GET: api/products/category/5
    [HttpGet("category/{categoryId}")]
    public async Task<ActionResult<IEnumerable<ProductListDto>>> GetByCategory(int categoryId)
    {
        var products = await _productRepository.GetByCategoryAsync(categoryId);
        return Ok(products);
    }

    // POST: api/products
    [HttpPost]
    public async Task<ActionResult<PackagingApp.Models.Product>> Create(PackagingApp.Models.Product product)
    {
        await _productRepository.AddAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    // PUT: api/products/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, PackagingApp.Models.Product product)
    {
        if (id != product.Id)
        {
            return BadRequest();
        }

        await _productRepository.UpdateAsync(product);
        return NoContent();
    }

    // DELETE: api/products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _productRepository.DeleteAsync(id);
        return NoContent();
    }

    // POST: api/products/upload-image
    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Dosya seçilmedi.");

        var cloudName = _configuration["Cloudinary:CloudName"];
        var apiKey = _configuration["Cloudinary:ApiKey"];
        var apiSecret = _configuration["Cloudinary:ApiSecret"];

        Account account = new Account(cloudName, apiKey, apiSecret);
        Cloudinary cloudinary = new Cloudinary(account);

        var uploadResult = new ImageUploadResult();

        using (var stream = file.OpenReadStream())
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "dempa_ambalaj" // Cloudinary'de düzenli durması için bir klasör
            };
            uploadResult = await cloudinary.UploadAsync(uploadParams);
        }

        if (uploadResult.Error != null)
        {
            return BadRequest(uploadResult.Error.Message);
        }

        // Return the secure URL from Cloudinary
        return Ok(new { ImageUrl = uploadResult.SecureUrl.ToString() });
    }
}