import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('./dashboard/dashboard.component').then(m=>m.DashboardComponent),
        
    },
    {
      path: 'rooms',
      loadChildren: () =>
        import('./rooms/rooms.routes').then(m => m.ROOMS_ROUTES),
        
    },
    {
      
      path: 'contracts',
      loadChildren: () =>
        import('./contracts/contracts.routes').then(m => m.CONTRACTS_ROUTES),
        
    },
    {
      
      path: 'settings',
      loadChildren: () =>
        import('./settings/settings.routes').then(m => m.SETTINGS_ROUTES),
        
    },
   
   
  ];
