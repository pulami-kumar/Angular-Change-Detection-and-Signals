using angular_signal_api.Domain.Enum;

namespace angular_signal_api.Common.DTOs
{
    public class CreateCourseDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public CourseCategoryEnum Category { get; set; }
        public float Price { get; set; }
    }
}
