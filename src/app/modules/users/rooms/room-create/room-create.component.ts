import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

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
  refundable: boolean; // İade edilebilir mi?
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
  selector: 'app-room-create',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    InputNumberModule,
    FloatLabelModule,
    InputNumberModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule
  ],
  
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.scss'
})
export class RoomCreateComponent {

    // Fiyat işlemi seçenekleri
    adjustmentOptions = [
      { label: 'Ekle (+)', value: '+' },
      { label: 'Çıkar (-)', value: '-' },
      { label: 'Yüzde (%)', value: '%' },
    ];
  
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
