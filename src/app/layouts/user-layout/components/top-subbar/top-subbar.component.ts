import { Component, ElementRef, OnInit } from '@angular/core';
import { UserLayoutService } from '../../services/user.layout.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-top-subbar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './top-subbar.component.html',
    styleUrl: './top-subbar.component.scss'
})
export class TopSubBarComponent implements OnInit {
    model: any[] = [];
    constructor(public layoutService: UserLayoutService, public elel: ElementRef) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    { label: 'Dashboard', icon: 'fa fa-home', routerLink: [''] }
                ]
            },

            // {

            //     label: 'Roooms',
            //     icon: 'fa fa-bed',
            //     items: [

            //         {
            //             label: 'Room Type List',
            //             icon: 'fa fa-list',
            //             routerLink: ['rooms/list-room-type']
            //         },
            //         {
            //             label: 'Create New Room Type',
            //             icon: 'fa fa-square-plus',
            //             routerLink: ['rooms/create-new-room-type']
            //         }
            //     ]

            // },
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
            // {

            //     label: 'Settings',
            //     icon: 'fa fa-cog',
            //     items: [
            //         {
            //             label: '',
            //             icon: '',
            //             routerLink: ['']
            //         },

            //     ]

            // },

            {
                label: 'My Facility',
                icon: 'fa fa-hotel',
                items: [
                    { label: 'My Facility', icon: 'fa fa-hotel', routerLink: ['my-facility'] }
                ]
            },
            {
                label: 'Promotions',
                icon: 'fa fa-percent',
                items: [
                    { label: 'Promotions Management', icon: 'fa fa-gears', routerLink: ['promotions'] }
                ]
            },
            {
                label: 'Stop-Sales',
                icon: 'fa fa-stop',
                items: [
                    { label: 'Create Stop-Sales', icon: 'fa fa-plus', routerLink: ['stop-sales'] }
                ]
            },
            // {
            //     label: 'Actions',
            //     icon: 'fa fa-hexagon-nodes',
            //     items: [
            //         { label: 'Create Actions', icon: 'fa fa-plus', routerLink: ['actions'] }
            //     ]
            // },

        ];
    }
}
