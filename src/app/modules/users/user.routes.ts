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
    {
      
      path: 'my-facility',
      loadComponent: () =>
        import('./my-facility/my-facility.component').then(m => m.MyFacilityComponent),
        
    },

    {
      
      path: 'promotions',
      loadComponent: () =>
        import('./promotions/promotions.component').then(m => m.PromotionsComponent),
        
    },

    {
      
      path: 'stop-sales',
      loadComponent: () =>
        import('./stop-sales/stop-sales.component').then(m => m.StopSalesComponent),
        
    },

    {
      
      path: 'actions',
      loadComponent: () =>
        import('./actions/actions.component').then(m => m.ActionsComponent),
        
    },
   
   
  ];
