import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';


// Verilerin tip güvenli olması için interface tanımları
interface Feature {
  label: string;
  icon: string;
  enabled: boolean;
}

interface Category {
  name: string;
  icon: string;
  features: Feature[];
}

@Component({
  selector: 'facility-opportunities',
  standalone: true,
  imports: [FieldsetModule,CommonModule,FormsModule,InputSwitchModule,ReactiveFormsModule],
  templateUrl: './opportunities.component.html',
  styleUrl: './opportunities.component.scss'
})
export class OpportunitiesComponent implements OnInit{

  form: FormGroup;


  categories : Category[] =  [
    {
      name: 'Havuz',
      icon: 'fas fa-swimmer',

      features: [
        { label: 'Açık Yüzme Havuzu', icon: 'fas fa-swimmer', enabled: true },
        { label: 'Kapalı Yüzme Havuzu', icon: 'fas fa-water', enabled: false },
        { label: 'Kaydıraklı Havuz', icon: 'fas fa-sliders-h', enabled: true },
        { label: 'Çocuk Kaydırağı', icon: 'fas fa-child', enabled: false },
        { label: 'Kapalı Çocuk Havuzu', icon: 'fas fa-tint', enabled: true },
      ],
    },
    {
      name: 'Ulaşım',
      icon: 'fas fa-swimmer',

      features: [
        { label: 'Elektrik Şarj İstasyonu', icon: 'fas fa-charging-station', enabled: false },
        { label: 'Araba Kiralama', icon: 'fas fa-car', enabled: true },
      ],
    },
    {
      name: 'Sağlık',
      icon: 'fas fa-swimmer',

      features: [
        { label: 'Diyet Büfesi', icon: 'fas fa-apple-alt', enabled: false },
        { label: 'Doktor (tesis bünyesinde)', icon: 'fas fa-user-md', enabled: true },
      ],
    },
    {
      name: 'Temizlik Hizmetleri',
      icon: 'fas fa-swimmer',

      features: [
        { label: 'Kuru temizleme', icon: 'fas fa-tshirt', enabled: false },
        { label: 'Ütü hizmeti', icon: 'fas fa-iron', enabled: true },
        { label: 'Çamaşırhane (Ücretli)', icon: 'fas fa-soap', enabled: false },
      ],
    },
    {
      name: 'Odalar',
      icon: 'fas fa-swimmer',

      features: [
        { label: 'Aile odaları', icon: 'fas fa-users', enabled: true },
        { label: 'Ara kapılı odalar', icon: 'fas fa-door-open', enabled: false },
        { label: 'Engelli odaları', icon: 'fas fa-wheelchair', enabled: true },
        { label: 'Özel karşılama hizmeti', icon: 'fas fa-concierge-bell', enabled: true },
        { label: 'Misafir asistanı', icon: 'fas fa-user-tie', enabled: false },
      ],
    },
    {
      name: 'Ortak Alanlar',
      icon: 'fas fa-swimmer',

      features: [
        { label: 'Oyun odası', icon: 'fas fa-gamepad', enabled: true },
        { label: 'Asansör', icon: 'fas fa-elevator', enabled: true },
        { label: 'Toplantı odası', icon: 'fas fa-briefcase', enabled: false },
        { label: 'Bahçe', icon: 'fas fa-tree', enabled: true },
      ],
    },
    {
      name: 'Eğlence Hizmetleri',
      icon: 'fas fa-swimmer',

      features: [
        { label: 'Anfi Tiyatro', icon: 'fas fa-theater-masks', enabled: true },
        { label: 'Bowling salonu', icon: 'fas fa-bowling-ball', enabled: false },
        { label: 'Disco', icon: 'fas fa-music', enabled: true },
        { label: 'Canlı Müzik', icon: 'fas fa-guitar', enabled: false },
      ],
    },
    {
      name: 'Çocuk',
      icon: 'fas fa-swimmer',

      features: [
        { label: 'Mini club', icon: 'fas fa-child', enabled: true },
        { label: 'Çocuk parkı', icon: 'fas fa-playground', enabled: false },
        { label: 'Çocuk aktiviteleri', icon: 'fas fa-puzzle-piece', enabled: true },
      ],
    },
  ];


  constructor(private fb: FormBuilder) {
    // Reactive Form yapılandırması
    this.form = this.fb.group({
      categories: this.fb.array([]),
    });
  }
  ngOnInit() {
    // FormArray yapılandırması
    this.categories.forEach((category) => {
      const featureControls = category.features.map((feature) =>
        new FormGroup({
          enabled: new FormControl(feature.enabled),
        })
      );
      this.getCategoriesControls().push(this.fb.array(featureControls));
    });
  }

  // FormArray getter'ları
  getCategoriesControls(): FormArray {
    return this.form.get('categories') as FormArray;
  }

  getFeaturesControls(categoryIndex: number): FormArray {
    return this.getCategoriesControls().at(categoryIndex) as FormArray;
  }

  // AbstractControl'u FormControl'e dönüştürmek için yardımcı metot
  getFormControl(control: any): FormControl {
    return control.get('enabled') as FormControl;
  }
}
