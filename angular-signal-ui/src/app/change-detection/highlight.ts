import { ElementRef } from '@angular/core';

export function highlight(elementRef: ElementRef): void {
  const className: string = 'checked';
  const a = elementRef.nativeElement.querySelector('a');
  a.classList.add(className);
  setTimeout(() => {
    a.classList.remove(className);
  }, 500);
}
