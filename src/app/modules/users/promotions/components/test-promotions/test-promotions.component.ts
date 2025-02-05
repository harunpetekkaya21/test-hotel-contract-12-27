import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { MultiSelectModule } from 'primeng/multiselect';
import { SimpleRoomType } from '../../../../../core/models/Room-Type/SimpleRoomType';
import { RoomTypeService } from '../../../../../core/services/room-type.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { BoardTypeService } from '../../../../../core/services/board-type.service';
import { BoardType } from '../../../../../core/models/Board-Type/BoardType';


interface OfferType {
  name: string;
  id: number;
}
interface ApplicationType {
  name: string;
  id: number;
}

interface ChildCategory {
  name: string;
  id: number;
}

@Component({
  selector: 'app-test-promotions',
  standalone: true,
  imports: [FieldsetModule, CalendarModule, ButtonModule, CommonModule, FormsModule, MultiSelectModule, ScrollPanelModule, CheckboxModule, TableModule, ReactiveFormsModule, DropdownModule, InputSwitchModule, InputTextModule, InputNumberModule],

  templateUrl: './test-promotions.component.html',
  styleUrl: './test-promotions.component.scss'
})
export class TestPromotionsComponent implements OnInit {

  // Date Range
  startDate: Date | undefined;
  endDate: Date | undefined;
  simpleRoomTypes: SimpleRoomType[] = [];
  selectedSimpeRoomTypes!: SimpleRoomType[];

  promotionsForm!: FormGroup;

  offerTypeList: OfferType[] = [];
  applicationTypeList: ApplicationType[] = [];
  boardTypeList: BoardType[] = [];

  ChildrenACategories: ChildCategory[] = [];
  ChildrenBCategories: ChildCategory[] = [];

  customerPaysOptions = ['Bed & Breakfast', 'Half Board', 'Room Only', 'All'];
  andGetsOptions = ['Bed & Breakfast', 'Half Board', 'Room Only', 'All'];

  nightsOfferForEachOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  nightsOfferFreeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  nightsOffer_TypeOptions=['Cheapest','Most expensive','The first Nights','The last Nights','Cheapest in each period','The last Nights in each period','Average price']

  constructor(private fb: FormBuilder, private roomTypeService: RoomTypeService, private boardTypeService: BoardTypeService) { }

  ngOnInit(): void {
    this.promotionsForm = this.fb.group({
      offerType: [null],
      offerPriority: [null],
      isActiveOffer: [false],
      accommodationName: [''],
      isNonRefundableOffer: [false],
      selectedApplicationType: [null],
      itIsMandatoryToKnowThePromotionalCodeToApplyTheOffer: [false],
      promoCodeForBookingRequest: [''],

      boardType: [null],
      minimumStayNightsFrom: [null],
      minimumStayNightsTo: [null],
      selectedChildrenA: [[]], // Çoklu seçim için array
      selectedChildrenB: [[]], // Çoklu seçim için array
      bookingStartDate: [null],
      bookingEndDate: [null],


      //Board type offer secildiginde 
      applyToAdditionals: [false],
      applyToChildren: [false],
      customerPays: [null],
      andGets: [null],

      //Nights offer secildiginde 
      nightsOffer_ForEach: [null],
      nightsOffer_Free: [null],
      nightsOffer_Type: [null],
      nightsOffer_ApplyOnlyOnce: [false],




    });

    this.loadRoomTypes();
    this.loadOfferTypes();
    this.loadApplicationTypes();

    this.subscribeToMandatoryPromoCode();

    this.loadBoardTypes();
    this.loadChildrenCategories(); // Children A ve B kategorilerini başlat

    this.subscribeToOfferTypeChanges(); // Dinleyiciyi başlat
  }

  onOfferTypeChange(event: OfferType) {
    if (event.id === 1) {
      this.promotionsForm.get('offerPriority')?.setValue(1);
    } else {
      this.promotionsForm.get('offerPriority')?.reset();
    }
  }

  subscribeToMandatoryPromoCode() {
    this.promotionsForm.get('itIsMandatoryToKnowThePromotionalCodeToApplyTheOffer')?.valueChanges.subscribe((isMandatory) => {
      if (!isMandatory) {
        this.promotionsForm.get('promoCodeForBookingRequest')?.reset();
      }
    });
  }

  // Offer Type değişimini dinleyerek yeni alanları göstermek/gizlemek
  subscribeToOfferTypeChanges() {
    this.promotionsForm.get('offerType')?.valueChanges.subscribe((selectedOffer) => {
      if (selectedOffer?.name === 'Board type offer') {
        this.promotionsForm.get('applyToAdditionals')?.setValue(false);
        this.promotionsForm.get('applyToChildren')?.setValue(false);
        this.promotionsForm.get('customerPays')?.setValue(null);
        this.promotionsForm.get('andGets')?.setValue(null);
      } else {
        this.promotionsForm.get('applyToAdditionals')?.reset();
        this.promotionsForm.get('applyToChildren')?.reset();
        this.promotionsForm.get('customerPays')?.reset();
        this.promotionsForm.get('andGets')?.reset();
      }

      //Nights offer Type secildiginde : 
      if (selectedOffer?.name === 'Nights offer') {
        this.promotionsForm.get('nightsOffer_ForEach')?.setValue(false);
        this.promotionsForm.get('nightsOffer_Free')?.setValue(false);
        this.promotionsForm.get('nightsOffer_Type')?.setValue(null);
        this.promotionsForm.get('nightsOffer_ApplyOnlyOnce')?.setValue(null);
      } else {
        this.promotionsForm.get('nightsOffer_ForEach')?.reset();
        this.promotionsForm.get('nightsOffer_Free')?.reset();
        this.promotionsForm.get('nightsOffer_Type')?.reset();
        this.promotionsForm.get('nightsOffer_ApplyOnlyOnce')?.reset();
      }


    });
  }

  loadRoomTypes(): void {
    this.roomTypeService.getSimpleRoomTypes().subscribe({
      next: (data) => (this.simpleRoomTypes = data),
      error: (err) => console.error('Error loading room types:', err),
    });
  }

  loadOfferTypes() {
    this.offerTypeList = [
      { id: 1, name: 'Free child discount' },
      { id: 2, name: 'Board type offer' },
      { id: 3, name: 'Nights offer' },
      { id: 4, name: "Prices's offer" },
      { id: 5, name: 'Early booking' },
      { id: 6, name: 'Room type upgrade' },
    ];
  }

  loadApplicationTypes() {
    this.applicationTypeList = [
      { id: 1, name: 'Type 1' },
      { id: 2, name: 'Type 2' },
      { id: 3, name: 'Type 3' },
    ];
  }

  loadBoardTypes() {
    this.boardTypeService.getBoardTypes().subscribe({
      next: (data) => (this.boardTypeList = data),
      error: (err) => console.error('Error loading board types:', err)
    });
  }
  loadChildrenCategories() {
    this.ChildrenACategories = [
      { id: 1, name: '0-2 years' },
      { id: 2, name: '3-6 years' },
      { id: 3, name: '7-12 years' }
    ];

    this.ChildrenBCategories = [
      { id: 4, name: '0-1 years' },
      { id: 5, name: '2-5 years' },
      { id: 6, name: '6-10 years' }
    ];
  }
}