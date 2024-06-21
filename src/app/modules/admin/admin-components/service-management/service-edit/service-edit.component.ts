import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/auth/services/service/service.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {
  serviceForm: FormGroup;
  serviceId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private fb: FormBuilder
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.serviceId = params['id']; // Pobieramy identyfikator usługi z parametrów ścieżki
      this.loadService(this.serviceId); // Ładujemy dane usługi do formularza
    });
  }

  loadService(id: number) {
    this.serviceService.getServiceById(id).subscribe(
      (data) => {
        this.serviceForm.setValue({
          name: data.name,
          description: data.description,
          price: data.price,
          duration: data.duration
        });
      },
      (error) => {
        console.error('Błąd podczas pobierania usługi', error);
      }
    );
  }

  updateService() {
    if (this.serviceForm.valid) {
      const formData = this.serviceForm.value;
      this.serviceService.updateService(this.serviceId, formData).subscribe(
        () => {
          console.log('Zaktualizowano usługę', formData);
          this.router.navigate(['admin/dashboard']); // Przekierowanie na stronę główną admina po zakończeniu edycji
        },
        (error) => {
          console.error('Błąd podczas aktualizacji usługi', error);
          // Obsługa błędu, np. wyświetlenie komunikatu.
        }
      );
    }
  }
}
