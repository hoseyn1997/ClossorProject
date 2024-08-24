using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence;

public class DataContext : DbContext
{
  public DataContext(DbContextOptions options) : base(options)
  {
  }

  public DbSet<Course> Courses { get; set; }
}
