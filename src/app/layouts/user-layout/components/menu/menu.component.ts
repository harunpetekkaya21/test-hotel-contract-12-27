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

            // {
            //     label: '',
            //     icon: '',
            //     items: [

            //         {
            //             label: 'Reports',
            //             icon: 'pi  pi-calendar',
            //             items: [
            //                 {
            //                     label: 'Rate Check',
            //                     icon: 'pi pi-calendar',
            //                     items: [

            //                         {
            //                             label: 'Winter',
            //                             icon: 'pi pi-book',
            //                             routerLink: ['/facility/facility-create']
            //                         },
            //                         {
            //                             label: 'Summer',
            //                             icon: 'pi pi-book',
            //                             routerLink: ['/facility/facility-create']
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Sales',
            //                     icon: 'pi pi-calendar',
            //                     items: [

            //                         {
            //                             label: 'Winter',
            //                             icon: 'pi pi-book',
            //                             routerLink: ['/facility/facility-create']
            //                         },
            //                         {
            //                             label: 'Summer',
            //                             icon: 'pi pi-book',
            //                             routerLink: ['/facility/facility-create']
            //                         }
            //                     ]
            //                 },

            //             ]
            //         },

            //     ]
            // },
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

            //   {
            //     label: '',
            //     icon: '',
            //     items: [

            //         {
            //             label: 'Rooms',
            //             icon: 'pi pi-fw pi-image',
            //             items: [
            //                 {
            //                     label: 'Room List',
            //                     icon: 'pi pi-fw pi-list',
            //                     routerLink: ['/room/room-list']
            //                 },
            //                 {
            //                     label: 'Create New Room',
            //                     icon: 'pi pi-fw pi-plus-circle',
            //                     routerLink: ['/room/room-create']
            //                 },

            //             ]
            //         },

            //     ]
            // },

            // {
            //     label: '',
            //     icon: '',
            //     items: [

            //         {
            //             label: 'Contracts',
            //             icon: 'pi pi-fw pi-file-edit',
            //             items: [
            //                 {
            //                     label: 'Contract List',
            //                     icon: 'pi pi-fw pi-list',
            //                     routerLink: ['/contract/contract-create']
            //                 },
            //                 {
            //                     label: 'Create New Contract',
            //                     icon: 'pi pi-fw pi-plus-circle',
            //                     routerLink: ['/contract/contract-list']
            //                 },

            //             ]
            //         },

            //     ]
            // },

        ];
    }
}
