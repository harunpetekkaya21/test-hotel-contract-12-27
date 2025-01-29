import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { GeneralTabViewComponent } from './components/general-tab-view/general-tab-view.component';
import { RoomsMealPlanTabViewComponent } from './components/rooms-meal-plan-tab-view/rooms-meal-plan-tab-view.component';
import { SupplierContractsTabViewComponent } from './components/supplier-contracts-tab-view/supplier-contracts-tab-view.component';
import { CancellationPolicyTabViewComponent } from './components/cancellation-policy-tab-view/cancellation-policy-tab-view.component';
@Component({
  selector: 'app-my-facility',
  standalone: true,
  imports: [
    ToastModule,TabViewModule,
    GeneralTabViewComponent,
    RoomsMealPlanTabViewComponent,
    SupplierContractsTabViewComponent,
    CancellationPolicyTabViewComponent,

  ],
  templateUrl: './my-facility.component.html',
  styleUrl: './my-facility.component.scss'
})
export class MyFacilityComponent {

}
