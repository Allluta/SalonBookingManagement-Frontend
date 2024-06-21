import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://localhost:8080'; 
  private selectedServiceId: number;
  constructor(private http: HttpClient) {}

  addService(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/services`, data);
  }

  
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services`);
  }


  getServiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/services/${id}`);
  }

  
  updateService(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/services/${id}`, data);
  }

  
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/services/${id}`);
  }

  

}