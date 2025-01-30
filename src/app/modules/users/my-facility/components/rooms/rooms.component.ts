import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';

export interface RoomType {
  id?: number;
  name?: string;
  odaSayisi?: number;
  odaKapasitesi?: number;
  yetiskinKapasitesi?: number;
  cocukKapasitesi?: number;
  gecelikBaseFiyat?: number;

}
export interface CreateRoomType {
  name: string;
  odaSayisi: number;
  odaKapasitesi: number;
  yetiskinKapasitesi: number;
  cocukKapasitesi: number;
  gecelikBaseFiyat: number;
  refundable: boolean; 
  adults: (AdultPricingRefundable | AdultPricingUnRefundable)[];
}


// Temel fiyatlandırma modeli
export interface AdultPricing {
  id: number;
  adjustmentType: string; // "+" | "-" | "%"
  adjustmentValue: number;
  currency: string;
  nightlyPrice: number;
}

// İade edilebilir fiyatlandırma modeli
export interface AdultPricingRefundable extends AdultPricing {
  refundableAdjustmentType: string; // "+" | "-" | "%"
  refundableAdjustmentValue: number;
  refundablePrice: number; // Hesaplanan iade edilebilir fiyat
}

// İade edilemez fiyatlandırma modeli
export interface AdultPricingUnRefundable extends AdultPricing { }

@Component({
  selector: 'facility-rooms',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,
    DropdownModule,FloatLabelModule,InputNumberModule,TableModule,CheckboxModule,ButtonModule,InputTextModule,MultiSelectModule
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
// Fiyat işlemi seçenekleri
  adjustmentOptions = [
    { label: 'Ekle (+)', value: '+' },
    { label: 'Çıkar (-)', value: '-' },
    { label: 'Yüzde (%)', value: '%' },
  ];

  roomTypeFeatureOptions=[
    { label: 'Deniz Manzarali', id:1 },
    { label: 'Dag Manzarali', id:2 },
    { label: 'Orman Manzarali', id:3  },
  ]
  selectedRoomTypeFeatureOptions:any[];

  // Para birimi seçenekleri
  currencyOptions = [
    { label: 'Euro (EUR)', value: 'EUR' },
    { label: 'Amerikan Doları (USD)', value: 'USD' },
    { label: 'Türk Lirası (TRY)', value: 'TRY' },
  ];


  createRoomType: CreateRoomType = {
    name: '',
    odaSayisi: 0,
    odaKapasitesi: 0,
    yetiskinKapasitesi: 0,
    cocukKapasitesi: 0,
    gecelikBaseFiyat: 100, // Varsayılan baz fiyat
    refundable: false, // Varsayılan: iade edilemez
    adults: [],
  };


  updateAdults() {

    
    const count = this.createRoomType.yetiskinKapasitesi;

    if (count === 0) {
      this.createRoomType.adults = [];
      return;
    }

    if (this.createRoomType.refundable) {
      // İade edilebilir fiyatlar için yapılandırma
      this.createRoomType.adults = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        adjustmentType: '+',
        adjustmentValue: 0,
        currency: 'EUR',
        nightlyPrice: this.createRoomType.gecelikBaseFiyat,
        refundableAdjustmentType: '+',
        refundableAdjustmentValue: 0,
        refundablePrice: this.createRoomType.gecelikBaseFiyat,
      })) as AdultPricingRefundable[];
    } else {
      // İade edilemez fiyatlar için yapılandırma
      this.createRoomType.adults = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        adjustmentType: '+',
        adjustmentValue: 0,
        currency: 'EUR',
        nightlyPrice: this.createRoomType.gecelikBaseFiyat,
      })) as AdultPricingUnRefundable[];
    }
  }
  // Girdiler değiştikçe gecelik fiyatı hesaplar
  calculateNightlyPrice(adult: AdultPricing) {
    const basePrice = this.createRoomType.gecelikBaseFiyat;

    if (adult.adjustmentType === '+') {
      adult.nightlyPrice = basePrice + adult.adjustmentValue;
    } else if (adult.adjustmentType === '-') {
      adult.nightlyPrice = basePrice - adult.adjustmentValue;
    } else if (adult.adjustmentType === '%') {
      adult.nightlyPrice = basePrice + (basePrice * adult.adjustmentValue) / 100;
    }

    if (this.isRefundable(adult)) {
      this.calculateRefundablePrice(adult as AdultPricingRefundable);
    }
  }


  calculateRefundablePrice(adult: AdultPricingRefundable) {
    if (adult.refundableAdjustmentType === '+') {
      adult.refundablePrice = adult.nightlyPrice + adult.refundableAdjustmentValue;
    } else if (adult.refundableAdjustmentType === '-') {
      adult.refundablePrice = adult.nightlyPrice - adult.refundableAdjustmentValue;
    } else if (adult.refundableAdjustmentType === '%') {
      adult.refundablePrice =
        adult.nightlyPrice + (adult.nightlyPrice * adult.refundableAdjustmentValue) / 100;
    }
  }

  isRefundable(adult: AdultPricing): adult is AdultPricingRefundable {
    return (adult as AdultPricingRefundable).refundablePrice !== undefined;
  }
  onSave() {
    console.log('Kaydedilen RoomType Verisi:', this.createRoomType);



  }
}
