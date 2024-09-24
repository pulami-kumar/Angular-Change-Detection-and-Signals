import { Routes } from '@angular/router';
import { ChangeDetectionLayoutComponent } from './change-detection/change-detection-layout.component';
import { CourseListComponent } from './courses/components/course-list/course-list.component';
import { DifferenceComponent } from './difference/difference.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'changeDetection',
        pathMatch: 'full'
    },
    {
        path: 'changeDetection',
        component: ChangeDetectionLayoutComponent,
        pathMatch: 'full'
    },
    {
        path: 'difference',
        component: DifferenceComponent,
        pathMatch: 'full'
    },
    {
        path: 'course',
        component: CourseListComponent,
        pathMatch: 'full'
    }
];
