import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ServiceTableComponent } from 'src/app/modules/admin/admin-components/service-management/service-table/service-table.component';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    userFirstName: string = '';
    hairdresserId: number = 0;
    userData: any;
    hairdresserInfo: any;

    constructor(private router: Router,
         private hairdresserService: HairdresserService,
         private route: ActivatedRoute,
         private authService: AuthService,
         private storageService: StorageService) {}

    ngOnInit() {
    this.route.params.subscribe(params => {
      this.hairdresserId = +params['hairdresser_id']; 
      this.userData = StorageService.getUser(); 
      this.hairdresserInfo = this.storageService.getHairdresserInfo();

    });

    this.hairdresserService.getHairdresserById(this.hairdresserId).subscribe(data => {
      this.userFirstName = data.firstName;
    });
  }

    goToIndividualProfile() {
        this.router.navigate(['/hairdresser/profile', this.userData.hairdresser_id]);
    }
}