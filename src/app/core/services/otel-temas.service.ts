import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OtelTemasOption } from '../models/Otel-Temas/OtelTemasOption';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtelTemasService {

 private apiUrl = '/api/meal-board-options'; // API URL'si
 
 
   private otelTemasOptions: OtelTemasOption[] = [
     { id: 1, name: "Tema 1" },
     { id: 2, name: "Tema 2" },
     
   ];
 
   constructor(private http: HttpClient) { }

   getOtelTemasOptions(): Observable<OtelTemasOption[]> {
     return of(this.otelTemasOptions);
   }
}
