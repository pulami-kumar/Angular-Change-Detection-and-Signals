import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { highlight } from '../highlight';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [],
  templateUrl: './a.component.html',
  styleUrl: './a.component.scss',
})
export class AComponent {
  private elementRef: ElementRef = inject(ElementRef);
  private changeDetectionRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    // this.detachFromChangeDetection();
    // this.attachToChangeDetection();
  }

  highlight(): void {
    highlight(this.elementRef);
  }

  update(): void {}

  detachFromChangeDetection(): void {
    setTimeout(() => {
      console.log('Removing A Component from change detection cycle.');
      this.changeDetectionRef.detach();
    }, 5000);
  }

  attachToChangeDetection(): void {
    setTimeout(() => {
      console.log('Attaching A Component for change detection cycle.');
      this.changeDetectionRef.reattach();
    }, 10000);
  }

  generateFile(): void {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./a.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log(data);
        this.changeDetectionRef.detectChanges();
      };
      worker.postMessage(null);
    } else {
      /// Web Workers are not supported in this environment.
      console.warn('Web Workers are not supported in this environment.');
    }
  }
}
