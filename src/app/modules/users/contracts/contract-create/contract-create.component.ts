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
import { ContractConfirmDialogComponent } from '../components/contract-confirm-dialog/contract-confirm-dialog.component';
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
  allotment: number | null;//Kontenjan
  paxes: Pax[];
  childPricing: ChildPricing[];
  stopSales: string | null;
  invalid?: boolean;
}

@Component({
  selector: 'app-contract-create',
  standalone: true,
  imports: [
    ContractConfirmDialogComponent,
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

  openDialog: boolean = false;


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
    
  }



  onDateRangeChange(): void {
    if (this.startDate && this.endDate) {
      // Tarih doğrulaması
      if (this.endDate < this.startDate) {
        this.endDate = null; // Bitiş Tarihini temizle
        this.messageService.add({
          severity: 'error',
          summary: 'Tarih Hatası',
          detail: 'Bitiş Tarihi, Başlangıç Tarihinden küçük olamaz!',
        });
       
        return; // İşlemi durdur
      }
  
      // Tarihler valid ise tabloyu oluştur
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
    const updatedTableData: RoomData[] = [];
  
    this.selectedRoomTypes.forEach((room) => {
      const existingRoom = this.tableData.find((r) => r.roomType === room.name);
      const cells: Cell[] = this.displayedDates.map((date) => {
        // Önceki tablo verilerinden mevcut hücreyi bul
        const existingCell = existingRoom?.cells.find((cell) => cell.date === date);
  
        // Mevcut hücre varsa aynen koru, yoksa yeni oluştur
        return existingCell || this.createCell(date, room.capacity, room.childCapacity);
      });
  
      updatedTableData.push({
        roomType: room.name,
        cells: cells,
      });
    });
  
    this.tableData = updatedTableData;
    this.data$ = of(this.tableData); // Akışı güncelle
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
      })),
    };
  }
  

  private generateDates(start: Date, end: Date): string[] {
    const dates: string[] = [];
    
    // Tarihlerin saat bilgisini sıfırla
    let currentDate = new Date(start);
    currentDate.setHours(12, 0, 0, 0); // Saat bilgisi sıfırlanır (UTC sapmasını önlemek için 12:00 kullanılır)
    const endDate = new Date(end);
    endDate.setHours(12, 0, 0, 0); // Saat bilgisi sıfırlanır
  
    while (currentDate <= endDate) {
      // Tarihi ISO formatına çevir ve listeye ekle
      dates.push(new Date(currentDate).toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1); // Bir gün ekle
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



  saveData(): void {
    // Tüm hücrelerin validasyonunu kontrol et
    this.validateCells();
    const hasInvalidCells = this.tableData.some(room =>
      room.cells.some(cell => cell.invalid)
    );
  
    if (hasInvalidCells) {
      // Hücrelerde geçersiz veri varsa dialog açılmasın
      this.messageService.add({
        severity: 'error',
        summary: 'Geçersiz Hücreler',
        detail: 'Bazı hücreler geçersiz. Lütfen kontrol edin.',
      });
      this.openDialog = false; // Dialog açılmıyor
    } else {
      // Tüm hücreler geçerliyse dialog açılsın
      this.openDialog = true;
    }
  }

  // Dialogdan gelen "saveContract" olayını işleyen fonksiyon
onContractSave(contractData: any): void {
  console.log('Contract verisi kaydedildi:', contractData);
  this.messageService.add({
    severity: 'success',
    summary: 'Başarılı',
    detail: 'Contract başarıyla kaydedildi!',
  });
  this.openDialog = false; // Dialogu kapat
}
  trackByIndex(index: number): number {
    return index;
  }

  trackByRoom(index: number, room: RoomData): string {
    return room.roomType;
  }
 
}
