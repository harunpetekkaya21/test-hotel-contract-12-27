import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MealBoardTypeOption } from '../models/meal-board-type/MealBoardTypeOption';


@Injectable({
  providedIn: 'root'
})
export class MealPlanAndBoarTypeServiceService {
  private apiUrl = '/api/meal-board-options'; // API URL'si


  private mealBoardOptions: MealBoardTypeOption[] = [
    { id: 1, name: "A'la Carte All Inclusive" },
    { id: 2, name: "Full Board" },
    { id: 3, name: "High Class All Inclusive" },
    { id: 4, name: "Prive All Inclusive" },
    { id: 5, name: "SOFT ALL INCLUSIVE" },
    { id: 6, name: "All Inclusive" },
    { id: 7, name: "FULL BOARD +" },
    { id: 8, name: "LUXURY ALL INCLUSIVE" },
    { id: 9, name: "Room Only" },
    { id: 10, name: "Ultra All Inclusive" },
    { id: 11, name: "Bed&Breakfast" },
    { id: 12, name: "Half Board" },
    { id: 13, name: "Luxury Ultra All Inclusive" },
    { id: 14, name: "Self Catering" },
    { id: 15, name: "Deluxe All Inclusive" },
    { id: 16, name: "Half Board +" },
    { id: 17, name: "Premium All Inclusive" },
  ];

  constructor(private http: HttpClient) { }

  // Meal board verilerini getirir
  // getMealBoardOptions(): Observable<MealBoardTypeOption[]> {
  //   return this.http.get<MealBoardTypeOption[]>(this.apiUrl);
  // }

  getMealBoardOptions(): Observable<MealBoardTypeOption[]> {
    return of(this.mealBoardOptions);
  }
}
