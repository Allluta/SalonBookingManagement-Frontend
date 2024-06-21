import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { ReviewService } from 'src/app/auth/services/review/review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {
  reviewId: number; 
  review: any; 

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.reviewId = +this.route.snapshot.paramMap.get('reviewId'); 

   
    this.reviewService.getReviewByIdOrReservationId(this.reviewId).subscribe(review => {
      this.review = review;
    });
  }

  saveChanges(): void {
   
    const { rating, comment } = this.review;
    this.reviewService.editReview(this.reviewId, rating, comment).subscribe(() => {
      console.log('Opinia została zaktualizowana.');

      this.router.navigate(['/user/yourreservations']);
    });
  }
}
