import { Component } from '@angular/core';

@Component({
  selector: 'facility-general',
  standalone: true,
  imports: [],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {
  constructor() {
    console.log('GeneralComponent Yüklendi!'); // Lazy loading tetiklenince log düşmeli.
  }
}
