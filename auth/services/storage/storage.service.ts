import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';


const USER = "User";
const TOKEN = "Token";
const HAIRDRESSER_ID = 'HairdresserId';
const HAIRDRESSER_INFO = 'HairdresserInfo';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user:any){
window.localStorage.removeItem(USER);
window.localStorage.setItem(USER,JSON.stringify(user))
  }

  public saveToken(token:string){

  window.localStorage.removeItem(TOKEN);
  window.localStorage.setItem(TOKEN,token)
  }

  static getToken() : string{
    return window.localStorage.getItem(TOKEN);

  }
   static getUser():any{
  return JSON.parse(localStorage.getItem(USER))

   } 

   static hasToken() : boolean{
    if(this.getToken()=== null){
      return false;
    }
     return true;
   }




  static getUserRole(): string{
   const user =this.getUser();
   if(user == null){
   return '';
}
return user.role;
  }
  
  static isAdminLoggedIn(): boolean {
    if(this.getToken()==null){
      return false;
    }
    const role:string =this.getUserRole();

    return role =='ADMIN';
  }

  static isUserLoggedIn() : boolean{
    if(this.getToken()==null){
      return false;
    }
    const role:string =this.getUserRole();

    return role =='USER';
  }

  static isHairdresserLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
  
    return role === 'HAIRDRESSER';
  }

  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
  public saveHairdresserId(hairdresserId: number) {
    window.localStorage.removeItem(HAIRDRESSER_ID);
    window.localStorage.setItem(HAIRDRESSER_ID, hairdresserId.toString());
  }

  
  public getHairdresserId(): number {
    const hairdresserId = window.localStorage.getItem(HAIRDRESSER_ID);
    return hairdresserId ? parseInt(hairdresserId, 10) : 0;
  }
  public setHairdresserId(hairdresserId: number) {
    window.localStorage.setItem(HAIRDRESSER_ID, hairdresserId.toString());
  }

  public saveHairdresserInfo(hairdresserInfo: any) {
    window.localStorage.removeItem(HAIRDRESSER_INFO);
    window.localStorage.setItem(HAIRDRESSER_INFO, JSON.stringify(hairdresserInfo));
  }
  public getHairdresserInfo(): any {
    const hairdresserInfo = window.localStorage.getItem(HAIRDRESSER_INFO);
    return hairdresserInfo;
  }

  
}