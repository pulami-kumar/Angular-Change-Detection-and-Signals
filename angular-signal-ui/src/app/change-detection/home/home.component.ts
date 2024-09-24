import { Component, ElementRef, inject } from '@angular/core';
import { AComponent } from '../a/a.component';
import { BComponent } from '../b/b.component';
import { highlight } from '../highlight';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AComponent, BComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private elementRef: ElementRef = inject(ElementRef);

  highlight(): void {
    highlight(this.elementRef);
  }

  update(): void {}
}
