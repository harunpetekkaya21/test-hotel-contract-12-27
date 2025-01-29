import { Component } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [ScrollPanelModule,BadgeModule,CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  isMenuVisible = false; // Menünün açık/kapalı durumu

  notifications = [
    {
      message: 'notification 1',
      priority: 'High',
      priorityColor: 'var(--primary-color)',
    },
    {
      message: 'notification 2',
      priority: 'Medium',
      priorityColor: 'var(--secondary-color)',
    },
    {
      message: 'notification 3',
      priority: 'Low',
      priorityColor: '#cccccc',
    },
    {
      message: 'notification 4',
      priority: 'Medium',
      priorityColor: 'var(--secondary-color)',
    }, {
      message: 'notification  5',
      priority: 'High',
      priorityColor: 'var(--primary-color)',
    },
    {
      message: 'notification 6',
      priority: 'Medium',
      priorityColor: 'var(--secondary-color)',
    },
    {
      message: 'notification 7',
      priority: 'Low',
      priorityColor: '#cccccc',
    },
    {
      message: 'notification 8',
      priority: 'Medium',
      priorityColor: 'var(--secondary-color)',
    },
  ];

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  closeMenu() {
    this.isMenuVisible = false;
  }
}
