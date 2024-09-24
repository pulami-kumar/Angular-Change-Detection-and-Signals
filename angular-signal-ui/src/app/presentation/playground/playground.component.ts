import {
  Component,
  computed,
  effect,
  Injector,
  input,
  InputSignal,
  model,
  ModelSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
})
export class PlaygroundComponent {
  private readonlySignal: Signal<number> = signal<number>(5).asReadonly();

  private writeableSignal: WritableSignal<number> = signal<number>(0);

  private computedSignal: Signal<number> = computed(() => {
    return this.writeableSignal() * 5;
  });

  public requiredInputSignal: InputSignal<number> = input.required<number>();

  public optionalInputSignal: InputSignal<number | undefined> = input<number>();

  public requiredModelSignal: ModelSignal<number> = model.required<number>();

  public optionalModelSignal: ModelSignal<number | undefined> = model<number>();

  someMethod() {
    this.writeableSignal.set(50);
    this.writeableSignal.update((previousValue) => previousValue + 100);

    console.log('The value of computedSignal is: ', this.computedSignal());
  }

  constructor(private injector: Injector) {
    effect(() => {
      console.log('The value of Computed Signal is: ', this.computedSignal());
    });
  }

  private loggingEffect = effect(() => {
    console.log('The value of Computed Signal is: ', this.computedSignal());
  });

  private initializeLogging(): void {
    effect(
      () => {
        console.log('The value of Computed Signal is: ', this.computedSignal());
      },
      { injector: this.injector }
    );
  }
}
