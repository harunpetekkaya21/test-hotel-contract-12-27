import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoardType } from '../models/Board-Type/BoardType';

@Injectable({
  providedIn: 'root'
})
export class BoardTypeService {

   constructor(private http: HttpClient) { }
 
   
 
 
   // getAvailableRoomTypes(): Observable<any[]> {
   //   return this.http.get<any[]>('/api/room-types'); // API endpoint'i değiştirin
   // }
   getBoardTypes(): Observable<BoardType[]> {
     return of([
       { name: 'Board Type 1', id:1},
       { name: 'Board Type 2', id:2},
       { name: 'Board Type 3', id:3}
     ]);
   }
 
   
  
}
