// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentUrl = 'http://localhost:8080/payment';

  constructor(private http: HttpClient) {}

  createPaymentIntent(): Observable<any> {
    return this.http.post<any>(`${this.paymentUrl}/create-payment-intent`, {});
  }
  processPayment(paymentData: any): Observable<any> {
   
    return this.http.post<any>(`${this.paymentUrl}/process-payment`, paymentData);
  }
}
