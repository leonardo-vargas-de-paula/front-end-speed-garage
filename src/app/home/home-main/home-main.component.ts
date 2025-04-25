import { Component } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-home-main',
  imports: [CardComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {
  mvw = "MOST VIWED OF THE WEEK";
  topHundred = "TOP 100 OF ALL TIME";
}
