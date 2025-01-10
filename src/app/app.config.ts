import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { RoomTypeService } from './core/services/room-type.service';

export const appConfig: ApplicationConfig = {
  providers: [
   provideHttpClient(),
    provideRouter(routes,withPreloading(PreloadAllModules)),
    provideAnimations(),
    RoomTypeService
 
  ]
};