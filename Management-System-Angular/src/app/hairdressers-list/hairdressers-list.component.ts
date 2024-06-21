

import { Component, OnInit } from '@angular/core';
import { HairdresserService } from '../auth/services/hairdresser/hairdresser.service';

@Component({
  selector: 'app-hairdressers-list',
  templateUrl: './hairdressers-list.component.html',
  styleUrls: ['./hairdressers-list.component.scss']
})
export class HairdressersListComponent implements OnInit {
  hairdressers: any[] = [];

  constructor(private hairdresserService: HairdresserService) {}

  ngOnInit(): void {
    this.loadHairdressers();
  }

  loadHairdressers(): void {
    this.hairdresserService.getAllHairdressers().subscribe(data => {
      this.hairdressers = data;
    });
  }
}
