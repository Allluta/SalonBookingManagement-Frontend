import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from 'src/app/auth/services/service/service.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.component.html',
  styleUrls: ['./services-details.component.scss']
})
export class ServicesDetailsComponent implements OnInit{
  serviceId: number;
  serviceDetails: any;
  selectedService: string;
  userEmail: string;
  userPhoneNumber: string;

  
  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.serviceId = parseInt(params.get('id'));
      
      console.log(this.serviceId)
      this.selectedService = params.get('selectedService');
      this.loadServiceDetails();


      this.userEmail = this.authService.getUserEmail();
      this.userPhoneNumber = this.authService.getUserPhoneNumber();
    });
  }

  loadServiceDetails() {
    this.serviceService.getServiceById(this.serviceId).subscribe(service => {
      this.serviceDetails = service;
    });
  }
  goBack() {
    this.router.navigate(['user/dashboard/services']);
  }
  bookService() {
    console.log('User Email:', this.userEmail);
    console.log('User Phone Number:', this.authService.getUserPhoneNumber()); 
    this.router.navigate(['/hairdressers', this.serviceId]);
  }
  
}
