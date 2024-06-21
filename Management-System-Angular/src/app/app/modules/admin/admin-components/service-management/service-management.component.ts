import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/auth/services/service/service.service'; // Dostosuj import do poprawnej ścieżki
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss']
})
export class ServiceManagementComponent implements OnInit {
  serviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService, // Popraw import na serwis usług
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  addService() {
    if (this.serviceForm.valid) {
      const formData = this.serviceForm.value;
      this.serviceService.addService(formData).subscribe(
        (response) => {
          console.log('Dodano usługę', response);
          // Opcjonalnie, możesz dodać obsługę sukcesu, np. wyświetlenie komunikatu.
          this.router.navigate(['admin/dashboard']);
        },
        (error) => {
          console.error('Błąd podczas dodawania usługi', error);
          // Obsługa błędu, np. wyświetlenie komunikatu.
        }
      );
    }
  }
}
