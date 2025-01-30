import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { MealsOption } from '../../../../../core/models/Meal/MealsOption';
import { MealsService } from '../../../../../core/services/meals.service';

@Component({
  selector: 'facility-meals',
  standalone: true,
  imports: [FormsModule,CommonModule,FieldsetModule,ReactiveFormsModule,CheckboxModule],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss'
})
export class MealsComponent {
   mealsPlanForm!: FormGroup;

  mealBoardTypeOptions: MealsOption[] = [];
  selectedMealBoardTypeOptions: MealsOption[] = [];

  constructor(private fb: FormBuilder,private mealsService:MealsService) { }

  ngOnInit(): void {
    this.initialMealsForms();
    this.loadMealOptions();

  }

  private loadMealOptions(): void {
    // Servisten verileri çekiyoruz
    this.mealsService.getMealBoardOptions().subscribe({
      next: (data) => {
        this.mealBoardTypeOptions = data;
        this.initialMealsForms();
      },
      error: (err) => console.error('Error loading meal board options:', err),
    });
  }


  private initialMealsForms(): void {
    const formControls = this.mealBoardTypeOptions.reduce(
      (controls, option) => {
        controls[`option_${option.id}`] = [false];
        return controls;
      },
      {} as { [key: string]: any }
    );

    this.mealsPlanForm = this.fb.group(formControls, {
      validators: [this.atLeastOneCheckboxSelected()],
    });
  }

  getSelectedOptions(): { id: number; name: string }[] {
    return Object.keys(this.mealsPlanForm.controls)
      .filter((key) => this.mealsPlanForm.get(key)?.value)
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
