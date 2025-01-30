import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,InputSwitchModule,DropdownModule,ButtonModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent {
  form: FormGroup;

  discountTypes = [
    { name: 'EB (Erken Rezervasyon)', value: 'eb' },
    { name: 'Long Stay (Uzun Konaklama)', value: 'long_stay' },
    { name: 'Last Minute (Son Dakika)', value: 'last_minute' },
    { name: 'Mobile Indirim', value: 'mobile_discount' },
    { name: 'Balayi Odasi', value: 'honeymoon' },
    { name: 'Yas Indirimi', value: 'age_discount' },
    { name: 'Special Indirim', value: 'special_discount' }
  ];

  conditions = [
    { label: 'Minimum 3 Gece', value: 'min_3_nights' },
    { label: 'Otel Onayi Gerekli', value: 'hotel_approval' },
    { label: 'Sadece Mobil Rezervasyonlar', value: 'mobile_only' },
    { label: 'Ozel Kod Gerekli', value: 'special_code' },
    { label: 'Tum Odalar Icin Gecerli', value: 'all_rooms' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      discounts: this.fb.array(
        this.discountTypes.map(discount => this.fb.group({
          type: [discount.value],   // İndirim türü
          condition: [''],          // Şart (Dropdown)
          isActive: [false]         // Açık/Kapalı (InputSwitch)
        }))
      )
    });
  }
  // 🛠 **HATA DÜZELTME:** FormArray olarak getter ekliyoruz!
  get discountsArray(): FormGroup[] {
    return (this.form.get('discounts') as FormArray).controls as FormGroup[];
  }
  saveDiscounts(): void {
    console.log('Result:', this.form.value);
  }
}
