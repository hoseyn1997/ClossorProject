namespace API.Models;

public class Course
{
  public Guid Id { get; set; }
  public string Title { get; set; }
  public string Description { get; set; }
  public DateTime CreationDate { get; set; }
  public DateTime LastModified { get; set; }
  public string Category { get; set; }
  public string TeacherName { get; set; }
}
