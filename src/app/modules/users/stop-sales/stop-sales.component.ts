import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { catchError, of, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; // Benzersiz ID için
import { RoomTypeService } from '../../../core/services/room-type.service';
import { MessageService } from 'primeng/api';
import { PriceCalculationService } from '../../../core/services/contract/price-calculation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { StopSaleConfirmDialogComponent } from './components/dialog/stop-sale-confirm-dialog/stop-sale-confirm-dialog.component';

 interface Period {
  id: string;
  startDate: Date;
  endDate: Date;
  selectedRoomTypes: any[];
  //addChildPricing: boolean;
   stopSales: boolean;
  roomData: RoomData[];
}

 interface RoomData {
  roomType: string;
  cells: Cell[];
}

 interface Cell {
  //basePrice: number | 0;
  //allotment: number | 0;
  //adults: Adult[];
   stopSales: false;
  //childPricing: ChildPricing[];
  invalid?: boolean; // Hücre geçerlilik durumu
}

//  interface Adult {
//   adultNumber: number;
//   price: number | 0;
//   multiplier: number;
// }

//  interface ChildPricing {
//   ageRange: { min: number; max: number };
//   price: number | 0;
//   multiplier: number;
// }
@Component({
  selector: 'app-stop-sales',
  standalone: true,
  imports: [ToastModule,CalendarModule,AccordionModule,MultiSelectModule,InputNumberModule,DropdownModule,CommonModule,FormsModule,CheckboxModule,StopSaleConfirmDialogComponent],
  templateUrl: './stop-sales.component.html',
  styleUrl: './stop-sales.component.scss'
})
export class StopSalesComponent implements OnInit{

  contractConfirmDialog: boolean = false;


startDate: Date | null = null;
  endDate: Date | null = null;
  periods: Period[] = [];
  selectedCurrency = 'EUR';

  availableRoomTypes: any[] = [];

  stopSalesOptions = [
    { label: 'Evet', value: true },
    { label: 'Hayir', value: false },
  ];


  constructor(private roomTypeService: RoomTypeService,private cdr: ChangeDetectorRef, private messageService: MessageService, private priceService:PriceCalculationService) {
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


  // multiplierOptions = Array.from({ length: 41 }, (_, i) => ({
  //   label: (1 + i * 0.1).toFixed(1),
  //   value: 1 + i * 0.1,
  // }));

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
      //addChildPricing: false,
       stopSales: false,
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
    period.roomData = period.selectedRoomTypes.map((selectedRoom) => {
      const roomDetails = this.availableRoomTypes.find((room) => room.name === selectedRoom.name);
      if (roomDetails) {
        return {
          id: uuidv4(),
          roomType: roomDetails.name,
          cells: this.generateRoomCells(
            //roomDetails.capacity,
            //roomDetails.childCapacity,
          //  period.addChildPricing,
           // roomDetails.basePrice // Servisten gelen base price'ı aktar
          ),
        };
      } else {
        this.showError(`Oda tipi bilgisi bulunamadi: ${selectedRoom.name}`);
        return null; // Hatalı oda tipi için null dönebilir
      }
    }).filter(Boolean); // Null değerleri temizle
  }

  // onChildPricingToggle(period: Period): void {
  //   period.roomData.forEach((room) => {
  //     room.cells.forEach((cell) => {
  //       cell.childPricing = period.addChildPricing
  //         ? this.generateChildPricing(this.getChildCapacity(room.roomType))
  //         : [];
  //     });
  //   });
  // }

  
  private generateRoomCells(
    // capacity: number,
    // childCapacity: number,
    // addChildPricing: boolean,
    // basePrice: number
  ): Cell[] {
    return [
      {
        //basePrice: basePrice, // Base fiyatı hücreye aktar
       /// allotment: 0,
         stopSales: false,
    
        // adults: Array.from({ length: capacity }, (_, i) => ({
        //   adultNumber: i + 1,
        //   price: 0,
        //   multiplier: 1.0,
        // })),
        // childPricing: addChildPricing
        //   ? Array.from({ length: childCapacity }, () => ({
        //     ageRange: { min: 0, max: 0 },
        //     price: 0,
        //     multiplier: 1.0,
        //   }))
        //   : [],
      },
    ];
  }

  // private getChildCapacity(roomType: string): number {
  //   return this.availableRoomTypes.find((type) => type.name === roomType)?.childCapacity || 0;
  // }
  // private generateChildPricing(childCapacity: number): ChildPricing[] {
  //   return Array.from({ length: childCapacity }, () => ({
  //     ageRange: { min: 0, max: 0 },
  //     price: 0,
  //     multiplier: 1.0,
  //   }));
  // }

  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Hata', detail: message });
  }

  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: message });
  }

  // onBasePriceChange(cell: Cell): void {
    
  //   cell.adults = cell.adults.map((adult) => ({
  //     ...adult,
  //     price: this.priceService.calculatePrice(cell.basePrice, adult.multiplier),
  //   }));
  // }

  // onMultiplierChange(cell: Cell, adultIndex: number): void {
  //   const adult = cell.adults[adultIndex];
  //   adult.price = this.priceService.calculatePrice(cell.basePrice, adult.multiplier);
  // }

  // onChildMultiplierChange(cell: Cell, childIndex: number): void {
  //   const child = cell.childPricing[childIndex];
  //   child.price = this.priceService.calculatePrice(cell.basePrice, child.multiplier);
  // }


  // getCurrencyIconClass(currency: string): string {
  //   switch (currency) {
  //     case 'EUR':
  //       return 'fas fa-euro-sign';
  //     case 'USD':
  //       return 'fas fa-dollar-sign';
  //     case 'TRY':
  //       return 'fas fa-lira-sign';
  //     default:
  //       return 'fas fa-lira-sign'; // Varsayılan ikon
  //   }
  // }
  saveData(): void {

  
    // Periyot kontrolü
    if (this.periods.length === 0) {
      this.showError('En az bir periyot eklenmelidir!');
      return;
    }

    const invalidCells: { periodName: string; roomType: string; details: string }[] = [];

    // Hücre doğrulama ve geçersizlik toplama
    this.periods.forEach((period) => {
      period.roomData.forEach((room) => {
        room.cells.forEach((cell) => {
          //const isCellValid = this.isCellValid(cell);
          // if (!isCellValid) {
          //   // Hücreyi işaretle
          //   cell.invalid = true;

          //   // Hata mesajı için detayları topla
          //   invalidCells.push({
          //     periodName: period.startDate + "-" + period.endDate,
          //     roomType: room.roomType,
          //     details: `Base Price: ${cell.basePrice || 'Eksik'}, Allotment: ${cell.allotment || 'Eksik'
          //       }, Adults: ${cell.adults
          //         .map((adult, index) => `Adult ${index + 1}: ${adult.price || 'Eksik'}`)
          //         .join(', ')}`,
          //   });
          // } else {
          //   // Geçerli hücrelerde işaretlemeyi kaldır
          //   cell.invalid = false;
          // }
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
              `Periyot ID: ${error}, Oda Tipi: ${error.roomType}, Detaylar: ${error.details}\n`
          )
          .join('\n')
      );
    } else {
      // Geçerli verileri JSON olarak yazdır
      this.contractConfirmDialog = true;//dialogu ac
     
      
    }
  }
  // Hücre doğrulama fonksiyonu
  // private isCellValid(cell: Cell): boolean {
  //   return (
  //     cell.basePrice !== null &&
  //     cell.basePrice > 0 &&
  //     cell.allotment !== null &&
  //     cell.allotment > 0 &&
  //     !cell.adults.some((adult) => adult.price === null || adult.price <= 0)
  //   );
  // }

  onPeriodBaseContractSave(contractData: any){

    console.log('Contract verisi kaydedildi:', contractData);

     const formattedData = this.periods.map((period) => ({
        periodId: period.id,
        startDate: period.startDate,
        endDate: period.endDate,
        rooms: period.roomData.map((room) => ({
          roomType: room.roomType,
          // basePrice: room.cells[0]?.basePrice || null,
          // allotment: room.cells[0]?.allotment || null,
          // adults: room.cells[0]?.adults.map((adult) => ({
          //   adultNumber: adult.adultNumber,
          //   price: adult.price,
          //   multiplier: adult.multiplier,
          // })),
          // childPricing: room.cells[0]?.childPricing.map((child) => ({
          //   ageRange: child.ageRange,
          //   price: child.price,
          //   multiplier: child.multiplier,
          // })),
          stopSales: room.cells[0]?.stopSales,
        })),
      }));
      console.log('Kaydedilen Veriler:', JSON.stringify(formattedData, null, 2));

    //this.addToMessageQueue('success', 'Basarili', 'Contract basariyla kaydedildi!');
    this.showSuccess('Veriler basariyla kaydedildi!');
    this.contractConfirmDialog = false;
    this.cdr.detectChanges();
  }
}
