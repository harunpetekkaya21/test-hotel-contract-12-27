import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FileUploadModule,ChipModule,CommonModule,FormsModule,MultiSelectModule,InputTextModule,InputTextareaModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  hotel = {
    id: 'HTL12345',
    name: '',
    tagline: '',
    description: '',
    logo: '',
    contact: {
      phone: '',
      email: '',
      address: '',
    },
    services: [],
  };

  services = [
    { label: 'Wi-Fi', value: 'wifi' },
    { label: 'Otopark', value: 'parking' },
    { label: 'Havuz', value: 'pool' },
    { label: 'Spor Salonu', value: 'gym' },
    { label: 'Spa', value: 'spa' },
    { label: 'Restoran', value: 'restaurant' },
  ];

  saveProfile(): void {
    console.log('Kaydedilen Profil Verileri:', this.hotel);
  }

  onLogoUpload(event :any){

  }
}
