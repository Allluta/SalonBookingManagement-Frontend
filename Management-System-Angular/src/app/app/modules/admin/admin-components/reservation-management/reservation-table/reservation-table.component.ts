import { forkJoin } from 'rxjs';
import { ReservationService } from 'src/app/auth/services/reservation/reservation.service';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';
import { ServiceService } from 'src/app/auth/services/service/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent implements OnInit {
  reservations: any[];
  hairdressers: any[];
  selectedHairdresserId: string = '';
filteredReservations: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private hairdresserService: HairdresserService,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.reservationService.getAllReservations().subscribe(
      (response) => {
        this.reservations = response;

        // Zbierz wszystkie obserwable zapytań do serwisów
        const hairdresserObservables = this.reservations.map(reservation =>
          this.hairdresserService.getHairdresserById(reservation.hairdresserId)
        );
        this.hairdresserService.getAllHairdressers().subscribe(
          (hairdressers) => {
            this.hairdressers = hairdressers;
          },
          (error) => {
            console.error('Błąd podczas pobierania danych o fryzjerach', error);
          }
        );

        const serviceObservables = this.reservations.map(reservation =>
          this.serviceService.getServiceById(reservation.serviceId)
        );

        // Uruchom oba zestawy zapytań równocześnie
        forkJoin(hairdresserObservables).subscribe(hairdressers => {
          // Przypisz otrzymane dane o fryzjerze do rezerwacji
          hairdressers.forEach((hairdresser, index) => {
            this.reservations[index].hairdresserInfo = hairdresser;
          });
        });

        forkJoin(serviceObservables).subscribe(services => {
          // Przypisz otrzymane dane o usłudze do rezerwacji
          services.forEach((service, index) => {
            this.reservations[index].serviceInfo = service;
          });
        });
      },
      (error) => {
        console.error('Błąd podczas pobierania rezerwacji', error);
      }
    );
  }

  searchByHairdresser() {
    if (this.selectedHairdresserId) {
      this.filteredReservations = this.reservations.filter(
        (reservation) => reservation.hairdresserId === this.selectedHairdresserId
      );
    } else {
      this.filteredReservations = this.reservations;
    }
  }
  
  resetSearch() {
    this.selectedHairdresserId = '';
    this.filteredReservations = this.reservations;
  }
}
