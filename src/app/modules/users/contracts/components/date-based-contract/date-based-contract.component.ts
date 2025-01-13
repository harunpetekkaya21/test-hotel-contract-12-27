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
import { v4 as uuidv4 } from 'uuid'; // UUID için
import { ContractConfirmDialogComponent } from '../../contract-confirm-dialog/contract-confirm-dialog.component';

export interface RoomData {
  idFromClient: string; // Unique ID
  isTableDataSavedFromClient: boolean; // Veriler kaydedildi mi?
  isPending: boolean; // Askıda mı?
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
  allotment: number | null;
  paxes: Pax[];
  childPricing: ChildPricing[];
  stopSales: string | null;
  invalid?: boolean;
}
@Component({
  selector: 'app-date-based-contract',
  standalone: true,
  imports: [ ReactiveFormsModule,
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
    ContractConfirmDialogComponent
    ],
  templateUrl: './date-based-contract.component.html',
  styleUrl: './date-based-contract.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateBasedContractComponent {

  

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

  contractConfirmDialog: boolean = false; 



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



  private tableDataSubject = new BehaviorSubject<RoomData[]>([]);


  data$: Observable<RoomData[]> = this.tableDataSubject.asObservable();

  private cachedDates: { start: Date; end: Date; dates: string[] } | null = null;
  private messageQueue: { severity: string; summary: string; detail: string }[] = [];


  constructor(private cdr: ChangeDetectorRef, private messageService: MessageService) { }

  ngOnInit(): void {
   
  }


  onDateRangeChange(): void {
      // Tarih doğrulaması
      if (this.endDate < this.startDate) {
        this.endDate = null; // Bitiş Tarihini temizle
        this.addToMessageQueue('error', 'Tarih Hatasi', 'Bitiş Tarihi, Baslangic Tarihinden küçük olamaz!');
       
        return; // İşlemi durdur
      }


  }
  
  
  onCurrencyChange(event: any): void {
    // Tablodaki tüm ilgili alanların para birimini değiştirmek için
    this.selectedCurrency = event.value;
    console.log('Selected Currency:', this.selectedCurrency);
  }

  updateRoomSelection(): void {
    this.displayedDates = this.generateDates(this.startDate, this.endDate);
    this.generateTableData();
  }
  generateTableData(): void {
    this.tableData = this.selectedRoomTypes.map((roomType) => {
      const existingRoom = this.tableData.find((room) => room.roomType === roomType.name);
      const idFromClient = existingRoom?.idFromClient || uuidv4(); // Unique ID

      const cells: Cell[] = this.displayedDates.map((date) => {
        const existingCell = existingRoom?.cells.find((cell) => cell.date === date);
        return existingCell || this.createCell(date, roomType.capacity, roomType.childCapacity);
      });

      return {
        idFromClient,
        roomType: roomType.name,
        isTableDataSavedFromClient: false,
        isPending: false,
        cells
      };
    });
  }
  

  createCell(date: string, capacity: number, childCapacity: number): Cell {
    return {
      date,
      basePrice: null,
      allotment: null,
      paxes: Array.from({ length: capacity }, (_, index) => ({
        price: null,
        multiplier: 1.0,
        paxNumber: index + 1,
      })),
      stopSales: null,
      childPricing: Array.from({ length: childCapacity }, (_, index) => ({
        ageRange: { min: 0, max: 0 },
        price: null,
        multiplier: 1.0,
        childIndex: index + 1,
      })),

    };
    
  }
  

  private generateDates(start: Date, end: Date): string[] {
    if (
      this.cachedDates &&
      this.cachedDates.start.getTime() === start.getTime() &&
      this.cachedDates.end.getTime() === end.getTime()
    ) {
      return this.cachedDates.dates; // Önceki sonucu döndür
    }
  
    const dates: string[] = [];
    let currentDate = new Date(start);
    currentDate.setHours(12, 0, 0, 0);
    const endDate = new Date(end);
    endDate.setHours(12, 0, 0, 0);
  
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    this.cachedDates = { start, end, dates };
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
        return 'fas fa-lira-sign'; // Varsayılan ikon
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

  private processMessageQueue(): void {
    if (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.messageService.add(message);
        setTimeout(() => this.processMessageQueue(), 300); // 300 ms bekle
      }
    }
  }

  private addToMessageQueue(severity: string, summary: string, detail: string): void {
    this.messageQueue.push({ severity, summary, detail });
    if (this.messageQueue.length === 1) {
      this.processMessageQueue(); // İlk mesajı işlemeye başla
    }
  }

  validateCells(): { roomType: string; date: string }[] {
    this.validationTriggered = true;

    const invalidCells: { roomType: string; date: string }[] = [];

    this.tableData.forEach((room) => {
      room.cells.forEach((cell) => {
        cell.invalid = !this.isCellValid(cell);
        if (cell.invalid) {
          invalidCells.push({ roomType: room.roomType, date: cell.date });
        }
      });
    });

    return invalidCells;
  }
  
  

  isCellValid(cell: Cell): boolean {
    return (
      cell.basePrice !== null &&
      cell.basePrice > 0 &&
      !cell.paxes.some((pax) => pax.price === null || pax.price <= 0)
    );
  }

  saveData(): void {
    const invalidCells = this.validateCells();

    if (invalidCells.length > 0) {
      invalidCells.forEach((cell) =>
        this.addToMessageQueue(
          'error',
          'Geçersiz Hücre',
          `Oda Tipi: ${cell.roomType}, Tarih: ${cell.date}`
        )
      );

      this.contractConfirmDialog = false;
    } else {
      this.tableData.forEach((room) => {
        room.isTableDataSavedFromClient = true;
        room.isPending = false;
      });
  
      //this.messageService.add({ severity: 'success', summary: 'Basarili', detail: 'Veriler kaydedildi.' });
     
      this.contractConfirmDialog = true;//dialogu ac
    }
  }


  // Dialogdan gelen "saveContract" olayını işleyen fonksiyon
  onContractSave(contractData: any): void {
    console.log('Contract verisi kaydedildi:', contractData);
    console.log('Veriler Basariyla kaydedildi:', JSON.stringify(this.tableData, null, 2));

    this.addToMessageQueue('success', 'Basarili', 'Contract basariyla kaydedildi!');
    this.contractConfirmDialog = false;
    this.cdr.detectChanges();
  }


trackByIndex(index: number): number {
  return index;
}
}
