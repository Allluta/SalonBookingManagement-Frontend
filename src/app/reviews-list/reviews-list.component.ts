import { Component } from '@angular/core';
import { ReviewService } from '../auth/services/review/review.service';
import { HairdresserService } from '../auth/services/hairdresser/hairdresser.service';
import { ServiceService } from '../auth/services/service/service.service';
@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent {
  reviews: any[] = [];
  averageRating: number = 0;
  constructor(private reviewService: ReviewService,
    private hairdresserService: HairdresserService,
    private serviceService : ServiceService) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews() {
    
    this.reviewService.getReviews().subscribe(
      (data: any) => {
        this.reviews = data;

       
        this.reviews.forEach((review, index) => {
          this.hairdresserService.getHairdresserById(review.hairdresserId).subscribe(
            (hairdresserInfo: any) => {
              
              this.reviews[index].hairdresserInfo = hairdresserInfo;
            },
            error => {
              console.error(`Error fetching hairdresser info for review ${review.id}:`, error);
            }
          );

          
          this.serviceService.getServiceById(review.serviceId).subscribe(
            (serviceInfo: any) => {
              
              this.reviews[index].serviceInfo = serviceInfo;
            },
            error => {
              console.error(`Error fetching service info for review ${review.id}:`, error);
            }
          );
        });

        this.calculateAverageRating();
      },
      error => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
  calculateAverageRating() {
    if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = totalRating / this.reviews.length;
    }
  }
}
