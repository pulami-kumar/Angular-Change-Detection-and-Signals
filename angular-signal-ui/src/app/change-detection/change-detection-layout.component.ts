import { ApplicationRef, Component, inject } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-change-detection-layout',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './change-detection-layout.component.html',
  styleUrl: './change-detection-layout.component.scss',
})
export class ChangeDetectionLayoutComponent {
  private appRef: ApplicationRef = inject(ApplicationRef);

  runChangeDetection(): void {
    this.appRef.tick();
  }
}
