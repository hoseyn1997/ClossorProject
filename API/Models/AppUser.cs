using Microsoft.AspNetCore.Identity;

namespace API.Models;

public class AppUser : IdentityUser
{
  public string Displayname { get; set; }
  public string Bio { get; set; }
}