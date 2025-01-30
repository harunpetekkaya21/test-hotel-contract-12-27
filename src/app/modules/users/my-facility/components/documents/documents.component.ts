import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'facility-documents',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CardModule,FileUploadModule,ButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  form: FormGroup;
  acceptedFormats = ['application/pdf'];

  documentTypes = [
    { name: 'Isyeri Acma Ruhsati', key: 'business_license', icon: 'fas fa-file-contract' },
    { name: 'Bakanlik Belgesi', key: 'ministry_certificate', icon: 'fas fa-file-alt' },
    { name: 'Ucuncu Sahis Mali Sigorta Policesi', key: 'third_party_insurance', icon: 'fas fa-file-shield' },
    { name: 'Vergi Levhasi', key: 'tax_certificate', icon: 'fas fa-file-invoice' }
  ];

  uploadedFiles: { [key: string]: File | null } = {}; // Yüklenen dosyalar

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.form = this.fb.group({
      business_license: [null],
      ministry_certificate: [null],
      third_party_insurance: [null],
      tax_certificate: [null]
    });
  }

  /**
   * Dosya yükleme işlemi
   */
  onFileSelect(event: any, docKey: string) {
    const file: File = event.files[0];

    if (!this.acceptedFormats.includes(file.type)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Gecersiz Dosya!',
        detail: 'Sadece PDF dosyalari yukleyebilirsiniz.'
      });
      return;
    }

    this.uploadedFiles[docKey] = file;
    this.form.get(docKey)?.setValue(file);

    this.messageService.add({
      severity: 'success',
      summary: 'Dosya Yuklendi!',
      detail: `${file.name} basariyla yüklendi.`
    });
  }

  /**
   * Yüklenen belgeleri göster
   */
  submitDocuments() {
    console.log('Yüklenen Belgeler:', this.form.value);
    this.messageService.add({
      severity: 'success',
      summary: 'basariyla Kaydedildi!',
      detail: 'Belgeler basariyla kaydedildi.'
    });
  }
}
