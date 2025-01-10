import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
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
import { DialogModule } from 'primeng/dialog';
import { v4 as uuidv4 } from 'uuid'; // Benzersiz ID için
import { AccordionModule } from 'primeng/accordion';

import { RoomTypeService } from '../../../../../core/services/room-type.service';


export interface Period {
  id: string;
  startDate: Date;
  endDate: Date;
  selectedRoomTypes: any[];
  addChildPricing: boolean;
  stopSales: boolean;
  roomData: RoomData[];
}

export interface RoomData {
  roomType: string;
  cells: Cell[];
}

export interface Cell {
  basePrice: number | 0;
  allotment: number | 0;
  paxes: Pax[];
  stopSales:false;
  childPricing: ChildPricing[];
  invalid?: boolean; // Hücre geçerlilik durumu
}

export interface Pax {
  paxNumber: number;
  price: number | 0;
  multiplier: number;
}

export interface ChildPricing {
  ageRange: { min: number; max: number };
  price: number | 0;
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
    

  ],
  templateUrl: './period-based-contract.component.html',
  styleUrl: './period-based-contract.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PeriodBasedContractComponent implements OnInit{

  informationDialogVisible: boolean = false;

  activeIndex: number | undefined = 0;

  activeIndexChange(index: any) {
    this.activeIndex = index
  }

  startDate: Date | null = null;
  //startDate:  Date= new Date(1,1,2022);
  endDate: Date | null = null;
  //endDate:  Date= new Date(1,5,2022);
  periods: Period[] = [];
  selectedCurrency = 'EUR';

  availableRoomTypes: any[] = [];

  stopSalesOptions = [
    { label: 'Evet', value: 'yes' },
    { label: 'Hayır', value: 'no' },
  ];


  constructor(private roomTypeService: RoomTypeService, private messageService: MessageService) {
  }
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
            //console.log('succsess:', data);
          } else {
            //console.warn('Servisten gecersiz bir veri dondu:', data);
          }
        }),
        catchError((error) => {
          this.showError('Oda bilgileri alinirken bir hata olustu! Lutfen uygulamayi tekrar baslatin');
          console.error('--', error);
          return of([]); // Hata durumunda boş bir array döndür
        })
      )
      .subscribe();
  }
  showInformationDialog() {
    this.informationDialogVisible = true;
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

    const isOverlapping = this.periods.some((period) =>
      (this.startDate! >= period.startDate && this.startDate! <= period.endDate) ||
      (this.endDate! >= period.startDate && this.endDate! <= period.endDate) ||
      (this.startDate! <= period.startDate && this.endDate! >= period.endDate)
    );

    if (isOverlapping) {
      this.showError('Seçilen tarih aralığı daha önce bir periyotta kullanılmış!');
      return;
    }

    const newPeriod: Period = {
      id: uuidv4(),
      startDate: this.startDate,
      endDate: this.endDate,
      selectedRoomTypes: [],
      addChildPricing: false,
      stopSales:false,
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


  // onRoomTypeChange(period: Period): void {
  //   period.roomData = period.selectedRoomTypes.map((roomType: any) => {
  //     const matchingRoom = this.availableRoomTypes.find((r) => r.name === roomType.name);
  //     return {
  //       id: uuidv4(),
  //       roomType: matchingRoom.name,
  //       cells: this.generateRoomCells(matchingRoom.capacity, matchingRoom.childCapacity, period.addChildPricing),
  //     };
  //   });
  // }
  onRoomTypeChange(period: Period): void {
    period.roomData = period.selectedRoomTypes.map((selectedRoom) => {
      const roomDetails = this.availableRoomTypes.find((room) => room.name === selectedRoom.name);
      if (roomDetails) {
        return {
          id: uuidv4(),
          roomType: roomDetails.name,
          cells: this.generateRoomCells(
            roomDetails.capacity,
            roomDetails.childCapacity,
            period.addChildPricing,
            roomDetails.basePrice // Servisten gelen base price'ı aktar
          ),
        };
      } else {
        this.showError(`Oda tipi bilgisi bulunamadi: ${selectedRoom.name}`);
        return null; // Hatalı oda tipi için null dönebilir
      }
    }).filter(Boolean); // Null değerleri temizle
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

  // private generateRoomCells(capacity: number, childCapacity: number, addChildPricing: boolean): Cell[] {
  //   return [
  //     {
  //       basePrice: null,
  //       allotment: null,
  //       paxes: Array.from({ length: capacity }, (_, i) => ({
  //         paxNumber: i + 1,
  //         price: null,
  //         multiplier: 1.0,
  //       })),
  //       childPricing: addChildPricing
  //         ? Array.from({ length: childCapacity }, () => ({
  //             ageRange: { min: 0, max: 0 },
  //             price: null,
  //             multiplier: 1.0,
  //           }))
  //         : [],
  //     },
  //   ];
  // }

  private generateRoomCells(
    capacity: number,
    childCapacity: number,
    addChildPricing: boolean,
    basePrice: number
  ): Cell[] {
    return [
      {
        basePrice: basePrice, // Base fiyatı hücreye aktar
        allotment: 0,
        stopSales:false,
        paxes: Array.from({ length: capacity }, (_, i) => ({
          paxNumber: i + 1,
          price: 0,
          multiplier: 1.0,
        })),
        childPricing: addChildPricing
          ? Array.from({ length: childCapacity }, () => ({
            ageRange: { min: 0, max: 0 },
            price: 0,
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
      price: 0,
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

    // Geçersiz durumları toplamak için bir dizi
  const invalidDetails: string[] = [];

  // Başlangıç ve bitiş tarihleri kontrolü
  // if (!this.startDate || !this.endDate) {
  //   this.showError('Başlangıç ve bitiş tarihleri girilmelidir!');
  //   return;
  // }

  // Periyot kontrolü
  if (this.periods.length === 0) {
    this.showError('En az bir periyot eklenmelidir!');
    return;
  }



    const invalidCells: { periodName:string; roomType: string; details: string }[] = [];
  
    // Hücre doğrulama ve geçersizlik toplama
    this.periods.forEach((period) => {
      period.roomData.forEach((room) => {
        room.cells.forEach((cell) => {
          const isCellValid = this.isCellValid(cell);
          if (!isCellValid) {
            // Hücreyi işaretle
            cell.invalid = true;
  
            // Hata mesajı için detayları topla
            invalidCells.push({
              periodName:period.startDate+"-"+period.endDate,
              roomType: room.roomType,
              details: `Base Price: ${cell.basePrice || 'Eksik'}, Allotment: ${
                cell.allotment || 'Eksik'
              }, Paxes: ${cell.paxes
                .map((pax, index) => `Pax ${index + 1}: ${pax.price || 'Eksik'}`)
                .join(', ')}`,
            });
          } else {
            // Geçerli hücrelerde işaretlemeyi kaldır
            cell.invalid = false;
          }
        });
      });
    });
  
    if (invalidCells.length > 0) {
      // Hataları modüler bir şekilde göster
      this.showError(
        `Geçersiz Hücreler:\n` +
          invalidCells
            .map(
              (error) =>
                `Periyot ID: ${error}, Oda Tipi: ${error.roomType}, Detaylar: ${error.details}`
            )
            .join('\n')
      );
    } else {
      // Geçerli verileri JSON olarak yazdır
      const formattedData = this.periods.map((period) => ({
        periodId: period.id,
        startDate: period.startDate,
        endDate: period.endDate,
        rooms: period.roomData.map((room) => ({
          roomType: room.roomType,
          basePrice: room.cells[0]?.basePrice || null,
          allotment: room.cells[0]?.allotment || null,
          paxes: room.cells[0]?.paxes.map((pax) => ({
            paxNumber: pax.paxNumber,
            price: pax.price,
            multiplier: pax.multiplier,
          })),
          childPricing: room.cells[0]?.childPricing.map((child) => ({
            ageRange: child.ageRange,
            price: child.price,
            multiplier: child.multiplier,
          })),
          stopSales: room.cells[0]?.stopSales,
        })),
      }));
      console.log('Kaydedilen Veriler:', JSON.stringify(formattedData, null, 2));
      this.showSuccess('Veriler başarıyla kaydedildi!');
    }
  }
  // Hücre doğrulama fonksiyonu
private isCellValid(cell: Cell): boolean {
  return (
    cell.basePrice !== null &&
    cell.basePrice > 0 &&
    cell.allotment !== null &&
    cell.allotment > 0 &&
    !cell.paxes.some((pax) => pax.price === null || pax.price <= 0)
  );
}
}
