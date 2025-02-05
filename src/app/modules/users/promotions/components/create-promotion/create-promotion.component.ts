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

@Component({
  selector: 'app-create-promotion',
  standalone: true,
  imports: [FieldsetModule, CalendarModule, ButtonModule, CommonModule, FormsModule, MultiSelectModule, ScrollPanelModule, CheckboxModule, TableModule, ReactiveFormsModule, DropdownModule, InputSwitchModule, InputTextModule, InputNumberModule],
  templateUrl: './create-promotion.component.html',
  styleUrl: './create-promotion.component.scss'
})
export class CreatePromotionComponent implements OnInit {
  // Date Range
  startDate: Date | undefined;
  endDate: Date | undefined;
  // Room Types
  simpleRoomTypes: SimpleRoomType[] = [];
  selectedSimpeRoomTypes!: SimpleRoomType[];


  //Offers Base
  offerTypeList: OfferType[] = [];
  selectedOfferType: OfferType;
  isActiveOffer: boolean = false;
  accommodationName: string = '';
  isNonRefundableOffer: boolean = false;
  offerPriority: number = 0;


  //offer type secenek 1 
  applicationTypeList: ApplicationType[] = [];
  selectedApplicationType: ApplicationType;
  itIsMandatoryToKnowThePromotionalCodeToApplyTheOffer: boolean = false;
  promoCodeForBookingRequest: string = '';
  boardTypeList: BoardType[] = [];
  selectedBoardType: BoardType;
  minimumStayNightsFrom: number = 0;
  minimumStayNightsTo: number = 0;
  ChildrenACategories: any[] = [];
  ChildrenBCategories: any[] = [];
  selectedChildrenA: any[] = [];
  selectedChildrenB: any[] = [];
  bookingStartDate: Date | undefined;
  bookingEndDate: Date | undefined;

  //Free child discount secildiginde gorunuyor
  applyToAdditionals:boolean=false;
  applyToChildren:boolean=false;


  constructor(private fb: FormBuilder, private roomTypeService: RoomTypeService, private boardTypeService: BoardTypeService) { }

  ngOnInit(): void {

    this.loadRoomTypes();
    this.initialOfferTypes();
    this.initialApplicationTypes();
    this.initBoardTypes();
    this.initChildrenCategories();
  }



  loadRoomTypes(): void {
    
    this.roomTypeService.getSimpleRoomTypes().subscribe({
      next: (data) => (this.simpleRoomTypes = data),
      error: (err) => console.error('Error loading room types:', err)
    });
  }




  initialOfferTypes() {
    this.offerTypeList = [
      { id: 1, name: "Free child discount" },
      { id: 2, name: "Board type offer" },
      { id: 3, name: "Nights offer" },
      { id: 4, name: "Prices's offer" },
      { id: 5, name: "Early booking" },
      { id: 6, name: "Room type upgrade" },
    ];
  }


  initialApplicationTypes() {
    this.applicationTypeList = [
      { id: 1, name: "To apply to base price" },
      { id: 2, name: "To apply the base rate with board and room type" },
      { id: 3, name: "After applying other supplements/discounts" },
      { id: 4, name: "Apply after applying other supplements and discounts without board and room type" },

    ];
  }



  initBoardTypes() {

    this.boardTypeService.getBoardTypes().subscribe({
      next: (data) => (this.boardTypeList = data),
      error: (err) => console.error('Error loading board types:', err)
    });
  }

  initChildrenCategories() {
    this.ChildrenACategories = [
      {id:1,name:'1st'},
      {id:2,name:'2nd'},
      {id:3,name:'3rd'}
    ]
    this.ChildrenBCategories = [
      {id:1,name:'1st'},
      {id:2,name:'2nd'},
      {id:3,name:'3rd'}
    ]
  }

  // Seçili RoomType'ları Konsola Yazdır
  submitForm(): void {


    // console.log('Selected Room Types:', this.promotionForm.value.selectedRoomTypes);
  }
}



