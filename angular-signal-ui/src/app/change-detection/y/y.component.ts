import { Component, ElementRef, inject } from '@angular/core';
import { highlight } from '../highlight';

@Component({
  selector: 'app-y',
  standalone: true,
  imports: [],
  templateUrl: './y.component.html',
  styleUrl: './y.component.scss',
})
export class YComponent {
  title: string = 'Y Comp';

  private elementRef: ElementRef = inject(ElementRef);

  highlight(): void {
    highlight(this.elementRef);
  }

  update(): void {}
}
