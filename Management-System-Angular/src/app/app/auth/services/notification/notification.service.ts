import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);
  }
  getNotificationsByDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map((notifications: any[]) => notifications.filter(notification => notification.date === date))
      );
  }

  getNotificationsForUser(userEmail: string): Observable<any[]> {
    const url = `${this.apiUrl}/user/${userEmail}`;
    return this.http.get<any[]>(url)
  }
  
  registerInterest(userEmail: string): Observable<any> {
    const url = `${this.apiUrl}/interest`;
    const requestData = { userEmail };
    return this.http.post<any>(url, requestData);
  }
}
