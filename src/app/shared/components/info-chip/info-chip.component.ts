import { Component, Input } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-info-chip',
  standalone: true,
  imports: [ChipModule,DialogModule],
  templateUrl: './info-chip.component.html',
  styleUrl: './info-chip.component.scss'
})
export class InfoChipComponent {
  @Input() label: string = 'Info';
  @Input() icon: string = 'fa fa-circle-info'; // Default icon class
  @Input() dialogTitle: string = 'Information'; // Dialog title
  dialogVisible: boolean = false;

  showDialog(): void {
    this.dialogVisible = true;
  }
}
