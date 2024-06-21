import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';

@Component({
  selector: 'app-hairdresser-edit',
  templateUrl: './hairdresser-edit.component.html',
  styleUrls: ['./hairdresser-edit.component.scss']
})
export class HairdresserEditComponent implements OnInit {
  hairdresser: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private hairdresserService: HairdresserService
  ) {}

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];
    this.hairdresserService.getHairdresserById(id).subscribe(
      (response) => {
        this.hairdresser = response;
      },
      (error) => {
        console.error('Błąd podczas pobierania danych fryzjera', error);
      }
    );
  }

  updateHairdresser() {
    
    this.hairdresserService.updateHairdresser(this.hairdresser).subscribe(
      (response) => {
        console.log('Zaktualizowano fryzjera', response);
        
      },
      (error) => {
        console.error('Błąd podczas aktualizacji fryzjera', error);
       
      }
    );
  }
}