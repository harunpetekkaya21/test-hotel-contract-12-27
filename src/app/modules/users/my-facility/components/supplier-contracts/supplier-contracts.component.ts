import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

interface Country {
  name: string;
  code: string;
  flag: string;
}
interface FieldConfig {
  controlName: string;
  label: string;
  options?: string[];
}
@Component({
  selector: 'facility-supplier-contracts',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,
    TableModule,FieldsetModule,DropdownModule,CalendarModule,MultiSelectModule,InputTextModule,InputSwitchModule,ButtonModule,InputNumberModule,RadioButtonModule],
  templateUrl: './supplier-contracts.component.html',
  styleUrl: './supplier-contracts.component.scss'
})
export class SupplierContractsComponent implements OnInit{
  supplierContractsForm: FormGroup;


  // Dropdown and Options Data
  contractTypes = ['FIT', 'BAR', 'PROMO', 'RACK'];
  seasons = ['2024-2030', 'S24', 'W24-25'];
  brandRatings = ['Without Category'];
  sendValuedBookingsToTheSuppliersList = ['Yes', 'No', 'As Configured'];
  sendBookingsToHotelList = ['Yes', 'No', 'As Configured'];
  applyThisContractList = ['Both', 'Hotel only', 'Part of Package'];
  contractProviderList = ['Akay Turizm', 'BedBank', 'Direct Hotel'];
  applyReleaseOrCutOffDateList = ['Per Stay', 'Per Check-In Date'];
  currencyList = ['EUR', 'USD'];
  virtualCreditCardPaymentList = ['No', 'As Configured'];
  applicationOfOffersList = ['By Priority', 'By Best Price'];





  // Country Data
  countries: Country[] = [
    { name: 'Türkiye', code: 'TR', flag: 'https://flagcdn.com/tr.svg' },
    { name: 'Afghanistan', code: 'AF', flag: 'https://flagcdn.com/w320/af.png' },
    { name: 'Albania', code: 'AL', flag: 'https://flagcdn.com/w320/al.png' },
  ];
  selectedCountries!: Country[];


  // Dynamic Form Controls
  dropdownFields: FieldConfig[] = [
    { controlName: 'contractType', label: 'Contract Type', options: this.contractTypes },
    { controlName: 'season', label: 'Season', options: this.seasons },
    { controlName: 'brandRating', label: 'Brand Rating', options: this.brandRatings },
    { controlName: 'applyThisContract', label: 'Apply This Contract', options: this.applyThisContractList },
    { controlName: 'contractProvider', label: 'Contract Provider', options: this.contractProviderList },
    { controlName: 'applyReleaseOrCutOffDate', label: 'Apply Release / Cut-Off Date', options: this.applyReleaseOrCutOffDateList },
    { controlName: 'currency', label: 'Currency', options: this.currencyList },
    { controlName: 'virtualCreditCardPayment', label: 'Virtual Credit Card Payment', options: this.virtualCreditCardPaymentList },
    { controlName: 'applicationOfOffers', label: 'Application of Offers', options: this.applicationOfOffersList },
  ];

  switchFields: FieldConfig[] = [
    { controlName: 'activeState', label: 'Active' },
    { controlName: 'nonRefundableState', label: 'Non-Refundable' },
    { controlName: 'allowFreeRateState', label: 'Allow Free Rate' },
    { controlName: 'viewRecomendedSalesPriceState', label: 'View Recommended Sales Price' },
    { controlName: 'showRecomendedPricesToEndCustomersState', label: 'Show Recommended Prices to End Customers' },
    { controlName: 'sendStopSalesToCustomerState', label: 'Send Stop Sales to Customers' },
    { controlName: 'VisibleToTheExtranetUserState', label: 'Visible to the Extranet User' },
    { controlName: 'canBeUsedWithMultipleAccommodationContractsState', label: 'Can Be Used with Multiple Accommodation Contracts' },
    { controlName: 'immediatePaymentState', label: 'Immediate Payment' },
    { controlName: 'useTheAllotmentOfAnotherContractState', label: 'Use the Allotment of Another Contract' },
  ];

