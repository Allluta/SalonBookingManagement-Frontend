import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/auth/services/service/service.service';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.scss']
})
export class ServiceTableComponent implements OnInit {
  services: any[]; // Zmień typ danych na odpowiadający Twojemu modelowi usługi

  constructor(
    private serviceService: ServiceService,
    private router: Router
    ) {}

  ngOnInit() {
    this.serviceService.getServices().subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        console.error('Błąd podczas pobierania usług', error);
        // Obsługa błędu, np. wyświetlenie komunikatu.
      }
    );
  }
  loadServices() {
    this.serviceService.getServices().subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        console.error('Błąd podczas pobierania usług', error);
        // Obsługa błędu, np. wyświetlenie komunikatu.
      }
    );
  }


  editService(service: any) {
    this.router.navigate(['admin/editService', service.id]);
  }

  deleteService(service: any) {
    // Tutaj obsłuż akcję usunięcia
    const confirmed = window.confirm('Czy na pewno chcesz usunąć tę usługę?');
    if (confirmed){
    this.serviceService.deleteService(service.id).subscribe(
      () => {
        console.log('Usunięto usługę', service);
        this.loadServices(); // Zaktualizuj listę usług po usunięciu
      },
      (error) => {
        console.error('Błąd podczas usuwania usługi', error);
        // Obsługa błędu, np. wyświetlenie komunikatu.
      }
    );
    }
  }

}
