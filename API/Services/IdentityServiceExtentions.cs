using System.Text;
using API.Models;
using API.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public static class IdentityServiceExtentions
{
  public static IServiceCollection AddIdentityServices(this IServiceCollection services,
    IConfiguration conf)
  {
    services.AddIdentityCore<AppUser>(opt =>
    {
      opt.Password.RequireNonAlphanumeric = false;
      opt.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<DataContext>();

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Lore refers to the body of traditional knowledge, beliefs, and teachings that are passed down within a culture, often through oral traditions."));
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
      opt.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key,
        ValidateIssuer = false,
        ValidateAudience = false,
      };
    });
    services.AddScoped<TokenService>();

    return services;
  }
}
