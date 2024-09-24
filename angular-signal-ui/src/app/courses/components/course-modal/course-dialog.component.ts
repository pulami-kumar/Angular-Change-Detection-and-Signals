import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  Inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../core/common/api-resonse.model';
import { CourseCategoryEnum } from '../../enum/course-category.enum';
import { CourseDialogTypeEnum } from '../../enum/course-dialog.enum';
import { Course } from '../../models/course.model';
import { CourseApiServices } from '../../services/course-api-services.service';
import { CourseCategoryDropdownComponent } from '../course-category-dropdown/course-category-dropdown.component';

@Component({
  selector: 'app-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CourseCategoryDropdownComponent,
  ],
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss',
})
export class CourseDialogComponent {
  public dialogTitle: WritableSignal<string> = signal<string>('');
  public dialogButton: WritableSignal<string> = signal<string>('');
  public courseForm!: FormGroup;

  public courseCategory: WritableSignal<CourseCategoryEnum> =
    signal<CourseCategoryEnum>(CourseCategoryEnum.Beginner);

  public courseDialogTypeEnum: typeof CourseDialogTypeEnum =
    CourseDialogTypeEnum;

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private formBuilder: FormBuilder,
    private courseApiService: CourseApiServices,
    private toastrService: ToastrService
  ) {
    effect(
      () => {
        if (this.courseForm) {
          this.courseForm.controls['category'].setValue(this.courseCategory());
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    if (this.data.dialogType !== this.courseDialogTypeEnum.Delete) {
      this.initializeForm();
    }
    this.updateDialogTemplate();
  }

  private initializeForm(): void {
    this.courseForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  private updateDialogTemplate(): void {
    switch (this.data.dialogType) {
      case CourseDialogTypeEnum.Create:
        this.dialogTitle.set('Create Course');
        this.dialogButton.set('Create');
        return;

      case CourseDialogTypeEnum.Edit:
        this.dialogTitle.set('Edit Course');
        this.dialogButton.set('Save');
        this.fetchCourseDetail();
        return;

      case CourseDialogTypeEnum.Delete:
        this.dialogTitle.set('Delete Course');
        this.dialogButton.set('Delete');
        return;
    }
  }

  private fetchCourseDetail(): void {
    this.courseApiService
      .fetchCourseById(this.data.courseId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: ApiResponse<Course>) => {
          this.courseForm.patchValue(response.data);
          this.courseCategory.set(response.data.category);
        },
        error: (error: HttpErrorResponse) => {
          this.toastrService.error(error.error.message, 'Error!');
        },
      });
  }

  public onSuccessClick(): void {
    switch (this.data.dialogType) {
      case CourseDialogTypeEnum.Create:
        this.createCourse();
        return;

      case CourseDialogTypeEnum.Edit:
        this.updateCourse();
        return;

      case CourseDialogTypeEnum.Delete:
        this.deleteCourse();
        return;
    }
  }

  private createCourse(): void {
    const courseModel = this.courseForm.value;
    this.courseApiService
      .createCourse(courseModel)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: ApiResponse<null>) => {
          this.toastrService.success(response.message, 'Success');
          this.closeModal('success');
        },
        error: (error: HttpErrorResponse) => {
          this.toastrService.error(error.error.message, 'Error');
        },
      });
  }

  private updateCourse(): void {
    let courseModel = this.courseForm.value;
    this.courseApiService
      .updateCourse(courseModel)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: ApiResponse<null>) => {
          this.toastrService.success(response.message, 'Success');
          this.closeModal('success');
        },
        error: (error: HttpErrorResponse) => {
          this.toastrService.error(error.error.message, 'Error');
        },
      });
  }

  private deleteCourse(): void {
    this.courseApiService
      .deleteCourse(this.data.courseId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: ApiResponse<null>) => {
          this.toastrService.success(response.message, 'Success');
          this.closeModal('success');
        },
        error: (error: HttpErrorResponse) => {
          this.toastrService.error(error.error.message, 'Error');
        },
      });
  }

  private closeModal(message: string): void {
    this.dialogRef.close(message);
  }
}
