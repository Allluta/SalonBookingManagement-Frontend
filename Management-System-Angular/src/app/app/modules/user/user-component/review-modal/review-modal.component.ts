import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/auth/services/review/review.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent {
  reservationId: number;
  rating: number;
  comment: string;
  hairdresserId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService, 
   private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.reservationId = +params['reservationId'];
      this.hairdresserId = +params['hairdresserId'];
    });
  }

  submitReview(): void {
    
    this.reviewService.addReview(this.reservationId, this.hairdresserId, this.rating, this.comment).subscribe(
      response => {
        
        this.snackBar.open('Opinia dodana pomyślnie!', 'Zamknij', { duration: 3000 });
        
      },
      error => {
        
        this.snackBar.open('Wystąpił błąd podczas dodawania opinii. Spróbuj ponownie.', 'Zamknij', { duration: 3000 });
      }
    );
  }
}
