import { Component } from '@angular/core';
import { SignalComponent } from './components/signal/signal.component';
import { ZoneJsComponent } from './components/zone-js/zone-js.component';

@Component({
  selector: 'app-difference',
  standalone: true,
  imports: [ZoneJsComponent, SignalComponent],
  templateUrl: './difference.component.html',
  styleUrl: './difference.component.scss',
})
export class DifferenceComponent {}
