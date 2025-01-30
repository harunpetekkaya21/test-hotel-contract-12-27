import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';


import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchControlOptions } from 'leaflet-geosearch/dist/SearchControl';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: 'facility-general',
  standalone: true,
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule,
    FieldsetModule,MessageModule,CheckboxModule,DropdownModule,ButtonModule,InputNumberModule,DialogModule,InputTextModule,InputTextareaModule

  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnInit {
 generalTabViewForm!: FormGroup;
 
   facilityTypes = [
     { label: 'Hotel', value: 'hotel' },
     { label: 'Pension', value: 'pension' },
   ];
 
   raitingNumbers = [
     { name: '1', value: '1' },
     { name: '2', value: '2' },
     { name: '3', value: '3' },
     { name: '4', value: '4' },
     { name: '5', value: '5' }
   ];
 
 
 
   // Otel satışa açık mı?
   isHotelForSale: boolean = false;
   // Enlem - Boylam değerlerini yönetmek için sinyaller (Angular 16+) veya klasik değişkenler
   latitude = signal<number | null>(null);
   longitude = signal<number | null>(null);
 
   // Harita görünür mü, değil mi? (Dialog kontrolü için)
   showMap = signal<boolean>(false);
 
   // Leaflet Map nesnesi ve marker
   private map: L.Map | null = null;
   private marker: L.Marker | null = null;
 
   constructor(
     private fb: FormBuilder,
     private messageService: MessageService
   ) { }
 
 
   ngOnInit(): void {
     this.initialGeneralTabViewForms();
     // Latitude ve Longitude değişimlerini dinleyip haritayı güncelle
     this.generalTabViewForm.get('latitude')?.valueChanges.subscribe(() => {
       this.onCoordsChanged();
     });
     this.generalTabViewForm.get('longitude')?.valueChanges.subscribe(() => {
       this.onCoordsChanged();
     });
 
   }
 
   private initialGeneralTabViewForms(): void {
     this.generalTabViewForm = this.fb.group({
       isHotelForSale: [false],
       facilityName: [null],
       facilityType: [null],
       raiting: [null],
 
    
       city: [null],
       country: [null],
       address: [null],
 
       latitude: [null],
       longitude: [null],
 
       ourEmail: [null],
       hotelOrSupplierEmail: [null],
       isBookingEmail: [false],
 
       supplier: [null],
       customer: [null],
 
       allotment: [null],
       allotmentSenderEmail: [null],
       allotmentReserverEmail: [null],
 
       specialNote: [null]
     });
   }
 
 
 
   openMap(): void {
     this.showMap.set(true);
 
     setTimeout(() => {
       this.initMap();
 
       // Harita boyutlarını tekrar hesapla
       this.map?.invalidateSize();
 
       // Marker pozisyonunu form değerine göre ayarla
       const lat = parseFloat(this.generalTabViewForm.value.latitude) || 39.92077;
       const lng = parseFloat(this.generalTabViewForm.value.longitude) || 32.85411;
       this.marker?.setLatLng([lat, lng]);
       this.map?.setView([lat, lng], this.map.getZoom());
     }, 300);
   }
 
   closeMap(): void {
     this.showMap.set(false);
   }
 
   onDialogHide() {
     this.showMap.set(false);
   }
 
   private initMap(): void {
     // Harita zaten oluşturulmuşsa tekrar oluşturma
     if (this.map) {
       this.map.remove();
       this.map = null;
     }
 
     // Haritayı başlatırken latitude/longitude sinyallerinden veya form alanlarından al
     const initialLat = parseFloat(this.generalTabViewForm.value.latitude) || 39.92077;
     const initialLng = parseFloat(this.generalTabViewForm.value.longitude) || 32.85411;
 
 
     this.map = L.map('map', {
       center: [initialLat, initialLng],
       zoom: 6,
     });
 
     // OpenStreetMap tile layer
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; OpenStreetMap contributors',
     }).addTo(this.map);
 
     // Marker oluşturup haritaya ekle
     this.marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(this.map);
 
     // Haritaya tıklayınca formu güncelle
     this.map.on('click', (e: L.LeafletMouseEvent) => {
       this.updateFormCoords(e.latlng.lat, e.latlng.lng);
     });
 
     // Marker sürüklenince formu güncelle
     this.marker.on('dragend', (ev: any) => {
       // Marker'ın güncel pozisyonunu al
       const markerLatLng = ev.target.getLatLng();
 
       // Koordinatları güncelle
       this.updateFormCoords(markerLatLng.lat, markerLatLng.lng);
 
       // Marker pozisyonunu tekrar doğrula (senkronizasyon için)
       this.marker!.setLatLng([markerLatLng.lat, markerLatLng.lng]);
     });
 
     // GeoSearch kontrolü (opsiyonel)
     const provider = new OpenStreetMapProvider();
     const searchControl = new (GeoSearchControl as any)({
       provider,
       style: 'bar',
       autoComplete: true,
       autoCompleteDelay: 250,
       searchLabel: 'Country or city...',
       keepResult: true
     } as SearchControlOptions);
 
     this.map.addControl(searchControl);
 
     // GeoSearch sonuç seçildiğinde yakala
     this.map.on('geosearch/showlocation', (result: any) => {
       const { x, y } = result.location; // x=lng, y=lat
       this.latitude.set(y);
       this.longitude.set(x);
       // Formu da güncellemek isterseniz:
       this.generalTabViewForm.patchValue({
         latitude: y.toFixed(6),
         longitude: x.toFixed(6),
       });
     });
   }
 
   /**
    * Latitude/Longitude değerleri kullanıcı tarafından manuel girildiğinde haritayı güncelle.
    */
   private onCoordsChanged(): void {
     if (!this.map || !this.marker) return;
 
     const lat = parseFloat(this.generalTabViewForm.value.latitude);
     const lng = parseFloat(this.generalTabViewForm.value.longitude);
 
     // Geçersiz koordinatlar kontrolü
     if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
       console.error('Geçersiz koordinatlar');
       return;
     }
 
     // Marker pozisyonunu güncelle
     this.marker.setLatLng([lat, lng]);
 
     // Harita görünümünü yeni pozisyona taşı
     this.map.setView([lat, lng], this.map.getZoom());
   }
 
   /**
    * Haritaya tıklandığında veya marker sürüklendiğinde formu günceller.
    */
   private updateFormCoords(lat: number, lng: number): void {
     // Yeni koordinatları form alanlarına yazarken yuvarla
     this.generalTabViewForm.patchValue({
       latitude: lat.toFixed(6),
       longitude: lng.toFixed(6),
     });
 
     // Sinyalleri de güncelleyin (opsiyonel, eğer harici mantık bu verilere bağlıysa)
     this.latitude.set(lat);
     this.longitude.set(lng);
   }
 
   saveFacility() {
     if (this.generalTabViewForm.valid) {
       console.log('Facility Data:', this.generalTabViewForm.value);
       this.messageService.add({
         severity: 'success',
         summary: 'Success',
         detail: 'Facility saved successfully!',
       });
       this.generalTabViewForm.reset();
     } else {
       this.messageService.add({
         severity: 'error',
         summary: 'Validation Error',
         detail: 'Please ensure all form fields are correctly filled.',
       });
     }
   }
}
