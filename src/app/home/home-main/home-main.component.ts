import { Component } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { ReviewListComponent } from "../../review-list/review-list.component";

@Component({
  selector: 'app-home-main',
  imports: [CardComponent, ReviewListComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {
  mvw = "MOST VIWED OF THE WEEK";
  topHundred = "TOP 100 OF ALL TIME";
}
