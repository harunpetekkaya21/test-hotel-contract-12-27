import { Component, OnInit } from '@angular/core';

import { MenuItemComponent } from './menu-item/menu-item.component';
import { NgFor, NgIf } from '@angular/common';
import { UserLayoutService } from '../../services/user.layout.service';


@Component({
    standalone: true,
    imports: [MenuItemComponent,NgIf,NgFor],
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: UserLayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    { label: 'Dashboard', icon: 'fa fa-home', routerLink: [''] }
                ]
            },

          
            {
                label: 'Rooms',
                icon: '',
                items: [

                    {
                        label: 'Roooms',
                        icon: 'fa fa-bed',
                        items: [
                           
                            {
                                label: 'Room Type List',
                                icon: 'fa fa-list',
                                routerLink: ['rooms/list-room-type']
                            },
                            {
                                label: 'Create New Room Type',
                                icon: 'fa fa-square-plus',
                                routerLink: ['rooms/create-new-room-type']
                            }
                            
                            

                        ]
                    },

                ]
            },
            {
                label: 'Contracts',
                icon: '',
                items: [

                    {
                        label: 'Contracts',
                        icon: 'fa fa-book',
                        items: [
                            {
                                label: 'Contract List',
                                icon: 'fa fa-list',
                                routerLink: ['contracts/list-contracts']
                            },
                            {
                                label: 'Create New Contract',
                                icon: 'fa fa-square-plus',
                                routerLink: ['contracts/create-new-contract']
                            }
                            

                        ]
                    },
                    

                ]
            },
            {
                label: 'Settings',
                icon: '',
                items: [

                    {
                        label: 'Settings',
                        icon: 'fa fa-cog',
                        items: [
                            {
                                label: 'My Profile',
                                icon: 'fa fa-user',
                                routerLink: ['settings/profile']
                            },
                            
                            

                        ]
                    },
                    

                ]
            },

           

        ];
    }
}
