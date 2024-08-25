using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
  [Required]
  [EmailAddress]
  public string Email { get; set; }

  [Required]
  [StringLength(8, ErrorMessage = "too logn or too short", MinimumLength = 2)]
  public string Username { get; set; }

  // Has minimum 8 characters in length. Adjust it by modifying {8,}
  // At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
  // At least one lowercase English letter.  You can remove this condition by removing (?=.*?[a-z])
  // At least one digit. You can remove this condition by removing (?=.*?[0-9])
  // At least one special character,  You can remove this condition by removing (?=.*?[#?!@$%^&*-])
  [Required]
  [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
        ErrorMessage = "password must be more complex")]
  public string Password { get; set; }
}
