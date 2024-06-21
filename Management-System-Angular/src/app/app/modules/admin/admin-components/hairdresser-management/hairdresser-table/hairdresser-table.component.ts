import { Component, OnInit } from '@angular/core';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hairdresser-table',
  templateUrl: './hairdresser-table.component.html',
  styleUrls: ['./hairdresser-table.component.scss']
})
export class HairdresserTableComponent implements OnInit {

  hairdressers: any[];

  constructor(private hairdresserService: HairdresserService,
    private router: Router) {}

  ngOnInit() {
    this.hairdresserService.getAllHairdressers().subscribe(
      (response) => {
        this.hairdressers = response;
      },
      (error) => {
        console.error('Błąd podczas pobierania fryzjerów', error);
      }
    );
  }
  updateHairdresser(id: number) {
    this.router.navigate(['/edit', id]);
  }

  confirmDelete(id: number) {
    
    const confirmed = window.confirm('Czy na pewno chcesz usunąć tego fryzjera?');
    if (confirmed) {
      this.deleteHairdresser(id);
    }
  }

  deleteHairdresser(id: number) {
    const confirmed = window.confirm('Czy na pewno chcesz usunąć tego fryzjera?');
    if(confirmed){
    this.hairdresserService.deleteHairdresser(id).subscribe(
      () => {
        
        this.refreshHairdresserList();
      },
      (error) => {
        console.error('Błąd podczas usuwania fryzjera', error);
      }
    );
  }
}

  refreshHairdresserList() {
   
    this.hairdresserService.getAllHairdressers().subscribe(
      (response) => {
        this.hairdressers = response;
      },
      (error) => {
        console.error('Błąd podczas odświeżania listy fryzjerów', error);
      }
    );
  }
  goToProfile(id: number) {
   
    this.router.navigate(['/verifyPassword', id]);
  }
  
}