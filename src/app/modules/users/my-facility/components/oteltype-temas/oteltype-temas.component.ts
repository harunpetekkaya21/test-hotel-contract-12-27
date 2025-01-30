import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtelTemasService } from '../../../../../core/services/otel-temas.service';
import { OtelTemasOption } from '../../../../../core/models/Otel-Temas/OtelTemasOption';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'facility-oteltype-temas',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CheckboxModule,FieldsetModule,CardModule,ButtonModule,CheckboxModule],
  templateUrl: './oteltype-temas.component.html',
  styleUrl: './oteltype-temas.component.scss'
})
export class OteltypeTemasComponent {
  form: FormGroup;

  hotelThemes = [
    { name: 'Lüks Otel', key: 'luxury', icon: 'fas fa-star' },
    { name: 'Resort & Spa', key: 'resort', icon: 'fas fa-spa' },
    { name: 'Butik Otel', key: 'boutique', icon: 'fas fa-home' },
    { name: 'Sehir & Business Otel', key: 'business', icon: 'fas fa-briefcase' },
    { name: 'Doğa Oteli', key: 'nature', icon: 'fas fa-tree' },
    { name: 'Glamping', key: 'glamping', icon: 'fas fa-campground' },
    { name: 'Dağ & Kayak Oteli', key: 'mountain', icon: 'fas fa-snowflake' },
    { name: 'Deniz Kenarı Oteli', key: 'beach', icon: 'fas fa-umbrella-beach' },
    { name: 'Safari Oteli', key: 'safari', icon: 'fas fa-binoculars' },
    { name: 'Sanat & Kültür Oteli', key: 'art', icon: 'fas fa-palette' },
    { name: 'Casino & Eğlence Oteli', key: 'casino', icon: 'fas fa-dice' },
    { name: 'Golf & Spor Oteli', key: 'golf', icon: 'fas fa-golf-ball' },
    { name: 'Spa & Wellness Oteli', key: 'spa', icon: 'fas fa-heart' },
    { name: 'Aile Oteli', key: 'family', icon: 'fas fa-child' },
    { name: 'Bungalow Oteli', key: 'bungalow', icon: 'fas fa-building' },
    { name: 'Tarihi Otel', key: 'historical', icon: 'fas fa-landmark' }
  ];

 
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      themes: this.fb.array([])
    });

    this.initializeForm();
  }

  get themesArray(): FormArray {
    return this.form.get('themes') as FormArray;
  }

  initializeForm(): void {
    this.hotelThemes.forEach(() => {
      this.themesArray.push(new FormControl(false)); // ✅ Tüm FormControl'ler eklendi
    });
  }

  // ✅ HTML tarafında tip dönüşüm yapamayacağımız için bu yöntemi kullanacağız
  getThemeControl(index: number): FormControl {
    return this.themesArray.at(index) as FormControl;
  }

  saveSelection(): void {
    const selectedThemes = this.hotelThemes
      .filter((_, index) => this.themesArray.at(index).value)
      .map(theme => theme.name);

    console.log('result:', selectedThemes);
  }
}
