import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PeriodBasedContractComponent } from '../components/period-based-contract/period-based-contract.component';
import { DateBasedContractComponent } from '../components/date-based-contract/date-based-contract.component';
import { BreadCrumbComponent, BreadcrumbItem } from '../../../../shared/components/bread-crumb/bread-crumb.component';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';

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
    DialogModule
  ],
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.scss'],
  providers: [MessageService],
  
})
export class ContractCreateComponent {

  informationDialogVisible: boolean = false;
    breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Dashboard', route: '/', icon: 'fa fa-home' },
    { label: 'Create New Contract', route: '/components' ,isActive: true },
 
   
    ];


    showInformationDialog(){
      this.informationDialogVisible=true;
    }
 
}
