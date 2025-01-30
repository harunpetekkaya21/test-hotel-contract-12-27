import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'facility-cancellation-policies',
  standalone: true,
  imports: [FieldsetModule, FormsModule, ReactiveFormsModule, CheckboxModule, CommonModule, DropdownModule, CalendarModule, InputNumberModule, InputTextModule, RadioButtonModule, TableModule, InputTextareaModule],

  templateUrl: './cancellation-policies.component.html',
  styleUrl: './cancellation-policies.component.scss'
})
export class CancellationPoliciesComponent implements OnInit {
  currencyList = [];

  form: FormGroup;
  addedCheckInDates: { policyCheckInFromDate: Date; policyCheckInToDate: Date }[] = [];
  addedStayDates: { policyBookingStayFromDate: Date; policyBookingStayToDate: Date }[] = [];
  daysVisible = false;


  ruleList: any[] = [];
  conditions = [
    { label: 'Days before trip', value: 'daysBeforeTrip' },
    { label: 'Days after booking', value: 'daysAfterBooking' },
    { label: 'No show', value: 'noShow' }
  ];



  constructor(private fb: FormBuilder, private messageService: MessageService) {

    this.form = this.fb.group({
      policyName: [''],
      policyBookingDateFrom: [null],
      policyBookingDateUntil: [null],
      policyCurrency: [null],
      policyPriority: [null],
      policyDescription: [null],
      nonRefundablePolicy: [false],
      verifiedPolicy: [false],
      onlyApplyToEarlyBookingDiscounts: [false],

      applyToAllDays: [false],
      days: this.fb.array([]), // Başlangıçta boş bir FormArray
      policyCheckInFromDate: [null],
      policyCheckInToDate: [null],


      policyBookingStayFromDate: [null],
      policyBookingStayToDate: [null],
      rules: this.fb.array([]) // Form array for dynamic rules

    });
    this.daysVisible = !this.form.get('applyToAllDays')?.value; // Başlangıç görünümünü ayarla
  }

  // Get the rules FormArray
  get rules(): FormArray {
    return this.form.get('rules') as FormArray; // 'as FormArray' ile doğru türe çevirin
  }
  get rulesControls(): FormGroup[] {
    return this.rules.controls as FormGroup[]; // FormArray içindeki her bir kontrolü FormGroup olarak döndür
  }
  // Add a new rule
  addRule() {
    const ruleGroup = this.fb.group({
      from: [''],
      to: [''],
      condition: [null],
      stayFrom: [''],
      stayTo: [''],
      publicPrice: [''],
      publicPercent: [''],
      costPrice: [''],
      costPercent: [''],
    });

    this.rules.push(ruleGroup);
  }

  // Delete a rule
  deleteRule(index: number) {
    this.rules.removeAt(index);
  }
  ngOnInit(): void {


  }



  get daysArray(): FormArray<FormControl> {
    return this.form.get('days') as FormArray<FormControl<boolean>>;
  }

  toggleDaysVisibility() {
    this.daysVisible = this.form.get('applyToAllDays')?.value;

    if (this.daysVisible) {
      const days = [
        { label: 'Mo', value: 'Monday' },
        { label: 'Tu', value: 'Tuesday' },
        { label: 'We', value: 'Wednesday' },
        { label: 'Th', value: 'Thursday' },
        { label: 'Fr', value: 'Friday' },
        { label: 'Sa', value: 'Saturday' },
        { label: 'Su', value: 'Sunday' },
      ];
      days.forEach(() => this.daysArray.push(this.fb.control(false))); // Günlerin checkbox'larını ekler
    } else {
      this.daysArray.clear(); // Tüm gün checkbox'larını temizler
    }
  }

  addCheckInDates() {
    const policyCheckInFromDate = this.form.get('policyCheckInFromDate')?.value;
    const policyCheckInToDate = this.form.get('policyCheckInToDate')?.value;

    if (!this.form.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Eksik Bilgi',
        detail: 'Tüm gerekli alanları doldurun.',
      });
      return;
    }

    const isDuplicate = this.addedCheckInDates.some(
      (entry) =>
        entry.policyCheckInFromDate.getTime() === policyCheckInFromDate.getTime() &&
        entry.policyCheckInToDate.getTime() === policyCheckInToDate.getTime()
    );

    if (isDuplicate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Tarih Çakışması',
        detail: 'Bu tarih aralığı zaten eklenmiş.',
      });
      return;
    }

    this.addedCheckInDates.push({ policyCheckInFromDate, policyCheckInToDate });
    this.form.patchValue({ policyCheckInFromDate: null, policyCheckInToDate: null });
  }

  addBookingStayDate() {
    const policyBookingStayFromDate = this.form.get('policyBookingStayFromDate')?.value;
    const policyBookingStayToDate = this.form.get('policyBookingStayToDate')?.value;

    if (!this.form.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Eksik Bilgi',
        detail: 'Tüm gerekli alanları doldurun.',
      });
      return;
    }

    const isDuplicate = this.addedStayDates.some(
      (entry) =>
        entry.policyBookingStayFromDate.getTime() === policyBookingStayFromDate.getTime() &&
        entry.policyBookingStayToDate.getTime() === policyBookingStayToDate.getTime()
    );

    if (isDuplicate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Tarih cakismasi',
        detail: 'Bu tarih araligi zaten eklenmis.',
      });
      return;
    }

    this.addedStayDates.push({ policyBookingStayFromDate, policyBookingStayToDate });
    this.form.patchValue({ policyBookingStayFromDate: null, policyBookingStayToDate: null });
  }


  deleteDate(index: number) {
    this.addedCheckInDates.splice(index, 1);
  }
  deleteStayDate(index: number) {
    this.addedStayDates.splice(index, 1);
  }
  saveForm() {
    let data = this.form.value;
    // const formData = {


    //   applyToAllDays: this.form.get('applyToAllDays')?.value,
    //   selectedDays: this.daysArray.controls
    //     .map((control, index) => (control.value ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'][index] : null))
    //     .filter((day) => day !== null),
    //   addedDates: this.addedCheckInDates,

    // };

    console.log('Saved Data:', data);
    this.messageService.add({
      severity: 'success',
      summary: 'Form Kaydedildi',
      detail: 'Form bilgileri başarıyla kaydedildi.',
    });
  }
}
