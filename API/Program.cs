using System;
using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//Add builder.Services to the container

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
});
builder.Services.AddDbContext<StoreContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
}
);
builder.Services.AddCors();
builder.Services.AddIdentityCore<User>(opt => {
    opt.User.RequireUniqueEmail = true;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
if (builder.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
    });
}

//app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(origin => true).AllowCredentials().WithOrigins("http://localhost:3000");
}
);

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
    await DbInitializer.Initialize(context, userManager);
}
catch(Exception ex)
{
    logger.LogError(ex, "Problem migrating error");
}

app.Run();
        