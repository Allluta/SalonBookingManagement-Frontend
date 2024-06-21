import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HairdresserService } from 'src/app/auth/services/hairdresser/hairdresser.service';

@Component({
  selector: 'app-hairdresser-verifyPassword',
  templateUrl: './hairdresser-verifyPassword.component.html',
  styleUrls: ['./hairdresser-verifyPassword.component.scss']
})
export class HairdresserVerifyPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  hairdresserId: number;
  errorMessage: string = '';
  isPasswordCorrect: boolean = true;
  passwordEncoder: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hairdresserService: HairdresserService
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.hairdresserId = +params['id'];
    });
  }

  submitPassword() {
    const enteredPassword = this.passwordForm.get('password').value;
    console.log('hairdresserId:', this.hairdresserId);
    
    this.hairdresserService.verifyPassword(this.hairdresserId, enteredPassword).subscribe(
      (response) => {
        
        this.isPasswordCorrect = response;
        this.errorMessage = ''; 
        if (response) {
            this.router.navigate([`/hairdresser/profile/${this.hairdresserId}`]);
        } else {
            this.errorMessage = 'Błędne hasło. Spróbuj ponownie.';
            console.error('Błąd podczas weryfikacji hasła');
      
        }
      },
    );
}
}