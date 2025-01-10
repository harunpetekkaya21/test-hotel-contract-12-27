import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [

  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then(m => m.ProfileComponent),

  },

];
