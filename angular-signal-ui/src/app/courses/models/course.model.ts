import { CourseCategoryEnum } from '../enum/course-category.enum';

export class Course {
  id!: string;
  title!: string;
  description!: string;
  category!: CourseCategoryEnum;
  price!: number;
}
