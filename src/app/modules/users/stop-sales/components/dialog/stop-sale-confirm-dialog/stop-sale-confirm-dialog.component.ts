import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-stop-sale-confirm-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule,DialogModule,ButtonModule],
  templateUrl: './stop-sale-confirm-dialog.component.html',
  styleUrl: './stop-sale-confirm-dialog.component.scss'
})
export class StopSaleConfirmDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saveContract = new EventEmitter<any>();


  contractName: string = '';
  selectedClosedMarkets: any[] = [];
  selectedOpenMarkets: any[] = [];
 // countries = this.COUNTRIES;

  save() {
    this.saveContract.emit({
      contractName: this.contractName,
      closedMarkets: this.selectedClosedMarkets,
      openMarkets: this.selectedOpenMarkets,
    });
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  cancel() {
    
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onDialogClose(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
