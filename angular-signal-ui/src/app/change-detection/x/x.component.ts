import { Component, ElementRef, inject } from '@angular/core';
import { highlight } from '../highlight';

@Component({
  selector: 'app-x',
  standalone: true,
  imports: [],
  templateUrl: './x.component.html',
  styleUrl: './x.component.scss',
})
export class XComponent {
  private elementRef: ElementRef = inject(ElementRef);

  highlight(): void {
    highlight(this.elementRef);
  }

  update(): void {}
}
