import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  courseList: InputSignal<Course[]> = input.required<Course[]>();

  @Output() courseEditEvent = new EventEmitter<string>();
  @Output() courseDeleteEvent = new EventEmitter<string>();

  onEdit(id: string): void {
    this.courseEditEvent.emit(id);
  }

  onDelete(id: string): void {
    this.courseDeleteEvent.emit(id);
  }
}
