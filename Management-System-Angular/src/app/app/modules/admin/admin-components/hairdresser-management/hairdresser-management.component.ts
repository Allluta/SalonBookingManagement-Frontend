import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';
import { Router } from '@angular/router'; 
import { HairdresserTableComponent } from './hairdresser-table/hairdresser-table.component';

@Component({
  selector: 'app-hairdresser-management',
  templateUrl: './hairdresser-management.component.html',
  styleUrls: ['./hairdresser-management.component.scss']
})
export class HairdresserManagementComponent implements OnInit {
  hairdresserForm: FormGroup;
 

  constructor(
    private fb: FormBuilder,
    private hairdresserService: HairdresserService,
    private router: Router) {}

  ngOnInit() {
    this.hairdresserForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      experience: [''],
      workingHours: [''],
      email: ['', [Validators.required, Validators.email]], 
      phoneNumber: ['', Validators.required], 
      password: [''],
      
     
    });
    
   
  }

  addHairdresser() {
    if (this.hairdresserForm.valid) {
      const formData = this.hairdresserForm.value;
      this.hairdresserService.addHairdresser(formData).subscribe(
        (response) => {
          console.log('Dodano fryzjera', response);
          
          this.router.navigate(['admin/dashboard'])
        },
        (error) => {
          console.error('Błąd podczas dodawania fryzjera', error);
          
        }
      );
    }
  }
}
