import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { RoomTypeService } from './core/services/room-type.service';
import { PriceCalculationService } from './core/services/contract/price-calculation.service';
import { MessageService } from 'primeng/api';
import { MealsService } from './core/services/meals.service';

export const appConfig: ApplicationConfig = {
  providers: [
   provideHttpClient(),
   MessageService,
    provideRouter(routes,withPreloading(PreloadAllModules)),
    provideAnimations(),
    MealsService,
    RoomTypeService,
    PriceCalculationService
 
  ]
};