import { Component, Input, OnInit } from '@angular/core';
import { ReviewService, Review } from '../review.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../shared/card/card.component";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit {
  @Input() reviews: Review[] = [];
  @Input() listMode: 'all' | 'my-reviews' | 'filtered' = 'all';



  constructor(private reviewService: ReviewService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.listMode === 'all' && this.reviews.length === 0) {
      this.loadAllReviews();
    } else if (this.listMode === 'my-reviews' && this.reviews.length === 0) {
      this.loadMyReviews();
    }
    // Se for 'filtered', reviews já foi passada via @Input e não faz fetch
  }

  loadAllReviews(): void {
    this.reviewService.getReviews().subscribe(data => {
      this.reviews = data.results;
    });
  }

  loadMyReviews(): void {
    this.reviewService.getMyReviews().subscribe(data => {
      this.reviews = data.results;
    });

    
  }

  handleReviewDeleted(id: number): void {
  this.reviews = this.reviews.filter(r => r.id !== id);
}

}
