import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private apiUrl = 'https://localhost:7275/api/Contracts'; // API'nin URL'i

  constructor(private http: HttpClient) {}

  saveContract(contractData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contractData);
  }
}
