import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { MealBoardTypeOption } from '../../../../../../core/models/meal-board-type/MealBoardTypeOption';
import { MealPlanAndBoarTypeServiceService } from '../../../../../../core/services/meal-plan-and-boar-type-service.service';

@Component({
  selector: 'app-rooms-meal-plan-tab-view',
  standalone: true,
  imports: [ButtonModule,FieldsetModule, FormsModule, ReactiveFormsModule, CheckboxModule, CommonModule],
  templateUrl: './rooms-meal-plan-tab-view.component.html',
  styleUrl: './rooms-meal-plan-tab-view.component.scss',


})
export class RoomsMealPlanTabViewComponent implements OnInit {
  roomsMealPlanTabViewForm!: FormGroup;


  mealBoardTypeOptions: MealBoardTypeOption[] = [];
  selectedMealBoardTypeOptions: MealBoardTypeOption[] = [];


 
  constructor(private fb: FormBuilder,private mealAndBoardTypeService:MealPlanAndBoarTypeServiceService) { }

  ngOnInit(): void {
    this.initialRoomsMealPlanTabViewForms();
    this.loadMealOptions();

  }

  private loadMealOptions(): void {
    // Servisten verileri çekiyoruz
    this.mealAndBoardTypeService.getMealBoardOptions().subscribe({
      next: (data) => {
        this.mealBoardTypeOptions = data;
        this.initialRoomsMealPlanTabViewForms();
      },
      error: (err) => console.error('Error loading meal board options:', err),
    });
  }


  private initialRoomsMealPlanTabViewForms(): void {
    const formControls = this.mealBoardTypeOptions.reduce(
      (controls, option) => {
        controls[`option_${option.id}`] = [false];
        return controls;
      },
      {} as { [key: string]: any }
    );

    this.roomsMealPlanTabViewForm = this.fb.group(formControls, {
      validators: [this.atLeastOneCheckboxSelected()],
    });
  }

  getSelectedOptions(): { id: number; name: string }[] {
    return Object.keys(this.roomsMealPlanTabViewForm.controls)
      .filter((key) => this.roomsMealPlanTabViewForm.get(key)?.value)
      .map((key) => {
        const id = parseInt(key.split('_')[1], 10);
        const option = this.mealBoardTypeOptions.find((o) => o.id === id);
        return option ? { id: option.id, name: option.name } : null;
      })
      .filter((option) => option !== null) as { id: number; name: string }[];
  }

  atLeastOneCheckboxSelected() {
    return (formGroup: FormGroup) => {
      const isAtLeastOneSelected = Object.values(formGroup.controls).some(
        (control) => control.value === true
      );
      return isAtLeastOneSelected ? null : { atLeastOneRequired: true };
    };
  }

  

  save(){
    const selectedOptions = this.getSelectedOptions();
  console.log('Selected Meal Board Options:', selectedOptions);
    
  }
}



