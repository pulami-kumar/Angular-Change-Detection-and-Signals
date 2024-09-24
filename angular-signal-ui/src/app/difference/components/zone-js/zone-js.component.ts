import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-zone-js',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zone-js.component.html',
  styleUrl: './zone-js.component.scss',
})
export class ZoneJsComponent {
  displayingValue: string = 'Hello!';
  remainingTime: number = 5;
  timerInterval: any;
  isChanged: boolean = false;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.reset();
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timerInterval);
        this.displayingValue =
          this.displayingValue === 'Namaste' ? 'Hello!' : 'Namaste';
        this.isChanged = true;
      }
    }, 1000);
  }

  private reset(): void {
    this.isChanged = false;
    this.remainingTime = 5;
  }
}
