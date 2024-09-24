import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { highlight } from '../highlight';
import { XComponent } from '../x/x.component';
import { YComponent } from '../y/y.component';

@Component({
  selector: 'app-b',
  standalone: true,
  imports: [XComponent, YComponent],
  templateUrl: './b.component.html',
  styleUrl: './b.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BComponent {
  loopCount: number = 0;

  private elementRef: ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    // this.triggerChangeDetection();
    // this.markDirty();
    // this.observeChangeDetectionOnAsync();
  }

  highlight(): void {
    highlight(this.elementRef);
  }

  triggerChangeDetection(): void {
    setTimeout(() => {
      console.log('Manually Triggering change detection for B component.');
      this.changeDetectionRef.detectChanges();
    }, 5000);
  }

  markDirty(): void {
    console.log('Manually marking dirty.');
    this.changeDetectionRef.markForCheck();
  }

  observeChangeDetection(): void {
    for (let i = 0; i < 50000; i++) {
      console.log('Loop Count: ', i);
      this.loopCount = i;
    }
  }

  observeChangeDetectionOnAsync(): void {
    setTimeout(() => {
      console.log('Changing loop count through async event.');
      this.loopCount = 9999999;
    }, 5000);
  }

  private changeDetectionRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  manuallyTriggerChangeDetection(): void {
    //some logic...
    this.changeDetectionRef.detectChanges();
  }

  manuallyMarkDirty(): void {
    //some logic...
    this.changeDetectionRef.markForCheck();
  }

  detachFromChangeDetection(): void {
    //some logic...
    this.changeDetectionRef.detach();
  }

  reAttachToChangeDetection(): void {
    //some logic...
    this.changeDetectionRef.reattach();
  }
}
