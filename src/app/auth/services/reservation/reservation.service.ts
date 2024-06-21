// reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/reservations'; 

  constructor(private http: HttpClient) {}

  getUserReservations(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userEmail}`);
  }

  getReservation(reservationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reservationId}`);
  }

  getAllReservations(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}`)

}
  getHairdresserUpcomingReservations(hairdresserId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hairdresser/${hairdresserId}/upcoming`);
  }
  getHairdresserCompletedReservations(hairdresserId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hairdresser/${hairdresserId}/completed`);
  }


checkAvailability(hairdresserId: number, date: string, time: string): Observable<boolean> {
    const url = `${this.apiUrl}/check-availability?hairdresserId=${hairdresserId}&date=${date}&time=${time}`;

    return this.http.get<boolean>(url);
  }

  createReservation(request: any): Observable<any> {
    
    request.status = 'Niepotwierdzona';

    return this.http.post<any>(this.apiUrl, request);
  }

  updateReservation(reservation: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/${reservation.id}`; 

    return this.http.put<any>(updateUrl, reservation);
  }

  cancelReservation(reservationId: number): Observable<any> {
    const cancelUrl = `${this.apiUrl}/cancel/${reservationId}`;
    return this.http.put<any>(cancelUrl, {});
  }

  checkAvailabilityAndCreate(request: any): Observable<boolean> {
    return this.checkAvailability(
      request.hairdresserId,
      request.date,
      request.time
    );
  }

  getHairdresserAllReservations(hairdresserId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hairdresser/${hairdresserId}/all`);
  }
  

}


