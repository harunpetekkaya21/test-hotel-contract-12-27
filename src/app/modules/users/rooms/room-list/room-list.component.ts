import { Component } from '@angular/core';
import { BreadCrumbComponent, BreadcrumbItem } from '../../../../shared/components/bread-crumb/bread-crumb.component';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InfoChipComponent } from '../../../../shared/components/info-chip/info-chip.component';
@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [BreadCrumbComponent,ChipModule,DialogModule,InfoChipComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent {

    breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Dashboard', route: '/', icon: 'fa fa-home' },
    { label: 'Room Type List', route: '/components' ,isActive: true },
 
   
    ];



}
