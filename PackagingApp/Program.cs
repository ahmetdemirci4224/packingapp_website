using Microsoft.EntityFrameworkCore;
using PackagingApp.Data;
using PackagingApp.Repositories;

var builder = WebApplication.CreateBuilder(args);

// WebRootPath'in (wwwroot) düzgün çalışabilmesi için klasörün sunucu başlatılmadan önce var olması gerekir
var wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
if (!Directory.Exists(wwwrootPath))
{
    Directory.CreateDirectory(wwwrootPath);
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowReactApp");

app.MapControllers();

// Seed Data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Uygulama her başladığında bekleyen migration'ları otomatik olarak canlı veritabanına uygular
    context.Database.Migrate();

    if (!context.Categories.Any())
    {
        var kutuCategory = new PackagingApp.Models.Category { Name = "Karton Kutu", Description = "Dayanıklı ve geri dönüştürülebilir karton kutular." };
        var posetCategory = new PackagingApp.Models.Category { Name = "Kargo Poşeti", Description = "Su geçirmez, güvenli kargo poşetleri." };
        var bantCategory = new PackagingApp.Models.Category { Name = "Koli Bandı", Description = "Yüksek yapışkanlı koli bantları." };
        var balonluCategory = new PackagingApp.Models.Category { Name = "Balonlu Naylon", Description = "Kırılgan eşyalar için koruyucu ambalaj." };

        context.Categories.AddRange(kutuCategory, posetCategory, bantCategory, balonluCategory);
        context.SaveChanges();

        var products = new List<PackagingApp.Models.Product>
        {
            new PackagingApp.Models.Product { Name = "E-Ticaret Kutusu 20x15x10 cm", SKU = "KT-001", Description = "Standart e-ticaret gönderimleri için ideal.", Price = 4.50m, StockQuantity = 5000, CategoryId = kutuCategory.Id, ImageUrl = "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500&auto=format&fit=crop&q=60" },
            new PackagingApp.Models.Product { Name = "Büyük Boy Koli 40x30x30 cm", SKU = "KT-002", Description = "Ağır yükler için çift oluklu.", Price = 12.00m, StockQuantity = 2000, CategoryId = kutuCategory.Id, ImageUrl = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=60" },
            new PackagingApp.Models.Product { Name = "Orta Boy Kargo Poşeti", SKU = "KP-001", Description = "30x40 cm ölçülerinde.", Price = 1.20m, StockQuantity = 10000, CategoryId = posetCategory.Id, ImageUrl = "https://images.unsplash.com/photo-1628189689849-063f25c13b30?w=500&auto=format&fit=crop&q=60" },
            new PackagingApp.Models.Product { Name = "Şeffaf Koli Bandı 45x100m", SKU = "BN-001", Description = "Endüstriyel kullanıma uygun güçlü yapışkan.", Price = 18.50m, StockQuantity = 3000, CategoryId = bantCategory.Id, ImageUrl = "https://plus.unsplash.com/premium_photo-1678854492474-0f2c69ea23a2?w=500&auto=format&fit=crop&q=60" },
            new PackagingApp.Models.Product { Name = "Balonlu Naylon 100cm x 50m", SKU = "BL-001", Description = "Ekstra koruyucu kalın pat pat naylon.", Price = 150.00m, StockQuantity = 500, CategoryId = balonluCategory.Id, ImageUrl = "https://images.unsplash.com/photo-1620603713587-f823bbd44eb6?w=500&auto=format&fit=crop&q=60" },
            new PackagingApp.Models.Product { Name = "Baskılı Pizza Kutusu", SKU = "KT-003", Description = "Sıcağı muhafaza eden oluklu mukavva.", Price = 6.00m, StockQuantity = 1000, CategoryId = kutuCategory.Id, ImageUrl = "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop&q=60" },
            new PackagingApp.Models.Product { Name = "Küçük Boy Kargo Poşeti", SKU = "KP-002", Description = "20x30 cm.", Price = 0.80m, StockQuantity = 0, CategoryId = posetCategory.Id, ImageUrl = "https://images.unsplash.com/photo-1628189689849-063f25c13b30?w=500&auto=format&fit=crop&q=60" },
            new PackagingApp.Models.Product { Name = "Kırılır Etiketli Bant", SKU = "BN-002", Description = "Kırmızı üzeri beyaz yazılı uyarı bandı.", Price = 22.00m, StockQuantity = 800, CategoryId = bantCategory.Id, ImageUrl = "https://plus.unsplash.com/premium_photo-1678854492474-0f2c69ea23a2?w=500&auto=format&fit=crop&q=60" }
        };

        context.Products.AddRange(products);
        context.SaveChanges();
    }
}

app.Run();
