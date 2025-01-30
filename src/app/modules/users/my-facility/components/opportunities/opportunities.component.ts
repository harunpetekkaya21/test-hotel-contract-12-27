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
    {
      name: 'Öne Çıkan Özellikler',
      icon: 'fas fa-star',
      features: [
        { label: 'Bakıcı', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Bebek dostu', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Deniz kıyısı', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Deniz manzarası', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Su Kaydırağı', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Spa/sağlık merkezi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Vejetaryen dostu', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Romantizm/Balayı', icon: 'fas fa-check-circle', enabled: true },
      ],
    },
    {
      name: 'Spa ve Sağlık Olanakları',
      icon: 'fas fa-spa',
      features: [
        { label: 'Cilt Bakımı', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Kese', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Vücut bakımı', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Spa ve sağlık merkezi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Fitness merkezi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Sauna', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Türk Hamamı', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Vitamin Bar', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Masaj', icon: 'fas fa-check-circle', enabled: true },
      ],
    },
    {
      name: 'Bebek',
      icon: 'fas fa-baby',
      features: [
        { label: 'Bebek Kuveti', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Ücretsiz Bebek Mamasi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Bebek bakim paketi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Ana Kucagi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Bebek Oyuncakları', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Restoranda Bebek Köşesi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Biberon', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Biberon Isıtma Cihazı', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Odaya Bebek Kamerası', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Kichi Kids Bag', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Lazimlik', icon: 'fas fa-check-circle', enabled: true },
      ],
    },
    {
      name: 'Yiyecek & Icecek',
      icon: 'fas fa-glass-martini',
      features: [
        { label: 'Cafe Turk', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Bar', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Gozleme Kosesi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Disco Bar', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Kafeterya', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Lobby Bar', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Pastahane', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Restoran', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Restoran (Alakart)', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Restoran (Açık Büfe)', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Dondurmaci', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Acik Restoran', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Kapali Restoran', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Snack Restoran', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Detoks Bar', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Odaya Yemek Servisi (Ücretli)', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Gec Kahvaltl', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Brunch', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Havuz Bar', icon: 'fas fa-check-circle', enabled: true },
      ],
    },
    {
      name: 'Aktiviteler',
      icon: 'fas fa-dumbbell',
      features: [
        { label: 'Aerobik', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Basketbol', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Beach voleybol', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Boccia', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Canlı müzik', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Dans dersleri', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Dart', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Mini futbol', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Jimnastik', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Masa tenisi', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Motorlu su sporları', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Okçuluk', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Step', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Su aerobiği', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Tenis', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Su topu', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Tenis ekipmanları', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Boks Torbası', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Kango Jumping', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Aqua Combat', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Trambolin', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Masa Oyunları', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Plates', icon: 'fas fa-check-circle', enabled: true },
        { label: 'Zumba', icon: 'fas fa-check-circle', enabled: true },
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
