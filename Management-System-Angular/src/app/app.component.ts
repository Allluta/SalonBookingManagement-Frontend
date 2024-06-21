import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';
import { NotificationService } from './auth/services/notification/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from './auth/services/message/message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Salon Fryzjerski Aura';
  currentRoute: string;
  emailForm: FormGroup;
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private messageService: MessageService


  ) { this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.currentRoute = event.url;
    }
  });}

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  isAdminLoggedIn: boolean;
  isUserLoggedIn: boolean;
  isHairdresserLoggedIn: boolean;

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.updateUserLoggedStatus();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedStatus();
      }
    });
  }

  private updateUserLoggedStatus(): void {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
    this.isHairdresserLoggedIn = StorageService.isHairdresserLoggedIn();
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl('/login');
  }

  navigateToHome() {
    this.router.navigate(['/']); 
  }

  isPaymentPage(): boolean {
    return this.router.url.includes('platnosc/:reservationId');
  }

 sendEmail() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;

      
      this.messageService.sendEmailNewsletter(email).subscribe(
        (response) => {
          console.log('Odpowiedź od backendu:', response);
          this.snackBar.open('Zapisano do newslettera!', 'Zamknij', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        (error) => {
          console.error('Błąd podczas zapisywania do newslettera', error);
          this.snackBar.open('Błąd podczas zapisywania do newslettera', 'Zamknij', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );

      
      this.emailForm.reset();
    }
  }

 

  }

