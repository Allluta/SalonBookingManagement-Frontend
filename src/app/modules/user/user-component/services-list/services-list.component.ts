import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/auth/services/service/service.service';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  services: any[];
  userEmail: string;
  userPhoneNumber: string;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private authService : AuthService) {}

    ngOnInit() {
      this.userEmail = this.authService.getUserEmail();
      this.userPhoneNumber = this.authService.getUserPhoneNumber();
      console.log('User Phone Number:', this.authService.getUserPhoneNumber()); 
      this.serviceService.getServices().subscribe(services => {
        this.services = services;
      });
    }
    showServiceDetails(id: number) {
      console.log('Selected service ID:', id); 
      console.log('User Email:', this.authService.getUserEmail());

      this.router.navigate(['user/dashboard/services',  id]); {
        
      }
    }
}
