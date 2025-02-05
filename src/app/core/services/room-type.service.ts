import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SimpleRoomType } from '../models/Room-Type/SimpleRoomType';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  constructor(private http: HttpClient) { }

  private simpleRoomTypes: SimpleRoomType[] = [
    { id: '1', name: 'Single Room' },
    { id: '2', name: 'Double Room' },
    { id: '3', name: 'Suite' },
    { id: '4', name: 'Family Room' },
    { id: '5', name: 'Penthouse' }
  ];


  // getAvailableRoomTypes(): Observable<any[]> {
  //   return this.http.get<any[]>('/api/room-types'); // API endpoint'i değiştirin
  // }
  getAvailableRoomTypes(): Observable<any[]> {
    return of([
      { name: 'Promo Room', capacity: 3, childCapacity: 2, basePrice: 100 },
      { name: 'Standard Room', capacity: 2, childCapacity: 2, basePrice: 150 },
      { name: 'Superior Room', capacity: 5, childCapacity: 3, basePrice: 200 },
    ]);
  }

  getSimpleRoomTypes(): Observable<SimpleRoomType[]> {
    return of(this.simpleRoomTypes);
  }
}


