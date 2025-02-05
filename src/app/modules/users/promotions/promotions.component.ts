import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import { TestPromotionsComponent } from './components/test-promotions/test-promotions.component';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,InputSwitchModule,DropdownModule,ButtonModule,TabViewModule,CreatePromotionComponent,TestPromotionsComponent],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent {
  
}
