import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';

export interface BreadcrumbItem {
  label: string;
  route?: string;
  url?: string;
  icon?: string;
  isActive?: boolean; // Eğer son öğe ise vurgulama için
}

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [BreadcrumbModule ,CommonModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
