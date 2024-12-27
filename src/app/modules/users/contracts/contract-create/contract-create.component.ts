import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

export interface RoomData {
  roomType: string;
  dates: {
    [date: string]: {
      price: number;
      kontenjan: number; // Availability yerine kontenjan
    };
  };
}
@Component({
  selector: 'app-contract-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    CardModule,
    TableModule,
    InputNumberModule,
  ],
  templateUrl: './contract-create.component.html',
  styleUrl: './contract-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractCreateComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedRoomTypes: any[] = [];
  displayedDates: string[] = [];
  showPaxes = false;
  stopSales = false;
  stopSalesOptions = [
    { label: 'Evet', value: 'yes' },
    { label: 'Hayır', value: 'no' },
  ];

  availableRoomTypes = [
    { name: 'Promo Room', capacity: 3 },
    { name: 'Standard Room', capacity: 4 },
    { name: 'Superior Room', capacity: 5 },
  ];

  tableData: any[] = [];

  onDateRangeChange(): void {
    if (this.startDate && this.endDate) {
      const dates = [];
      let currentDate = new Date(this.startDate);
      while (currentDate <= this.endDate) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.displayedDates = dates;
      this.generateTableData();
    }
  }

  updateRoomSelection(): void {
    this.generateTableData();
  }

  generateTableData(): void {
    this.tableData = this.selectedRoomTypes.map((room) => ({
      roomType: room.name,
       cells: this.displayedDates.map((date) => ({
        date: date, // Tarihi her hücreye ekliyoruz
        basePrice: null,
        capacity: null,
        paxes: Array.from({ length: room.capacity }, () => null), // Her misafir için bağımsız değer
        stopSales: null,
      })),
    }));
  }

  onFocus(event: Event, iconClass: string): void {
    const element = (event.target as HTMLElement).parentElement?.querySelector(`.${iconClass}`);
    if (element) {
      element.classList.add('focused');
    }
  }

  onBlur(event: Event, iconClass: string): void {
    const element = (event.target as HTMLElement).parentElement?.querySelector(`.${iconClass}`);
    if (element) {
      element.classList.remove('focused');
    }
  }
  //paxes inputlari
  trackByIndex(index: number, item: any): number {
    return index;
  }

  saveData(): void {
    console.log(JSON.stringify(this.tableData, null, 2));
  }

}
