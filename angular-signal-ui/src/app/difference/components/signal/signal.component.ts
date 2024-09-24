import { CommonModule } from '@angular/common';
import { Component, WritableSignal, effect, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss',
})
export class SignalComponent {
  displayingValue: WritableSignal<string> = signal('Hello');
  remainingTime: WritableSignal<number> = signal(5);
  timerInterval: any;
  isChanged: WritableSignal<boolean> = signal(false);

  constructor(private toastr: ToastrService) {
    effect(() => {
      this.toastr.warning(
        `The new value is ${this.displayingValue()}`,
        'Change Detected!'
      );
    });
  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.reset();
    this.timerInterval = setInterval(() => {
      if (this.remainingTime() > 0) {
        this.remainingTime.update((value) => --value);
      } else {
        clearInterval(this.timerInterval);
        this.displayingValue.update((value) =>
          value === 'Namaste' ? 'Hello' : 'Namaste'
        );
        this.isChanged.set(true);
      }
    }, 1000);
  }

  private reset(): void {
    this.isChanged.set(false);
    this.remainingTime.set(5);
  }
}
