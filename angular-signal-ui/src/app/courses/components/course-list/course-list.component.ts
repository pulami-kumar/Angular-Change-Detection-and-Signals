import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../core/common/api-resonse.model';
import { CourseCategoryEnum } from '../../enum/course-category.enum';
import { CourseDialogTypeEnum } from '../../enum/course-dialog.enum';
import { Course } from '../../models/course.model';
import { CourseApiServices } from '../../services/course-api-services.service';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CourseDialogComponent } from '../course-modal/course-dialog.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [MatTabsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  private courses: WritableSignal<Course[]> = signal([]);

  public beginnerCourses = computed(() => {
    return this.courses().filter(
      (x) => x.category === CourseCategoryEnum.Beginner
    );
  });

  public intermediateCourses = computed(() => {
    return this.courses().filter(
      (x) => x.category === CourseCategoryEnum.Intermediate
    );
  });

  public advancedCourses = computed(() => {
    return this.courses().filter(
      (x) => x.category === CourseCategoryEnum.Advanced
    );
  });

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private courseApiServices: CourseApiServices,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchAllCourses();
  }

  private fetchAllCourses(): void {
    this.courseApiServices
      .fetchAllCourses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: ApiResponse<Course[]>) => {
          this.courses.set(response.data);
        },
        error: (error: HttpErrorResponse) => {
          this.toastrService.error(error.error.message, 'Error!');
        },
      });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: {
        dialogType: CourseDialogTypeEnum.Create,
        courseId: null,
      },
      width: '500px',
    });

    this.onCourseDialogClose(dialogRef);
  }

  onEdit(id: string): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: {
        dialogType: CourseDialogTypeEnum.Edit,
        courseId: id,
      },
      width: '500px',
    });

    this.onCourseDialogClose(dialogRef);
  }

  onDelete(id: string): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: {
        dialogType: CourseDialogTypeEnum.Delete,
        courseId: id,
      },
      width: '500px',
    });

    this.onCourseDialogClose(dialogRef);
  }

  private onCourseDialogClose(
    courseModalRef: MatDialogRef<CourseDialogComponent>
  ): void {
    courseModalRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (message: string) => {
          if (message && message === 'success') {
            this.fetchAllCourses();
          }
        },
      });
  }
}
