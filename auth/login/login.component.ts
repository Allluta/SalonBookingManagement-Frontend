import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { __values } from 'tslib';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup | undefined;
  validateForm: any;
  errorMessage: string = '';
  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private storageService: StorageService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(this.loginForm.value);

    this.service.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value,
    ).pipe(
      catchError(error => {
        
        console.error('Błąd logowania:', error);

        
        this.errorMessage = 'Nieprawidłowe dane logowania. Prosimy spróbować ponownie.';

        
        return throwError('Nieprawidłowe dane logowania');
      })
      ).subscribe(response => {
      console.log("response :  ", response); 

      const userData = StorageService.getUser();
      console.log(userData);
      console.log(response.body.userId);
     
      this.authService.setLoggedInUserEmail(response.body.email);
  console.log("Logged in user email: ", this.authService.getUserEmail());
    
      if (StorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl("admin/dashboard");
      } else if (StorageService.isUserLoggedIn()) {
        this.router.navigateByUrl("user/dashboard");
      } else if (StorageService.isHairdresserLoggedIn()) {
        console.log('Zalogowano jako fryzjer.');  
              this.router.navigateByUrl(`hairdresser/dashboard/${userData.hairdresser_id}`);
              this.errorMessage = '';
        
      const hairdresserId = response.body.hairdresser_id;
      console.log('Received hairdresserId:', hairdresserId);
      this.storageService.setHairdresserId(hairdresserId);

  

      //this.goToIndividualProfile(hairdresserId);
    }
    
    }
      
    )}
    goToIndividualProfile(hairdresserId: number) {
      this.router.navigate(['hairdresser/profile', hairdresserId.toString()]);
    }
  }
  
