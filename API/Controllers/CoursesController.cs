using API.Models;
using API.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class CoursesController : BaseApiController
{
  private readonly DataContext _context;
  public CoursesController(DataContext context)
  {
    _context = context;
  }

  [HttpGet] // api/courses
  public async Task<ActionResult<List<Course>>> GetCourses()
  {
    return await _context.Courses.ToListAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Course>> GetCourse(Guid id)
  {
    return await _context.Courses.FindAsync(id);
  }
}
