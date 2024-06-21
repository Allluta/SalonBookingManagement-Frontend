import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/auth/services/service/service.service';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PaymentService } from 'src/app/auth/services/payment/payment.service';
import {  formatDate } from '@angular/common';
import { ReservationService } from 'src/app/auth/services/reservation/reservation.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-change-reservation-date-model',
  templateUrl: './change-reservation-date-model.component.html',
  styleUrls: ['./change-reservation-date-model.component.scss']
})
export class ChangeReservationDateModelComponent  implements OnInit {
  @Input() isVisible: boolean;
  @Output() onClose = new EventEmitter();
  @Output() onChangeDate = new EventEmitter<string>();
  @Input() selectedReservation: any;

  Data: any = {
    date: null,
    time: null,
    serviceId: null,
    hairdresserId: null,
  
  };

  newDate: string;
  minDate: Date;

  availableTimes: string[] = [];
  timeInterval = 30;
  serviceName: string = '';
  hairdresserName: string = '';
  userEmail: String;
  userPhoneNumber: String;
  selectedService: any;
  services: any[];
  errorMessage: string;
  @ViewChild('dateForm') dateForm: any;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private serviceService: ServiceService,
    private hairdresserService: HairdresserService,
    private authService: AuthService,
    private paymentService: PaymentService,
    private datePipe: DatePipe,
    private reservationService : ReservationService,
    private cdr: ChangeDetectorRef) {}

 ngOnInit() {
        this.generateAvailableTimes();

      this.minDate = new Date();
      this.minDate.setDate(this.minDate.getDate() + 1);
      this.minDate.setHours(0, 0, 0, 0);
    
  }
  generateAvailableTimes() {
    this.availableTimes = [];

    const maxHour = 16;

    for (let hour = 7; hour <= maxHour; hour++) {
        for (let minute = 0; minute < 60; minute += this.timeInterval) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            this.availableTimes.push(time);
        }
    }

    
    console.log('Dostępne godziny po wygenerowaniu:', this.availableTimes);
}

changeDate(): void {
    
    const formattedDate = this.datePipe.transform(this.newDate, 'yyyy-MM-dd');

    
    console.log('Zmiana daty - przed generowaniem godzin');
    
   
    this.generateAvailableTimes();

    
    console.log('Zmiana daty - po generowaniu godzin');

    
    console.log('Wybrana data (przed formatowaniem):', this.newDate);
    console.log('Wybrana data (sformatowana):', formattedDate);

   
    this.onChangeDate.emit(formattedDate);
    
    this.closeModal();

    
    this.cdr.detectChanges();
}
  closeModal(): void {
    
    this.onClose.emit();
  }
  dateFilter = (date: Date | null): boolean => {
    const day = (date || new Date()).getDay();
    return day !== 0 && day !== 6;
  }
  
    
}