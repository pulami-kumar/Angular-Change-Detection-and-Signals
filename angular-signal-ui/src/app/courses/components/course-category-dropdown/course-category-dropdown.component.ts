import { Component, model, ModelSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CourseCategoryEnum } from '../../enum/course-category.enum';
@Component({
  selector: 'app-course-category-dropdown',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './course-category-dropdown.component.html',
  styleUrl: './course-category-dropdown.component.scss',
})
export class CourseCategoryDropdownComponent {
  public category: ModelSignal<CourseCategoryEnum> = model<CourseCategoryEnum>(
    CourseCategoryEnum.Beginner
  );

  public courseCategoryEnum: typeof CourseCategoryEnum = CourseCategoryEnum;
}
