using angular_signal_api.Domain.Enum;
using angular_signal_api.Domain.Model;

namespace angular_signal_api.Storage
{
    public static class CourseStorage
    {
        private static List<Course> courseList = [
            new Course(){
                Id = Guid.Parse("2a39cd0b-9f7c-476f-9efd-35de2af6612d"),
                Title = "Basic Angular Signal Course",
                Description = "Basic Course explaining the basics of Angular Signal concepts and implementation.",
                Category = CourseCategoryEnum.Beginner,
                Price = 50
            },
            new Course(){
                Id = Guid.Parse("c86d1992-4ca9-4920-9b6b-47015f8babf8"),
                Title = "Angular Signal Advance Course",
                Description = "Advanced Course on Angular Signal. Teaches the best practices of Signal Implementation with hand-ons real time project example.",
                Category = CourseCategoryEnum.Advanced,
                Price = 150
            },
            new Course(){
                Id = Guid.Parse("826aecce-bfc7-44c0-b0e9-5526a401e5c2"),
                Title = "Signal VS Zone Js",
                Description = "Basic course on Signal and Zone Js change detection on Angular.",
                Category = CourseCategoryEnum.Beginner,
                Price = 60
            },
             new Course(){
                Id = Guid.Parse("47a56c04-aa5c-4b39-b499-a59f647d6a94"),
                Title = "Angular Signal with .NET Core API",
                Description = "Course on Angular Signal ",
                Category = CourseCategoryEnum.Intermediate,
                Price = 100
            },
             new Course(){
                Id = Guid.Parse("9c4e31fd-238b-40ff-8dbf-4d7be3dd156e"),
                Title = "Clean Architecture in .NET Core",
                Description = "",
                Category = CourseCategoryEnum.Intermediate,
                Price = 90
            },
            new Course(){
                Id = Guid.Parse("4f90b24e-644b-4b04-aec1-b75b5b64ced2"),
                Title = "DDD Design Pattern in .NET Core",
                Description = "",
                Category = CourseCategoryEnum.Intermediate,
                Price = 89
            },
            new Course(){
                Id = Guid.Parse("9211f634-efa2-42b6-8ff7-7560274ba588"),
                Title = "Microservices in .NET",
                Description = "",
                Category = CourseCategoryEnum.Advanced,
                Price = 200
            }
        ];

        public static void Create(Course newCourse)
        {
            courseList.Add(newCourse);
        }

        public static void Update(Course course)
        {
            var existingCourse = courseList.FirstOrDefault(x => x.Id == course.Id);

            if (existingCourse is not null)
            {
                existingCourse.Title = course.Title;
                existingCourse.Description = course.Description;
                existingCourse.Category = course.Category;
                existingCourse.Price = course.Price;
            }
        }

        public static void Delete(Course course)
        {
            courseList.Remove(course);
        }


        public static Course? GetCourseById(Guid id)
        {
            return courseList.FirstOrDefault(x => x.Id == id);
        }

        public static List<Course> GetAllCourses()
        {
            return courseList;
        }
    }
}
