import { Component } from '@angular/core';
import { BreadCrumbComponent, BreadcrumbItem } from '../../../../shared/components/bread-crumb/bread-crumb.component';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InfoChipComponent } from '../../../../shared/components/info-chip/info-chip.component';
@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [BreadCrumbComponent,ChipModule,DialogModule,InfoChipComponent],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.scss'
})
export class ContractListComponent {

    breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Dashboard', route: '/', icon: 'fa fa-home' },
    { label: 'My Contracts', route: '/components' ,isActive: true },
 
   
    ];


}
