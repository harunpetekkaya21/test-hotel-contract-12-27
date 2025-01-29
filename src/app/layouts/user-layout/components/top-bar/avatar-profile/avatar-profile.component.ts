import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
@Component({
  selector: 'app-avatar-profile',
  standalone: true,
  imports: [AvatarModule,CommonModule,RouterLink],
  templateUrl: './avatar-profile.component.html',
  styleUrl: './avatar-profile.component.scss'
})
export class AvatarProfileComponent {
  isMenuVisible = false;

  toggleMenu(event: MouseEvent) {
    event.stopPropagation(); // Menü dışında tıklamaları ayır
    this.isMenuVisible = !this.isMenuVisible;
  }

  @HostListener('document:click', ['$event'])
  closeMenu() {
    this.isMenuVisible = false; // Boş bir yere tıklanınca menüyü kapat
  }
}
