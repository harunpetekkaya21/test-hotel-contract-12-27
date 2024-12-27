import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
       
        loadComponent: () =>
          import('./layouts/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
        loadChildren: () =>
          import('./modules/users/user.routes').then(m => m.USER_ROUTES)
      },
];
