import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-review',
  imports: [HeaderComponent],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.css'
})
export class NewReviewComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  voltarHome() {
    this.router.navigate(['/home']);
  }

}
