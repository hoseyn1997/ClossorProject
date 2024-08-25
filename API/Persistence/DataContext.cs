using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
  public DataContext(DbContextOptions options) : base(options)
  {
  }

  public DbSet<Course> Courses { get; set; }
}
