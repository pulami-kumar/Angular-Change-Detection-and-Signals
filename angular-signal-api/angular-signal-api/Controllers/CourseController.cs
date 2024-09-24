using angular_signal_api.Common.DTOs;
using angular_signal_api.Domain.Enum;
using angular_signal_api.Domain.Model;
using angular_signal_api.Storage;
using Microsoft.AspNetCore.Mvc;

namespace angular_signal_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : BaseController
    {
        [HttpGet("getCourseById/{id}")]
        public IActionResult GetCourseById(Guid id)
        {
            var course = CourseStorage.GetCourseById(id);

            if (course == null)
            {
                return ReturnResponse<Course>(ResultStatusEnum.BadRequest, "The course doesn't exist.");
            }

            return ReturnResponse<Course>(ResultStatusEnum.Success, "The Course has been successfully fetched.", course);
        }

        [HttpGet("getAllCourses")]
        public IActionResult GetAllCourses()
        {
            var courses = CourseStorage.GetAllCourses();

            return ReturnResponse<List<Course>>(ResultStatusEnum.Success, "The Courses has been successfully fetched.", courses);
        }

        [HttpPost("createCourse")]
        public IActionResult GetAllCourses([FromBody] CreateCourseDTO newCourseDto)
        {
            var newCourse = new Course()
            {
                Id = Guid.NewGuid(),
                Title = newCourseDto.Title,
                Category = newCourseDto.Category,
                Description = newCourseDto.Description,
                Price = newCourseDto.Price
            };

            CourseStorage.Create(newCourse);

            return ReturnResponse<object>(ResultStatusEnum.Success, "The Course has been successfully created.");
        }

        [HttpPut("updateCourse")]
        public IActionResult UpdateCourse([FromBody] Course updateCourse)
        {
            var existingCourse = CourseStorage.GetCourseById(updateCourse.Id);

            if (existingCourse == null)
            {
                return ReturnResponse<object>(ResultStatusEnum.BadRequest, "The course doesn't exist.");
            }

            CourseStorage.Update(updateCourse);

            return ReturnResponse<object>(ResultStatusEnum.Success, "The Course has been successfully updated.");
        }

        [HttpDelete("deleteCourse/{id}")]
        public IActionResult DeleteCourse(Guid id)
        {
            var existingCourse = CourseStorage.GetCourseById(id);

            if (existingCourse == null)
            {
                return ReturnResponse<object>(ResultStatusEnum.BadRequest, "The course doesn't exist.");
            }

            CourseStorage.Delete(existingCourse);

            return ReturnResponse<object>(ResultStatusEnum.Success, "The Course has been successfully deleted.");
        }
    }
}