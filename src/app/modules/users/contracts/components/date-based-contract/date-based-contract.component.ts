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
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid'; // UUID için
import { ContractConfirmDialogComponent } from '../../contract-confirm-dialog/contract-confirm-dialog.component';
import { PriceCalculationService } from '../../../../../core/services/contract/price-calculation.service';
import { RoomTypeService } from '../../../../../core/services/room-type.service';
import { ContractService } from '../../../../../core/services/contract/contract.service';

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
  childIndex?: number;
}

export interface Adult {
  price: number | null;
  multiplier: number;
  adultNumber?: number;
}

export interface Cell {
  date: string;
  basePrice: number | null;
  allotment: number | null;
  adults: Adult[];
  childPricing: ChildPricing[];
  stopSales: boolean | null;
  invalid?: boolean;
}
@Component({
  selector: 'app-date-based-contract',
  standalone: true,
  imports: [ReactiveFormsModule,
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

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateBasedContractComponent {



  startDate: Date | null = null;
  endDate: Date | null = null;
  // selectedRoomTypes: any[] = [];
  selectedRoomTypes: { name: string; capacity: number; childCapacity: number, basePrice: number }[] = [];

  displayedDates: string[] = [];
  stopSales = false;
  addChildPricing = false;

  validationTriggered: boolean = false; // Doğrulama tetiklendi mi?

  selectedCurrency: string = 'EUR'; // Varsayılan para birimi

  isDataSaved: boolean = false; // Verilerin kaydedilip kaydedilmediğini izler
  showUnsavedModal: boolean = false;

  contractConfirmDialog: boolean = false;



  stopSalesOptions = [
    { label: 'Evet', value: true },
    { label: 'Hayir', value: false },
  ];

  availableRoomTypes: any[] = [];

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


  constructor(private cdr: ChangeDetectorRef, private priceService: PriceCalculationService, private messageService: MessageService, private roomTypeService: RoomTypeService, private contractService: ContractService) { }

  ngOnInit(): void {
    this.fetchRoomTypes();
  }

  private fetchRoomTypes(): void {
    this.roomTypeService
      .getAvailableRoomTypes()
      .pipe(
        tap((data) => {
          if (data && Array.isArray(data)) {
            this.availableRoomTypes = data; // UI'de kullanılacak veriyi atama
            console.log('succsess:', data);
          } else {
            //console.warn('Servisten gecersiz bir veri dondu:', data);
          }
        }),
        catchError((error) => {
          this.addToMessageQueue('error', 'hata', 'Oda bilgileri alinirken bir hata olustu! Lutfen uygulamayi tekrar baslatin');
          console.error('--', error);
          return of([]); // Hata durumunda boş bir array döndür
        })
      )
      .subscribe();
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

      const basePrice = this.availableRoomTypes.find(
        (availableRoom) => availableRoom.name === roomType.name
      )?.basePrice;

      const cells: Cell[] = this.displayedDates.map((date) => {
        date

        const existingCell = existingRoom?.cells.find((cell) => cell.date === date);
        return existingCell || this.createCell(date, roomType.capacity, roomType.childCapacity, basePrice);
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


  createCell(date: string, capacity: number, childCapacity: number, basePrice: number|0 ): Cell {
    return {
      date,
      basePrice,
      allotment: 0,
      adults: Array.from({ length: capacity }, (_, index) => ({
        price: 0,
        multiplier: 1.0,
        adultNumber: index + 1,
      })),
      stopSales: false,
      childPricing: Array.from({ length: childCapacity }, (_, index) => ({
        ageRange: { min: 0, max: 0 },
        price: 0,
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

      cell.adults = cell.adults.map((adoult) => ({
        ...adoult,
        price: this.priceService.calculatePrice(cell.basePrice, adoult.multiplier),
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
    const adoult = cell.adults[paxIndex];
    adoult.price = this.priceService.calculatePrice(cell.basePrice, adoult.multiplier);
  }

  onChildMultiplierChange(cell: Cell, childIndex: number): void {
    const child = cell.childPricing[childIndex];
    child.price = this.priceService.calculatePrice(cell.basePrice, child.multiplier);
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
      !cell.adults.some((adoult) => adoult.price === null || adoult.price <= 0 ||
        cell.allotment <= 0)

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
      //this.messageService.add({ severity: 'success', summary: 'Basarili', detail: 'Veriler kaydedildi.' });

      this.contractConfirmDialog = true;//dialogu ac
    }
  }


  // Dialogdan gelen "saveContract" olayını işleyen fonksiyon
  onContractSave(contractData: any): void {
    console.log('Contract verisi kaydedildi:', contractData);
    // console.log('Veriler Basariyla kaydedildi:', JSON.stringify(this.tableData, null, 2));

    const data = this.generateContractJson();
    console.log(data);

    this.contractService.saveContract(data).subscribe({
      next: (response) => {
        console.log('Contract saved:', response);
        alert('Veri başarıyla kaydedildi!');
      },
      error: (error) => {
        console.error('Error saving contract:', error);
        alert('Veri kaydedilirken bir hata oluştu.');
      },
    });

    //this.addToMessageQueue('success', 'Basarili', 'Contract basariyla kaydedildi!');
    this.contractConfirmDialog = false;
    this.cdr.detectChanges();
  }


  trackByIndex(index: number): number {
    return index;
  }

  private generateContractJson(): any {
    return {
      IdFromClient: 'example-id',
      // IsTableDataSavedFromClient: false,
      //IsPending: false,
      HotelId: 1,
      IsDateBased: true,
      RoomTypes: this.tableData.map(room => ({
        RoomType: room.roomType,
        Cells: room.cells.map(cell => ({
          Date: cell.date,
          BasePrice: cell.basePrice,
          StopSales: cell.stopSales,
          Adults: cell.adults.map(adult => ({
            AdultNumber: adult.adultNumber,
            Price: adult.price,
            Multiplier: adult.multiplier,
          })),
          ChildPricing: cell.childPricing.map(child => ({
            ChildIndex: child.childIndex,
            AgeRange: {
              Min: child.ageRange.min,
              Max: child.ageRange.max,
            },
            Price: child.price,
            Multiplier: child.multiplier,
          })),


        })),
      })),
    };
  }

}
