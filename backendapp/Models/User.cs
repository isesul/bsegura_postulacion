using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEndApp.Models;

public partial class User
{
    public int Id { get; set; }

    private const string LengthError = "This field must be a string between 2 and 50 characters";
    [MinLength(2, ErrorMessage = LengthError)]
    [MaxLength(50, ErrorMessage = LengthError)]
    public string? Name { get; set; }

    [MinLength(2, ErrorMessage = LengthError)]
    [MaxLength(50, ErrorMessage = LengthError)]
    [EmailAddress(ErrorMessage = "This field must be a valid email")]
    public string? Email { get; set; }

    [Range(0, 150, ErrorMessage = "This field must be a valid Number (between 0 and 150)")]
    public int? Age { get; set; }

}
