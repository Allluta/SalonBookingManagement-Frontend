import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class HairdresserService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(
    private http: HttpClient) {}

  addHairdresser(data: any) {
    return this.http.post(`${this.baseUrl}/hairdressers`, data);
  }

  getAllHairdressers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hairdressers`);
  }
  deleteHairdresser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/hairdressers/${id}`);
  }
  getHairdresserById(id: number): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}/hairdressers/${id}`);
  }
  updateHairdresser(data: any): Observable<any> {
    const id = data.id; 
    return this.http.put(`${this.baseUrl}/hairdressers/${id}`,data);
  }
  verifyPassword(hairdresserId: number, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/hairdressers/verifyPassword`, { id: hairdresserId, password });
  }
  
  addReviewToHairdresser(hairdresserId: number, reviewData: any): Observable<any> {
    const addReviewUrl = `${this.baseUrl}/reviews/add/${hairdresserId}`;
    
    return this.http.post<any>(addReviewUrl, reviewData);
  }

}