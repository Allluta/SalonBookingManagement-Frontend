import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup ;
  //validateForm: any;
  errorMessage: string = '';

  constructor(
    private service: AuthService,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.registrationForm = this.fb.group({
    Name: ['', [Validators.required]],
    email: ['',Validators.required],
    password: ['',Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
  
})
  }
   register(){
    if (this.registrationForm.invalid) {
      return;
    }

    
    const registrationData = {
      name: this.registrationForm.value.Name,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      phoneNumber: this.registrationForm.value.phoneNumber,
      role : 1
    };

    this.service.registerUser(registrationData).subscribe(
      (response: any) => {
        console.log('Odpowiedź od serwera:', response);
        if (response && response.message === 'Registration successful') {
          this.errorMessage = 'Zarejestrowano pomyślnie.' +
          '\nProszę przejdź do zakładki logowania :) ';
        } else {
          this.errorMessage = 'Błąd rejestracji: ' + response.message;
        }
      },
      (error) => {
        console.error('Błąd rejestracji:', error);
        this.errorMessage = 'Użytkownik o podanym adresie e-mail już istnieje.'+
        '\nProsimy skorzystać z innego  adresu e-mail. ';
      }
    );
  }
}
