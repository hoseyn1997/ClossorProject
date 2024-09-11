using System.Security.Claims;
using API.DTOs;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[Controller]")]
public class AccountController : ControllerBase
{
  private readonly UserManager<AppUser> _userManager;
  private readonly TokenService _tokenService;
  public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
  {
    _tokenService = tokenService;
    _userManager = userManager;
  }

  [AllowAnonymous]
  [HttpPost("login")]
  public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
  {
    var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username);
    if (user == null) return Unauthorized();
    var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
    if (result)
    {
      return new UserDto
      {
        DisplayName = user.Displayname,
        Username = user.UserName,
        Token = _tokenService.CreateToken(user)
      };
    }
    return Unauthorized();
  }

  [AllowAnonymous]
  [HttpPost("register")]
  public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
  {
    if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
    {
      return BadRequest("username is already taken!");
    }
    if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
    {
      return BadRequest("Email is already taken!");
    }

    var user = new AppUser
    {
      Displayname = registerDto.Username,
      UserName = registerDto.Username,
      Email = registerDto.Email,
    };
    var result = await _userManager.CreateAsync(user, registerDto.Password);
    if (result.Succeeded)
    {
      return new UserDto
      {
        DisplayName = user.Displayname,
        Username = user.UserName,
        Token = _tokenService.CreateToken(user)
      };
    }
    return BadRequest(result.Errors);
  }

  [Authorize]
  [HttpGet()]
  public async Task<ActionResult<UserDto>> GetCurrentUser()
  {
    var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
    return new UserDto
    {
      DisplayName = user.Displayname,
      Username = user.UserName,
      Token = _tokenService.CreateToken(user)
    };
  }
}
