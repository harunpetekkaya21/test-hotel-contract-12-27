import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SkeletonModule,TagModule,ChipModule,BadgeModule,ChartModule,VirtualScrollerModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 
  constructor() {}

  ngOnInit(): void {
   
  }


}
