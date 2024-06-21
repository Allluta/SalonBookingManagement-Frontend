import { Component, OnInit, ChangeDetectorRef , NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';
import { ReservationService } from 'src/app/auth/services/reservation/reservation.service';
import { NotificationService } from 'src/app/auth/services/notification/notification.service';
import { forkJoin } from 'rxjs';
import { ClientAppearanceDialogComponent } from 'src/app/modules/hairdresser/hairdresser-component/client-appearance-dialog/client-appearance-dialog.component';
@Component({
  selector: 'app-hairdresser-profile',
  templateUrl: './hairdresser-profile.component.html',
  styleUrls: ['./hairdresser-profile.component.scss']
})
export class HairdresserProfileComponent implements OnInit {
  hairdresserId: number;
  hairdresserData: any;
  userRole: string;
  hairdresserInfo: any = {};
  upcomingReservations: any[];
  intervalId: any;
  pendingReservations: any[];
  completedReservations: any[];
  canceledReservations: any[];
  clientPresenceConfirmation: { [key: number]: boolean } = {};

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hairdresserService: HairdresserService,
    private reservationService: ReservationService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      const hairdresserId = +params['hairdresser_id'];
      this.loadHairdresserInfo(hairdresserId);
      this.hairdresserId = hairdresserId;
      this.loadReservations(hairdresserId);
      this.refreshView();
    });

    
  }

  loadReservations(hairdresserId) {
    this.reservationService.getHairdresserAllReservations(this.hairdresserId).subscribe(
      allReservations => {
        this.pendingReservations = allReservations.filter(reservation => reservation.status === 'Niepotwierdzona');
        this.upcomingReservations = allReservations.filter(
          reservation => reservation.status === 'Zatwierdzona' && new Date(reservation.date) > new Date()
        );
        this.completedReservations = allReservations.filter(
          reservation => (reservation.status === 'Zatwierdzona' && new Date(reservation.date) < new Date()) || reservation.status==='Odbyta'
        );
        this.canceledReservations = allReservations.filter(
          reservation => reservation.status === 'Zrezygnowano' || reservation.status === 'Odrzucona' || reservation.status === 'Nieodbyta'
        );
        this.refreshView();
      },
      error => {
        console.error('Error loading reservations', error);
        
      }
    );
  }
  private refreshView() {
    this.ngZone.run(() => this.cdRef.detectChanges());
  }



  loadHairdresserInfo(hairdresserId: number) {
    this.hairdresserService.getHairdresserById(hairdresserId).subscribe(data => {
      this.hairdresserInfo = data;
    });
  }


  

  acceptReservation(reservation: any) {
    reservation.status = 'Zatwierdzona';
    this.reservationService.updateReservation(reservation).subscribe(() => {
      this.refreshView();
    });
  }

  rejectReservation(reservation: any) {
    reservation.status = 'Odrzucona';
    this.reservationService.updateReservation(reservation).subscribe(() => {
      this.refreshView();
    });
  }

  cancelReservation(reservation: any) {
  
    const confirmed = window.confirm('Czy na pewno chcesz zrezygnować?');

    if (confirmed) {
      reservation.status = 'Odrzucona';
      this.reservationService.updateReservation(reservation).subscribe(() => {
     
        this.loadReservations(this.hairdresserId);
      });
    }
    this.refreshView();
  }

  confirmClientPresence(reservation: any, isPresent: boolean) {
    reservation.isClientPresent = isPresent;
  
    if (!isPresent) {
    
      reservation.clientDidNotAppear = true;
    }
  
    
    this.clientPresenceConfirmation[reservation.id] = isPresent;
  
    
    this.reservationService.updateReservation(reservation).subscribe(() => {
      this.loadReservations(this.hairdresserId);
    });
  }
  confirmClientAppearance(reservation: any) {
    const confirmed = window.confirm('Czy klient się pojawił?');
  
    if (confirmed) {
      reservation.isClientPresent = true;
      reservation.status = 'Odbyta';
  
      this.reservationService.updateReservation(reservation).subscribe(() => {
        this.loadReservations(this.hairdresserId);
      });
    }
  }
  confirmClient(reservation: any) {
    const confirmed = window.confirm('Klient się nie pojawił');
  
    if (confirmed) {
      reservation.isClientPresent = false;
      reservation.status = 'Nieodbyta';
  
      this.reservationService.updateReservation(reservation).subscribe(() => {
        this.loadReservations(this.hairdresserId);
      });
    }
}
}
