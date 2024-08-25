using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Persistence;

public class Seed
{
  public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
  {
    if (!userManager.Users.Any())
    {
      var users = new List<AppUser>{
        new(){
          Displayname="Admin",
          UserName="admin",
          Email="admin@classor.com",
          Bio="i'm administrator",
        },
        new(){
          Displayname="Tom",
          UserName="tom",
          Email="tom@classor.com",
          Bio="i'm tom",
        },
        new(){
          Displayname="Bob",
          UserName="bob",
          Email="bob@classor.com",
          Bio="i'm bob",
        },
      };
      foreach (var user in users)
      {
        await userManager.CreateAsync(user, "Pa$$w0rd");
      }
    }


    if (context.Courses.Any()) return;
    var courses = new List<Course>
    {
      new() {
        Title = "art",
        Category="art",
        CreationDate = DateTime.UtcNow,
        Description="He decided that the time had come to be stronger than any of the excuses he'd used until then.",
        LastModified=DateTime.UtcNow.AddMonths(2),
        TeacherName="dr_ali",
      },
      new() {
        Title = "biology",
        Category="biology",
        CreationDate = DateTime.UtcNow,
        Description="Yeah, I think it's a good environment for learning English.",
        LastModified=DateTime.UtcNow.AddMonths(1),
        TeacherName="dr_hassan",
      },
      new() {
        Title = "chemistry",
        Category="chemistry",
        CreationDate = DateTime.UtcNow,
        Description="Yeah, I think it's a good environment for learning English.",
        LastModified=DateTime.UtcNow.AddMonths(3),
        TeacherName="dr_hassan",
      },
      new() {
        Title = "css",
        Category="css",
        CreationDate = DateTime.UtcNow,
        Description="A purple pig and a green donkey flew a kite in the middle of the night and ended up sunburnt.",
        LastModified=DateTime.UtcNow.AddMonths(2),
        TeacherName="dr_maedeh",
      },
      new() {
        Title = "economy",
        Category="economy",
        CreationDate = DateTime.UtcNow,
        Description="The best key lime pie is still up for debate.",
        LastModified=DateTime.UtcNow.AddMonths(1),
        TeacherName="dr_maedeh",
      },
      new() {
        Title = "english",
        Category="english",
        CreationDate = DateTime.UtcNow,
        Description="People generally approve of dogs eating cat food but not cats eating dog food.",
        LastModified=DateTime.UtcNow.AddMonths(7),
        TeacherName="dr_reyhaneh",
      },
      new() {
        Title = "history",
        Category="history",
        CreationDate = DateTime.UtcNow,
        Description="People generally approve of dogs eating cat food but not cats eating dog food.",
        LastModified=DateTime.UtcNow.AddMonths(4),
        TeacherName="dr_reza",
      },
      new() {
        Title = "js",
        Category="js",
        CreationDate = DateTime.UtcNow,
        Description="He decided water-skiing on a frozen lake wasn’t a good idea.",
        LastModified=DateTime.UtcNow.AddMonths(9),
        TeacherName="dr_reyhaneh",
      },
      new() {
        Title = "math",
        Category="math",
        CreationDate = DateTime.UtcNow,
        Description="He decided to count all the sand on the beach as a hobby.",
        LastModified=DateTime.UtcNow.AddMonths(10),
        TeacherName="dr_maedeh",
      },
      new() {
        Title = "music",
        Category="music",
        CreationDate = DateTime.UtcNow,
        Description="I was very proud of my nickname throughout high school but today- I couldn’t be any different to what my nickname was.",
        LastModified=DateTime.UtcNow.AddMonths(8),
        TeacherName="dr_hassan",
      },
      new() {
        Title = "php",
        Category="php",
        CreationDate = DateTime.UtcNow,
        Description="This is the last random sentence I will be writing and I am going to stop mid-sent.",
        LastModified=DateTime.UtcNow.AddMonths(3),
        TeacherName="dr_maedeh",
      },
      new() {
        Title = "physics",
        Category="physics",
        CreationDate = DateTime.UtcNow,
        Description="When I cook spaghetti, I like to boil it a few minutes past al dente so the noodles are super slippery.",
        LastModified=DateTime.UtcNow.AddMonths(1),
        TeacherName="dr_maedeh",
      },
      new() {
        Title = "programming",
        Category="programming",
        CreationDate = DateTime.UtcNow,
        Description="The skeleton had skeletons of his own in the closet.",
        LastModified=DateTime.UtcNow.AddMonths(2),
        TeacherName="dr_reyhaneh",
      },
      new() {
        Title = "react",
        Category="react",
        CreationDate = DateTime.UtcNow,
        Description="Joe made the sugar cookies; Susan decorated them.",
        LastModified=DateTime.UtcNow.AddMonths(7),
        TeacherName="dr_reza",
      },
      new() {
        Title = "webDesign",
        Category="webDesign",
        CreationDate = DateTime.UtcNow,
        Description="He took one look at what was under the table and noped the hell out of there.",
        LastModified=DateTime.UtcNow.AddMonths(2),
        TeacherName="dr_maedeh",
      },
      new() {
        Title = "writing",
        Category="writing",
        CreationDate = DateTime.UtcNow,
        Description="Last Friday I saw a spotted striped blue worm shake hands with a legless lizard.",
        LastModified=DateTime.UtcNow.AddMonths(9),
        TeacherName="dr_hassan",
      },
    };

    await context.Courses.AddRangeAsync(courses);
    await context.SaveChangesAsync();

  }
}
