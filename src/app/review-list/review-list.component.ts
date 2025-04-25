import { Component, OnInit } from '@angular/core';
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

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe(data => {
      this.reviews = data;
    });
  }

}
