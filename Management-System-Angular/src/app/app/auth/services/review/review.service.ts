import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/reviews'; 

  constructor(private http: HttpClient) { }

  addReview(reservationId: number, hairdresserId: number, rating: number, comment: string): Observable<any> {
    const reviewData = { reservationId, hairdresserId, rating, comment };
    return this.http.post(`${this.apiUrl}/add`, reviewData);
  }
  doesReviewExistForReservation(reservationId: number): Observable<boolean> {
    const url = `${this.apiUrl}/exists/${reservationId}`;
    return this.http.get<boolean>(url);
  }
  editReview(reviewId: number, rating: number, comment: string): Observable<any> {
    const reviewData = { rating, comment };
    return this.http.put(`${this.apiUrl}/edit/${reviewId}`, reviewData);
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${reviewId}`);
  }
  getReviewByReservationId(reviewId: number): Observable<any> {
    const url = `${this.apiUrl}/reservation/${reviewId}`;
    return this.http.get(url);
  }
  getReviewByIdOrReservationId(reviewId: number): Observable<any> {
    const url = `${this.apiUrl}/reservation/${reviewId}`;
    return this.http.get(url);
  }
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
