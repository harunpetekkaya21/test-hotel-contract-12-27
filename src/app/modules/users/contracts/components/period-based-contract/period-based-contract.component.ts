import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { v4 as uuidv4 } from 'uuid'; // Benzersiz ID için
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';

export interface Period {
  id: string;
  startDate: Date;
  endDate: Date;
  selectedRoomTypes: any[];
  addChildPricing: boolean;
  roomData: RoomData[];
}

export interface RoomData {
  roomType: string;
  cells: Cell[];
}

export interface Cell {
  basePrice: number | null;
  allotment: number | null;
  paxes: Pax[];
  childPricing: ChildPricing[];
}

export interface Pax {
  paxNumber: number;
  price: number | null;
  multiplier: number;
}

export interface ChildPricing {
  ageRange: { min: number; max: number };
  price: number | null;
  multiplier: number;
}


@Component({
  selector: 'app-period-based-contract',
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
    TabViewModule,
    ToastModule,
    DialogModule,
    AccordionModule,
    ChipModule

  ],
  templateUrl: './period-based-contract.component.html',
  styleUrl: './period-based-contract.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PeriodBasedContractComponent {

  informationDialogVisible: boolean = false;

  activeIndex: number | undefined = 0;

  activeIndexChange(index :any){
      this.activeIndex = index
  }

  startDate: Date | null = null;
  //startDate:  Date= new Date(1,1,2022);
  endDate: Date | null = null;
  //endDate:  Date= new Date(1,5,2022);
  periods: Period[] = [];
  selectedCurrency = 'EUR';

  availableRoomTypes = [
    { name: 'Promo Room', capacity: 3, childCapacity: 2 },
    { name: 'Standard Room', capacity: 2, childCapacity: 2 },
    { name: 'Superior Room', capacity: 5, childCapacity: 3 },
  ];

  NgOnInit(): void {
    
  }

  constructor(private messageService: MessageService) {
    
    
  }
  showInformationDialog(){
    this.informationDialogVisible=true;
  }

  multiplierOptions = Array.from({ length: 41 }, (_, i) => ({
    label: (1 + i * 0.1).toFixed(1),
    value: 1 + i * 0.1,
  }));

  addPeriod(): void {
    if (!this.startDate || !this.endDate) {
      this.showError('Başlangıç ve bitiş tarihlerini seçmelisiniz!');
      return;
    }

    if (this.endDate <= this.startDate) {
      this.showError('Bitiş tarihi, başlangıç tarihinden önce olamaz!');
      return;
    }

    const newPeriod: Period = {
      id: uuidv4(),
      startDate: this.startDate,
      endDate: this.endDate,
      selectedRoomTypes: [],
      addChildPricing: false,
      roomData: [],
    };

    this.periods.push(newPeriod);
    this.startDate = null;
    this.endDate = null;
  }

  removePeriod(index: number): void {
    this.periods.splice(index, 1);
    this.showSuccess('Periyot başarıyla silindi!');
  }


  onRoomTypeChange(period: Period): void {
    period.roomData = period.selectedRoomTypes.map((roomType: any) => ({
      roomType: roomType.name,
      cells: this.generateRoomCells(roomType.capacity, roomType.childCapacity, period.addChildPricing),
    }));
  }

  onChildPricingToggle(period: Period): void {
    period.roomData.forEach((room) => {
      room.cells.forEach((cell) => {
        cell.childPricing = period.addChildPricing
          ? this.generateChildPricing(this.getChildCapacity(room.roomType))
          : [];
      });
    });
  }
  
  private generateRoomCells(capacity: number, childCapacity: number, addChildPricing: boolean): Cell[] {
    return [
      {
        basePrice: null,
        allotment: null,
        paxes: Array.from({ length: capacity }, (_, i) => ({
          paxNumber: i + 1,
          price: null,
          multiplier: 1.0,
        })),
        childPricing: addChildPricing
          ? Array.from({ length: childCapacity }, () => ({
              ageRange: { min: 0, max: 0 },
              price: null,
              multiplier: 1.0,
            }))
          : [],
      },
    ];
  }
  
  private getChildCapacity(roomType: string): number {
    return this.availableRoomTypes.find((type) => type.name === roomType)?.childCapacity || 0;
  }
  private generateChildPricing(childCapacity: number): ChildPricing[] {
    return Array.from({ length: childCapacity }, () => ({
      ageRange: { min: 0, max: 0 },
      price: null,
      multiplier: 1.0,
    }));
  }

  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Hata', detail: message });
  }

  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: message });
  }
  
  onBasePriceChange(cell: Cell): void {
    const basePrice = this.convertToNumber(cell.basePrice);
    cell.paxes = cell.paxes.map((pax) => ({
      ...pax,
      price: this.calculatePrice(basePrice, pax.multiplier),
    }));
  }

  onMultiplierChange(cell: Cell, paxIndex: number): void {
    const pax = cell.paxes[paxIndex];
    pax.price = this.calculatePrice(this.convertToNumber(cell.basePrice), pax.multiplier);
  }

  onChildMultiplierChange(cell: Cell, childIndex: number): void {
    const child = cell.childPricing[childIndex];
    child.price = this.calculatePrice(this.convertToNumber(cell.basePrice), child.multiplier);
  }

  private convertToNumber(value: any): number {
    return parseFloat(value?.toString().replace(',', '.') ?? '0') || 0;
  }

  private calculatePrice(currentPrice: number, multiplier: number): number {
    return parseFloat((currentPrice * multiplier).toFixed(2));
  }

  getCurrencyIconClass(currency: string): string {
    switch (currency) {
      case 'EUR':
        return 'fas fa-euro-sign';
      case 'USD':
        return 'fas fa-dollar-sign';
      case 'TRY':
        return 'fas fa-lira-sign';
      default:
        return 'fas fa-lira-sign'; // Varsayılan ikon
    }
  }

  saveData(): void {
    // Verileri JSON olarak konsola yazdırır
    console.log('Kaydedilen Veriler:', JSON.stringify(this.periods, null, 2));
    this.showSuccess('Veriler başarıyla kaydedildi!');
  }
}
