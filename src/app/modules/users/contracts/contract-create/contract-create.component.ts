import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PeriodBasedContractComponent } from '../components/period-based-contract/period-based-contract.component';
import { DateBasedContractComponent } from '../components/date-based-contract/date-based-contract.component';


@Component({
  selector: 'app-contract-create',
  standalone: true,
  imports: [

    TabViewModule,
    ToastModule,
    
    PeriodBasedContractComponent,
    DateBasedContractComponent
  ],
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.scss'],
  providers: [MessageService],
  
})
export class ContractCreateComponent {


 
}
