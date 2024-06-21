import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/auth/services/reservation/reservation.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';
import { ServiceService } from 'src/app/auth/services/service/service.service';
import { DatePipe } from '@angular/common';
import { ChangeReservationDateModelComponent } from '../change-reservation-date-model/change-reservation-date-model.component';
import { ReviewModalComponent } from '../review-modal/review-modal.component';
 import { Router } from '@angular/router';
import { ReviewService } from 'src/app/auth/services/review/review.service';
 @Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  userReservations: any[];
  reservationUpdated: boolean = false;

  pendingReservations: any[] = [];
  upcomingReservations: any[] = [];
  completedReservations: any[] = [];
  canceledReservations: any[] = [];

  isChangeDateModalVisible: boolean = false;
  selectedReservationForDateChange: any;

  isReviewModalVisible: boolean = false;
  reviewModalData: any;

  isReviewSectionVisible: boolean = false;
  selectedReservationForReview: any;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private hairdresserService: HairdresserService,
    private serviceService: ServiceService,
    private datePipe: DatePipe,
    private router: Router,
    private reviewService : ReviewService
  ) {}

  ngOnInit(): void {
    this.loadUserReservations();
  }
  changeReservationDate(reservation: any): void {
    this.selectedReservationForDateChange = reservation;
    this.isChangeDateModalVisible = true;

  }
  onCloseChangeDateModal(): void {
    this.isChangeDateModalVisible = false;
  }
  onChangeDateModal(newDate: string): void {
    const updatedReservation = { ...this.selectedReservationForDateChange };
    
    updatedReservation.date = this.datePipe.transform(new Date(newDate), 'yyyy-MM-dd');
    updatedReservation.status = 'Niepotwierdzona';
  
    this.reservationService.updateReservation(updatedReservation).subscribe(
      () => {
        console.log('Data rezerwacji pomyślnie zaktualizowana.');
        this.loadUserReservations();
      },
      (error) => {
        console.error('Błąd podczas aktualizacji daty rezerwacji:', error);
      }
    );
  
    this.isChangeDateModalVisible = false;
  }


  loadUserReservations(): void {
    const userEmail = this.authService.getCurrentUserEmail();

    this.reservationService.getUserReservations(userEmail).subscribe(reservations => {
      this.userReservations = reservations.map(reservation => ({
        ...reservation,
        infoDisplayed: false
      }));

      this.userReservations.forEach(reservation => {
        if (!reservation.infoDisplayed) {
          console.log('Data rezerwacji:', reservation.date);
          console.log('Godzina rezerwacji:', reservation.time);

          const dateString = reservation.date.split(' ')[0];
          const timeString = reservation.time;

          const [year, month, day] = dateString.split('-').map(Number);
          const [hours, minutes] = timeString.split(':').map(Number);

          const parsedDate = new Date(year, month - 1, day, hours, minutes);

          this.hairdresserService.getHairdresserById(reservation.hairdresserId).subscribe(hairdresser => {
             reservation.hairdresserInfo = hairdresser;
          });
          this.serviceService.getServiceById(reservation.serviceId).subscribe(service => {
             reservation.serviceInfo = service;
          });

          this.reviewService.doesReviewExistForReservation(reservation.id).subscribe(reviewExists => {
            console.log('Sprawdzanie opinii dla rezerwacji o ID:', reservation.id);
            if (reviewExists) {
              console.log('Rezerwacja o ID', reservation.id, 'ma opinie.');
              
              this.reviewService.getReviewByReservationId(reservation.id).subscribe(review => {
                reservation.reviewInfo = review;
              });
            } else {
              console.log('Rezerwacja o ID', reservation.id, 'nie ma opinii.');
            }
          });

          if (!isNaN(parsedDate.getTime())) {
            reservation.date = parsedDate;

            if (parsedDate.getTime() > new Date().getTime()) {
              const hoursRemaining = this.hoursRemainingUntilReservation(parsedDate, timeString);

              if (hoursRemaining < 24 && hoursRemaining > 0 && reservation.status === 'Zatwierdzona') {
                reservation.alertMessage = `Do rezerwacji zostało mniej niż 24 godziny. W celu rezygnacji lub zmiany terminu prosimy skontaktować się z salonem.`;
              }
            }
          } else {
            console.error('Invalid date or time format:', dateString, timeString);
          }

          reservation.infoDisplayed = true;
        }
      });

      this.pendingReservations = this.userReservations.filter(reservation => reservation.status === 'Niepotwierdzona');
      this.upcomingReservations = this.userReservations.filter(reservation => reservation.status === 'Zatwierdzona' && reservation.date.getTime() > new Date().getTime());
      this.completedReservations = this.userReservations.filter(reservation => (reservation.status === 'Zatwierdzona' || reservation.status === 'Odbyta') && reservation.date.getTime() < new Date().getTime());

this.completedReservations.forEach(reservation => {
  if (reservation.status === 'Odbyta') {
    console.log('Sprawdzanie opinii dla rezerwacji o ID:', reservation.id);
    if (reservation.reviewInfo) {
      console.log('Rezerwacja o ID', reservation.id, 'ma opinie.');
    } else {
      console.log('Rezerwacja o ID', reservation.id, 'nie ma opinii.');
    }
  }
});
      this.canceledReservations = this.userReservations.filter(reservation => reservation.status === 'Zrezygnowano' || reservation.status === 'Odrzucona' || reservation.status === 'Nieodbyta' );

      this.reservationUpdated = false;

    });
  }

  areReservationsAvailable(): boolean {
    return this.userReservations && this.userReservations.length > 0;
  }

  canModifyReservation(reservation: any): boolean {
    console.log('Data rezerwacji:', reservation.date);
    console.log('Godzina rezerwacji:', reservation.time);
    const isEditableStatus = reservation.status === 'Zatwierdzona' && this.isWithin24Hours(reservation.date, reservation.time);

    if (!isEditableStatus) {
      const hoursRemaining = this.hoursRemainingUntilReservation(reservation.date, reservation.time);
      console.log('Pozostało godzin do rezerwacji:', hoursRemaining);
    }

    return isEditableStatus;
  }



  hoursRemainingUntilReservation(date: string | Date, time: string): number {
    const reservationDateTime = date instanceof Date ? date : new Date(date);
    const currentDateTime = new Date();
    const differenceInMilliseconds = reservationDateTime.getTime() - currentDateTime.getTime();
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return differenceInHours;
  }

  isWithin24Hours(date: Date, time: string): boolean {
    const hoursRemaining = this.hoursRemainingUntilReservation(date, time);
    return hoursRemaining > 24;
  }

  shouldDisplayCancel(reservation: any): boolean {
    const isCancelableStatus = reservation.status === 'Zatwierdzona' && this.isWithin24Hours(reservation.date, reservation.time);
    return isCancelableStatus;
  }

  cancelReservation(reservation: any): void {
    this.reservationService.cancelReservation(reservation.id).subscribe(() => {
      console.log('Uzytkownik zrezygnował z rezerwacji:', reservation);
      this.reservationUpdated = true;
    });
  }

  updateReservationData(): void {
    this.loadUserReservations();
  }
  
  
 
  openReviewPage(reservation: any): void {
    const reservationId = reservation.id;
    const hairdresserId = reservation.hairdresserId
    console.log('Przekazywane ID rezerwacji:', reservationId);
  console.log('Przekazywane ID fryzjera:', hairdresserId);

    this.router.navigate(['/add-review', reservationId, hairdresserId]);
  }

  editReview(reservation: any): void {
    const reviewId = reservation.reviewInfo.id;
    this.router.navigate(['/edit-review', reviewId]);
  }
  
  deleteReview(reservation: any): void {
    const reviewId = reservation.reviewInfo.id;
  
    this.reviewService.deleteReview(reviewId).subscribe(
      () => {
        console.log('Opinia została usunięta.');
        
        this.updateReservationData();
      },
      (error) => {
        console.error('Błąd podczas usuwania opinii:', error);
      }
    );
  }

  openReviewSection(reservation: any): void {
    this.selectedReservationForReview = reservation;
    this.isReviewSectionVisible = true;
  }

  closeReviewSection(): void {
    this.isReviewSectionVisible = false;
  }



}