  //liberty


  roomOptions = ['STANDARD TWIN ROOM', 'DELUXE ROOM', 'SUITE'];
  increaseDaysOptions = Array.from({ length: 100 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
  addedRows: Array<any> = [];

  constructor(private fb: FormBuilder) {
    this.supplierContractsForm = this.fb.group({
      name: [null],
      contractType: [null],
      season: [null],
      brandRating: [null],
      seasonDateFrom: [null],
      seasonDateEnd: [null],
      sendValuedBookingsToTheSuppliers: [null],
      sendBookingsToHotel: [null],
      invoicingCountries: [null],
      applyThisContract: [null],
      contractProvider: [null],
      applyReleaseOrCutOffDate: [null],
      currency: [null],
      virtualCreditCardPayment: [null],
      applicationOfOffers: [null],
      ...this.switchFields.reduce((controls: Record<string, any>, field) => {
        controls[field.controlName] = [false];
        return controls;
      }, {}),
      availableThroughAllSalesChannelsState: [true],
      availableThroughAllSalesChannelsStateWebService: [false],
      availableThroughAllSalesChannelsStateWebSite: [false],


      liberateMinimumAllotmentState: [false],
      releaseType: ['Days'],
      room: [null],
      fromDate: [null],
      toDate: [null],
      increaseDays: [null],
      specificDate: [null],

    });
  }

  toggleLiberateAllotment(): void {
    console.log('Liberate Minimum Allotment State:', this.supplierContractsForm.get('liberateMinimumAllotmentState')?.value);
  }

  addRow(): void {
    const newRow = {
      releaseType: this.supplierContractsForm.get('releaseType')?.value,
      room: this.supplierContractsForm.get('room')?.value,
      from: this.supplierContractsForm.get('fromDate')?.value,
      to: this.supplierContractsForm.get('toDate')?.value,
      increaseDays: this.supplierContractsForm.get('increaseDays')?.value,
      date: this.supplierContractsForm.get('specificDate')?.value,
    };

    this.addedRows.push(newRow);

   
  }

  deleteRow(row: any): void {
    this.addedRows = this.addedRows.filter((r) => r !== row);
  }


  get availableThroughAllSalesChannelsState() {
    return this.supplierContractsForm.get('availableThroughAllSalesChannelsState')?.value;
  }
  get liberateMinimumAllotmentState() {
    return this.supplierContractsForm.get('liberateMinimumAllotmentState')?.value;
  }



  ngOnInit(): void {
    // Release Type seçimini dinleme
  this.supplierContractsForm.get('releaseType')?.valueChanges.subscribe((value) => {
    this.updateFieldStates(value);
  });

  // Sayfa yüklendiğinde varsayılan değer için kontrol
  const initialValue = this.supplierContractsForm.get('releaseType')?.value;
  this.updateFieldStates(initialValue);
  }

// Alanların durumlarını güncelleyen fonksiyon
private updateFieldStates(value: string): void {
  if (value === 'Date') {
    // Eğer "Date" seçiliyse, diğer alanları devre dışı bırak
    this.disableFields(['fromDate', 'toDate', 'increaseDays']);
    this.enableFields(['specificDate']);
  } else if (value === 'Days') {
    // Eğer "Days" seçiliyse, sadece "Date" alanını devre dışı bırak
    this.enableFields(['fromDate', 'toDate', 'increaseDays']);
    this.disableFields(['specificDate']);
  }
}

// Alanları devre dışı bırakma
private disableFields(fieldNames: string[]): void {
  
  fieldNames.forEach((fieldName) => {
    this.supplierContractsForm.get(fieldName)?.disable();
  });
}

// Alanları etkinleştirme
private enableFields(fieldNames: string[]): void {
  fieldNames.forEach((fieldName) => {
    this.supplierContractsForm.get(fieldName)?.enable();
  });
}


  onSubmit() {
    console.log(this.supplierContractsForm.value);
  }
}
