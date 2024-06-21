import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { StorageService } from './storage/storage.service';


const BASIC_URL = ['http://localhost:8080/']
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userEmail: string = '';
  private loggedInUserId: number = 0;
  private loggedInUserEmail: string = '';
  private userPhoneNumber: string = '';

  constructor(
    private http: HttpClient,
    private storage: StorageService 
    
    ) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post(BASIC_URL+ 'authenticate', {
      email,
      password
    }, {observe: 'response', responseType: 'json'})
    .pipe(
      tap(__ => this.log("User Authentication")),
      map((res: HttpResponse<any>) =>{
        this.userEmail = res.body.email;
        this.loggedInUserId = res.body.userId;
        this.userPhoneNumber = res.body.phoneNumber;
        if (res.body.role === 'HAIRDRESSER') {
          this.storage.saveHairdresserId(res.body.hairdresser_id);
          this.storage.saveHairdresserInfo(res.body.hairdresserInfo)
        
        }
         this.storage.saveUser(res.body)
         const tokenLenght =res.headers.get(AUTH_HEADER).length;
         const bearerToken = res.headers.get(AUTH_HEADER).substring(7,tokenLenght);
         this.storage.saveToken(bearerToken);

         this.loggedInUserEmail = res.body.email;
        
         return res;
        }
    ))
  }

  log(message:string){
    console.log(message)
  }
  getUserEmail(): string {
    return this.userEmail;
  }
  getUserId(): number { 
    return this.loggedInUserId; 
  }

  registerUser(registrationData: any): Observable<any> {
    return this.http.post(BASIC_URL+ 'register', registrationData);
  }
  getLoggedInUserId(): number {
    return this.loggedInUserId; 
    
  }
  saveHairdresserId(hairdresserId: number) {
    this.storage.saveHairdresserId(hairdresserId);
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(BASIC_URL + 'reservation', reservationData, { observe: 'response' })
      .pipe(
        tap(__ => this.log("Creating Reservation")),
        map((res: HttpResponse<any>) => {

          return res;
        })
      );
  }

  setLoggedInUserEmail(email: string) {
    this.loggedInUserEmail = email;
  }

  getUserPhoneNumber(): string {
    return this.userPhoneNumber;
  }
  getCurrentUserEmail(): string {
    return this.loggedInUserEmail;
  }
  
}