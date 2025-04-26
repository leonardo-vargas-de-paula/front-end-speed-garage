import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-review',
  imports: [HeaderComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  review: any;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reviewService.getFullReview(+id).subscribe(review => {
        this.review = review;
      });
    }
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }
}
