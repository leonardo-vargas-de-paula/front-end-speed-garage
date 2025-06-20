import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-review-list',
  imports: [CommonModule, HttpClientModule, CardComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit {
  reviews: any[] = [];

  @Input() listMode: 'all' | 'my-reviews' = 'all';

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {

    if (this.listMode === 'my-reviews') {
      this.loadMyReviews();
    } else { 
      this.loadAllReviews();
    }
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
}
