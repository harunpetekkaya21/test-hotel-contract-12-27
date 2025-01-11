import { Routes } from '@angular/router';

export const CONTRACTS_ROUTES: Routes = [
    
    {
      
      path: 'create-new-contract',
      loadComponent: () =>
        import('./contract-create/contract-create.component').then(m=>m.ContractCreateComponent),
      // canDeactivate: [canDeactivateGuard],
        
    },
    {
      
      path: 'list-contracts',
      loadComponent: () =>
        import('./contract-list/contract-list.component').then(m=>m.ContractListComponent),
      // canDeactivate: [canDeactivateGuard],
        
    },

    
   
   
  ];
