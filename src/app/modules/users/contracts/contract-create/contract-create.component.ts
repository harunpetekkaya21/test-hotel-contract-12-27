import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';

import { PeriodBasedContractComponent } from '../components/period-based-contract/period-based-contract.component';
import { DateBasedContractComponent } from '../components/date-based-contract/date-based-contract.component';
import { BreadCrumbComponent, BreadcrumbItem } from '../../../../shared/components/bread-crumb/bread-crumb.component';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InfoChipComponent } from '../../../../shared/components/info-chip/info-chip.component';

@Component({
  selector: 'app-contract-create',
  standalone: true,
  imports: [

    TabViewModule,
    ToastModule,
    
    PeriodBasedContractComponent,
    DateBasedContractComponent,
    BreadCrumbComponent,
    ChipModule,
    DialogModule,
    InfoChipComponent
  ],
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.scss'],

  
})
export class ContractCreateComponent {

    breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Dashboard', route: '/', icon: 'fa fa-home' },
    { label: 'Create New Contract', route: '/components' ,isActive: true },
 
   
    ];
}
