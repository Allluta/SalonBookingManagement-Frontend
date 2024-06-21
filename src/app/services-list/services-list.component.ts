

import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../auth/services/service/service.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  services: any[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe(data => {
      this.services = data;
    });
  }
}
