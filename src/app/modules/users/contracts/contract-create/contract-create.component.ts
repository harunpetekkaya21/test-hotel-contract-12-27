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
import { Observable, of } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
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
  paxNumber?: number;
}

export interface Cell {
  date: string;
  basePrice: number | null;
  paxes: Pax[];
  childPricing: ChildPricing[];
  stopSales: string | null;
  invalid?: boolean;
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
    TabViewModule,
    ToastModule,
    DialogModule
  ],
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractCreateComponent {
 

  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedRoomTypes: any[] = [];
  displayedDates: string[] = [];
  stopSales = false;
  addChildPricing = false;

  validationTriggered: boolean = false; // Doğrulama tetiklendi mi?

  selectedCurrency: string = 'EUR'; // Varsayılan para birimi

  isDataSaved: boolean = false; // Verilerin kaydedilip kaydedilmediğini izler
  showUnsavedModal: boolean = false;


  stopSalesOptions = [
    { label: 'Evet', value: 'yes' },
    { label: 'Hayır', value: 'no' },
  ];

  availableRoomTypes = [
    { name: 'Promo Room', capacity: 3, childCapacity: 3 },
    { name: 'Standard Room / Kara Manzarali', capacity: 2, childCapacity: 2 },
    { name: 'Standard Room / Deniz Manzarali', capacity: 2, childCapacity: 2 },
    { name: 'Superior Room', capacity: 5, childCapacity: 4 },
  ];

  // Para birimi seçenekleri
  currencyOptions = [
    { label: 'Euro', value: 'EUR' },
    { label: 'Dolar', value: 'USD' },
    { label: 'Türk Lirasi', value: 'TRY' },
  ];

  multiplierOptions = Array.from({ length: 41 }, (_, i) => ({
    label: (1 + i * 0.1).toFixed(1),
    value: 1 + i * 0.1,
  }));

  tableData: RoomData[] = [];
  data$: Observable<RoomData[]> = of(this.tableData);

  constructor(private cdr: ChangeDetectorRef,private messageService: MessageService) {}

  ngOnInit(): void {
    //this.loadDataFromStorage(); // Sayfa yüklendiğinde verileri yükle
  }

  // // Local Storage'a veri kaydet
  // saveDataToStorage(): void {
  //   localStorage.setItem('unsavedTableData', JSON.stringify(this.tableData));
  // }

  // // Local Storage'dan veri yükle
  // loadDataFromStorage(): void {
  //   const savedData = localStorage.getItem('unsavedTableData');
  //   if (savedData) {
  //     this.tableData = JSON.parse(savedData);

  //      // Tabloyu UI'a bağlamak için gerekli işlemler
  //   this.selectedRoomTypes = this.tableData.map((room) => ({
  //     name: room.roomType,
  //     capacity: room.cells[0].paxes.length, // Pax sayısını kullanarak kapasite belirleme
  //     childCapacity: room.cells[0].childPricing.length, // Çocuk kapasitesini belirleme
  //   }));

  //   this.displayedDates = this.tableData[0]?.cells.map((cell) => cell.date) || [];
  //   }
  // }

  onDateRangeChange(): void {
    if (this.startDate && this.endDate) {
      this.displayedDates = this.generateDates(this.startDate, this.endDate);
      this.generateTableData();
    }
  }
  onCurrencyChange(event: any): void {
    // Tablodaki tüm ilgili alanların para birimini değiştirmek için
  this.selectedCurrency = event.value;
    console.log('Selected Currency:', this.selectedCurrency);
  }
  updateRoomSelection(): void {
    this.generateTableData();
  }

  generateTableData(): void {
    this.tableData = this.selectedRoomTypes.map((room) => ({
      roomType: room.name,
      cells: this.displayedDates.map((date) =>
        this.createCell(date, room.capacity, room.childCapacity)
      ),
    }));
    this.data$ = of(this.tableData); // Akışı güncelle
    
  }

  createCell(date: string, capacity: number, childCapacity: number): Cell {
    return {
      date,
      basePrice: null,
      paxes: Array.from({ length: capacity }, (_, index) => ({
        price: null,
        multiplier: 1.0,
        paxNumber: index + 1,
      })),
      stopSales: null,
      childPricing: Array.from({ length: capacity }, (_, index) => ({
        ageRange: { min: 0, max: 0 },
        price: null,
        multiplier: 1.0,
        childIndex: index + 1,
      })),

    };
    
  }

  private generateDates(start: Date, end: Date): string[] {
    const dates = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  onBasePriceChange(cell: Cell): void {
    if (cell?.basePrice !== null) {
      const basePrice = this.convertToNumber(cell.basePrice);
      cell.paxes = cell.paxes.map((pax) => ({
        ...pax,
        price: this.calculatePrice(basePrice, pax.multiplier),
      }));
      
    }
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
        return 'fas fa-money-bill-alt'; // Varsayılan ikon
    }
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
    const num = parseFloat(value?.toString().replace(',', '.') ?? '0');
    return isNaN(num) ? 0 : num;
  }

  private calculatePrice(currentPrice: number, multiplier: number): number {
    return parseFloat((currentPrice * multiplier).toFixed(2));
  }

  validateCells(): void {
    this.validationTriggered = true;
    const invalidCells: { roomType: string; date: string }[] = [];

    for (const room of this.tableData) {
      for (const cell of room.cells) {
        const isValid = this.isCellValid(cell);
        cell.invalid = !isValid;
        if (!isValid) {
          invalidCells.push({ roomType: room.roomType, date: cell.date });
        }
      }
    }

    // Geçersiz hücreler için toast mesajları
    if (invalidCells.length > 0) {
      invalidCells.forEach(cell =>
        this.messageService.add({
          severity: 'error',
          summary: 'Geçersiz Hücre',
          detail: `${cell.roomType} - ${cell.date}`,
        })
      );
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Tüm hücreler geçerli!',
      });
    }
  }
  isCellValid(cell: Cell): boolean {
    if (!cell.basePrice || cell.basePrice <= 0) {
      return false;
    }
    if (cell.paxes.some(pax => !pax.price || pax.price <= 0)) {
      return false;
    }
    return true;
  }



  // Kaydet Butonu Fonksiyonu
  saveData(): void {
    this.validateCells();
    const hasInvalidCells = this.tableData.some(room =>
      room.cells.some(cell => cell.invalid)
    );

    if (!hasInvalidCells) {
      this.isDataSaved = true;
      //this.saveDataToStorage(); // Local Storage'a kaydet
      console.log('Veriler başarıyla kaydedildi:', JSON.stringify(this.tableData, null, 2));
    }
  }
  trackByIndex(index: number): number {
    return index;
  }

  trackByRoom(index: number, room: RoomData): string {
    return room.roomType;
  }
  // confirmExit(): void {
  //   this.showUnsavedModal = false;
  //   this.isDataSaved = true; // Çıkışa izin ver
  // }
  
  // cancelExit(): void {
  //   this.showUnsavedModal = false; // Modal kapatılır, sayfa değişmez
  // }
  // // Sayfa Yenileme ve Çıkış Uyarısı
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   if (!this.isDataSaved) {
  //     $event.returnValue = true; // Tarayıcıdan çıkış uyarısı
  //   }
  // }
}
