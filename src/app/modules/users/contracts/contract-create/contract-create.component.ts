import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';

export interface RoomData {
  roomType: string;
  cells: Cell[];
}

interface ChildPricing {
  ageRange: { min: number; max: number };
  price: number | null;
  multiplier: number;
}

export interface Pax {
  price: number | null;
  multiplier: number;
  paxNumber?: number; // Pax index'i
}

export interface Cell {
  date: string;
  basePrice: number | null;
  paxes: Pax[];
  childPricing: ChildPricing[];
  stopSales: string | null;
  invalid?: boolean; // Hücrenin validasyon durumu
}



// export interface Room {
//   roomType: string;
//   cells: Cell[];
// }


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
    TabViewModule
  ],
  templateUrl: './contract-create.component.html',
  styleUrl: './contract-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ContractCreateComponent {
  /**
   *
   */


  constructor(private cdr: ChangeDetectorRef) {

  }
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedRoomTypes: any[] = [];
  displayedDates: string[] = [];
  //showPaxes = false;
  stopSales = false;
  addChildPricing: boolean = false;
  stopSalesOptions = [
    { label: 'Evet', value: 'yes' },
    { label: 'Hayır', value: 'no' },
  ];

  availableRoomTypes = [
    { name: 'Promo Room', capacity: 3, childCapacity: 2 },
    { name: 'Standard Room', capacity: 4, childCapacity: 3 },
    { name: 'Superior Room', capacity: 5, childCapacity: 4 },
  ];

  multiplierOptions = Array.from({ length: 41 }, (_, i) => ({
    label: (1 + i * 0.1).toFixed(1), // Görünen değer
    value: (1 + i * 0.1), // Gerçek değer (sayı)
  }));


  tableData: RoomData[] = [];

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
        date,
        basePrice: null,
        paxes: Array.from({ length: room.capacity }, () => ({
          price: null, // Correct type: number | null
          multiplier: 1.0,
        })),
        stopSales: null,
        childPricing: Array.from({ length: room.childCapacity }, () => ({
          ageRange: { min: 0, max: 0 },
          price: null,
          multiplier: 1.0,
        })),
      })),
    }));
  }

  // Yaş Aralığı Ekle
  addAgeRange(cell: any): void {
    cell.childAgeRanges.push({
      minAge: 0,
      maxAge: null,
      price: null,
    });
  }

  // Yaş Aralığı Sil
  removeAgeRange(cell: any, index: number): void {
    cell.childAgeRanges.splice(index, 1);
  }

  //paxes inputlari
  trackByIndex(index: number, item: any): number {
    return index;
  }

  onBasePriceChange(cell: Cell): void {
    if (cell && cell.basePrice !== null && cell.basePrice >= 0) {
      const basePrice = this.convertToNumber(cell.basePrice);
      cell.paxes = cell.paxes.map((pax) => ({
        ...pax,
        price: this.calculatePrice(basePrice, pax.multiplier),
      }));
    }
  }

  onMultiplierChange(cell: Cell, paxIndex: number): void {
    if (cell && paxIndex >= 0) {
      const pax = cell.paxes[paxIndex];
      pax.price = this.calculatePrice(this.convertToNumber(cell.basePrice), pax.multiplier);
    }
  }

  onChildMultiplierChange(cell: Cell, childIndex: number): void {
    const child = cell.childPricing[childIndex];
    child.price = this.calculatePrice(this.convertToNumber(cell.basePrice), child.multiplier);
  }

  private convertToNumber(value: any): number {
    if (typeof value === 'string') {
      value = value.replace(',', '.'); // Virgülü noktaya çevir
    }
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num; // Geçersizse 0 döndür
  }

  private calculatePrice(currentPrice: number, multiplier: number): number {
    if (!isNaN(currentPrice) && !isNaN(multiplier)) {
      return parseFloat((currentPrice * multiplier).toFixed(2)); // `number` döndür
    }
    return 0; // Default fallback
  }

  isCellValid(cell: Cell): boolean {
    // Base fiyat kontrolü
    if (!cell.basePrice || cell.basePrice <= 0) {
      return false;
    }

    // Tüm paxes kontrolü
    for (const pax of cell.paxes) {
      if (!pax.price || pax.price <= 0 || !pax.multiplier) {
        return false;
      }
    }

    // Satışı Durdur kontrolü (Eğer etkinse)
    if (this.stopSales && (!cell.stopSales || cell.stopSales === null)) {
      return false;
    }

    return true; // Tüm alanlar doldurulmuşsa
  }

  saveData(): void {
    let hasErrors = false;

    // Tüm hücreleri kontrol et ve validasyon durumunu ayarla
    for (const room of this.tableData) {
      for (const cell of room.cells) {
        cell.invalid = !this.isCellValid(cell); // Hücrenin validasyon durumu
        if (cell.invalid) {
          hasErrors = true; // Hatalı hücre varsa
        }

        // Paxes bilgilerine "Pax Number" ekle
        cell.paxes = cell.paxes.map((pax, index) => ({
          ...pax,
          paxNumber: index + 1, // Pax index'i 1'den başlayarak ekliyoruz
        }));
      }
    }

    if (hasErrors) {
      console.log('Bazı hücrelerde eksik veya hatalı veri var!');
      const output: RoomData[] = [...this.tableData];
      console.log('Veriler başarıyla kaydedildi:', JSON.stringify(output, null, 2));
    } else {
      // Tip güvenli JSON çıktısı
      const output: RoomData[] = [...this.tableData];
      console.log('Veriler başarıyla kaydedildi:', JSON.stringify(output, null, 2));
    }

    // Angular'ın değişiklik algılamasını tetikleme
    this.cdr.detectChanges();
  }



}

