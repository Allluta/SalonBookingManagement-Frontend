import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8080/message'; 

  constructor(private http: HttpClient) {}

  sendEmailNewsletter(email: string): Observable<any> {
    const url = `${this.baseUrl}`; 

    return this.http.post(url, { email });
  }

 
}
