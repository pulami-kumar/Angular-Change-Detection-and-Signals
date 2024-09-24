using angular_signal_api.Domain.Enum;

namespace angular_signal_api.Domain.Model
{
    public class Course
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Description { get; set; }
        public CourseCategoryEnum Category { get; set; }
        public float Price { get; set; }
    }
}
