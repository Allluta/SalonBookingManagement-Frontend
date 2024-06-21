import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/auth/services/service/service.service';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PaymentService } from 'src/app/auth/services/payment/payment.service';
import { DatePipe, formatDate } from '@angular/common';
import { ReservationService } from 'src/app/auth/services/reservation/reservation.service';
import { ChangeDetectorRef } from '@angular/core';
import { InterestDialogComponent } from '../interest-dialog/interest-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/auth/services/notification/notification.service';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  Data: any = {
    date: null,
    time: null,
    serviceId: null,
    hairdresserId: null,
  
  };

  availableTimes: string[] = [];
  timeInterval = 30;
  serviceName: string = '';
  hairdresserName: string = '';
  userEmail: string;
  userPhoneNumber: String;
  minDate: Date;
  selectedService: any;
  services: any[];
  errorMessage: string;
  @ViewChild('dateForm') dateForm: any;

  isInterested: boolean = false;

  dateFilter = (date: Date | null): boolean => {
    const day = (date || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private serviceService: ServiceService,
    private hairdresserService: HairdresserService,
    private authService: AuthService,
    private paymentService: PaymentService,
    private datePipe: DatePipe,
    private reservationService : ReservationService,
    private cdr: ChangeDetectorRef,
    private dialog : MatDialog,
    private notificationService : NotificationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.Data.serviceId = +params['serviceId'];
      this.Data.hairdresserId = +params['hairdresserId'];

      this.serviceService.getServiceById(this.Data.serviceId).subscribe((service) => {
        this.serviceName = service.name; 
        this.selectedService = service;
        this.Data.duration = service.duration;
        this.generateAvailableTimes();
      });

      this.hairdresserService.getHairdresserById(this.Data.hairdresserId).subscribe((hairdresser) => {
        this.hairdresserName = hairdresser.name;
      });

      this.userEmail = this.authService.getUserEmail();
      this.userPhoneNumber = this.authService.getUserPhoneNumber();

      this.minDate = new Date();
      this.minDate.setDate(this.minDate.getDate() + 1);
      this.minDate.setHours(0, 0, 0, 0);
    });
  }

  generateAvailableTimes() {
    this.availableTimes = [];
  
    const maxHour = 16 - Math.floor(this.selectedService.duration / 60);
  
    for (let hour = 7; hour <= maxHour; hour++) {
      for (let minute = 0; minute < 60; minute += this.timeInterval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.availableTimes.push(time);
      }
    }
  }

  submitForm() {
    if (this.Data.date && this.Data.time) {
      const formattedDate = this.datePipe.transform(this.Data.date, 'yyyy-MM-dd');
  
      const reservationData = {
        serviceId: this.Data.serviceId,
        hairdresserId: this.Data.hairdresserId,
        date: formattedDate,
        time: this.Data.time,
        email: this.userEmail,
        phoneNumber: this.userPhoneNumber,
        serviceName: this.serviceName,
        hairdresserName: this.hairdresserName,
      };
  
      const backendUrl = 'http://localhost:8080/reservations';
      this.http.post<{ id: number }>(backendUrl, reservationData)
        .subscribe((response) => {
          const reservationId = response.id;
          console.log('Rezerwacja zapisana pomyślnie!', response);
  
          this.paymentService.createPaymentIntent().subscribe(
            paymentResponse => {
              const clientSecret = paymentResponse.clientSecret;
  
              const paymentUrl = `/platnosc/${reservationId}`;
              this.router.navigate([paymentUrl]);
            },
            paymentError => {
              console.error('Błąd pobierania danych płatności', paymentError);
            }
          );
        }, (error) => {
          console.error('Błąd podczas zapisywania rezerwacji', error);
          this.errorMessage = 'Niestety w wybranym przez Pana/Panią terminie fryzjer jest zajęty. Prosimy wybrać inny termin :)  ';
        });
    } else {
      console.log('Proszę wybrać datę i godzinę.');
    }
  }

  private checkAvailabilityAndReserve() {
    this.reservationService.checkAvailabilityAndCreate(this.Data).subscribe(isAvailable => {
      if (isAvailable) {
        this.reserveAppointment();
      } else {
        console.log('Dana usługa w wybranym terminie jest niedostępna. Proszę wybrać inny termin.');
        console.log('User Email (before):', this.userEmail); 
        this.showInterestDialog();
      }
    });
  }

  showInterestDialog() {
    
    const dialogRef = this.dialog.open(InterestDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'interested') {
        this.isInterested = true;
        
        this.notificationService.registerInterest(this.userEmail).subscribe(
          (response) => {
            console.log('User Email (after):', this.userEmail); 
            console.log('Zainteresowanie zapisane pomyślnie!', response);
          },
          (error) => {
            console.error('Błąd podczas zapisywania zainteresowania', error);
          }
        );
      } else {
        this.isInterested = false;
      }
    });
  }
  private reserveAppointment() {
    this.submitForm();
  }
  resetForm() {
    this.errorMessage = ''; 
    this.dateForm.resetForm(); 
    this.cdr.detectChanges(); 
}
resetAndShowInterest() {
  this.resetForm();
  this.showInterestDialog();
}

}
