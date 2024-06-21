import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';

@Component({
  selector: 'app-hairdressers-list',
  templateUrl: './hairdressers-list.component.html',
  styleUrls: ['./hairdressers-list.component.scss']
})
export class HairdressersListComponent implements OnInit {
  hairdressers: any[] = [];
  serviceId: number;
  userEmail: String;
  userPhoneNumber: string;
  constructor(
    private hairdresserService: HairdresserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
    ) {}

  ngOnInit() {

    this.route.paramMap.subscribe((params: any) => {
      this.serviceId = +params.get('serviceId');
      
    });
    this.loadHairdressers();

    this.userEmail = this.authService.getUserEmail();
    this.userPhoneNumber = this.authService.getUserPhoneNumber();
  }

  loadHairdressers() {
    this.hairdresserService.getAllHairdressers().subscribe((hairdressers) => {
      this.hairdressers = hairdressers;
    });
  }

  selectHairdresser(hairdresserId: number) {
    console.log('User Email:', this.userEmail);
    console.log('User Phone Number:', this.authService.getUserPhoneNumber()); 
    this.router.navigate(['/appointment',this.serviceId, hairdresserId]); 
  }
  
  
}
