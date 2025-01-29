import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule, NgClass, NgIf } from '@angular/common';
import { UserLayoutService } from '../../services/user.layout.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';

import { AvatarProfileComponent } from './avatar-profile/avatar-profile.component';
import { ButtonModule } from 'primeng/button';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { NotificationComponent } from './components/notification/notification.component';
@Component({
    standalone: true,
    imports: [NgClass, NgIf, CommonModule, FormsModule, DropdownModule, AvatarProfileComponent, MenuModule, ButtonModule, AvatarModule, NotificationComponent],

    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.scss',
    providers: [MessageService]
})
export class TopBarComponent implements OnInit {

    items: MenuItem[] | undefined;
    // isNotificationVisible = false; // Bildirim menüsü görünürlüğü
    isAvatarMenuVisible = false; // Avatar menüsü görünürlüğü
    isLanguageMenuVisible = false;


    selectedLanguage: string | any;

    // Diller ve bayraklar
    languages = [
        { name: 'United States', code: 'US' },
        { name: 'Germany', code: 'DE' },
        { name: 'Spain', code: 'ES' }

    ];


    // Avatar Menüsünü Aç/Kapa
    toggleAvatarMenu(event: MouseEvent) {
        event.stopPropagation();
        this.isAvatarMenuVisible = !this.isAvatarMenuVisible;
        //this.isNotificationVisible = false; // Bildirim menüsü açıksa kapat
    }




    @HostListener('document:click', ['$event'])
    closeMenus() {

        this.isAvatarMenuVisible = false;

    }

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: UserLayoutService, private router: Router) {
        // Varsayılan dili al
       
    }

    onLanguageChange(event: any): void {
        // Dil değişim kontrolü
        console.log('Dil değiştirildi:', event.value);
    
        // Yeni seçilen dili kullanarak gerekli işlemleri yapabilirsiniz
        this.updateLanguageSettings(event.value);
      }
    
      updateLanguageSettings(language: { name: string; code: string; flag: string }): void {
        // Dil değişikliğine bağlı işlemler
        console.log('Yeni dil ayarlandı:', language);
    
        // Örneğin:
        // - Uygulama dilini değiştirmek
        // - Yerel depolamaya kaydetmek
        localStorage.setItem('selectedLanguage', JSON.stringify(language));
      }

    ngOnInit() {
        this.selectedLanguage = this.languages[0];
    }

}

