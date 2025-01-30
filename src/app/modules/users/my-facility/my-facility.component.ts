import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { GeneralComponent } from './components/general/general.component';
import { CancellationPoliciesComponent } from './components/cancellation-policies/cancellation-policies.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { MealsComponent } from './components/meals/meals.component';
import { MiceComponent } from './components/mice/mice.component';
import { OteltypeTemasComponent } from './components/oteltype-temas/oteltype-temas.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SupplierContractsComponent } from './components/supplier-contracts/supplier-contracts.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
@Component({
  selector: 'app-my-facility',
  standalone: true,
  imports: [StepperModule,CommonModule,ButtonModule,ProgressBarModule,ToastModule,
    GeneralComponent,OpportunitiesComponent,CancellationPoliciesComponent,DocumentsComponent,MealsComponent,MiceComponent,OteltypeTemasComponent,RoomsComponent,SupplierContractsComponent
  ],
  templateUrl: './my-facility.component.html',
  styleUrl: './my-facility.component.scss'
})
export class MyFacilityComponent {
  value: number = 1.75;
}
