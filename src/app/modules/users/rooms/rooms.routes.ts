import { Routes } from '@angular/router';

export const ROOMS_ROUTES: Routes = [
    
    {
      path: 'create-new-room-type',
      loadComponent: () =>
        import('./room-create/room-create.component').then(m=>m.RoomCreateComponent),
        
    },

    {
      path: 'list-room-type',
      loadComponent: () =>
        import('./room-list/room-list.component').then(m=>m.RoomListComponent),
        
    },

    
   
   
  ];
