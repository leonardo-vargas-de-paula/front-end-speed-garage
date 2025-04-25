import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() carModel: string = '';
  @Input() rating: number = 0;
  @Input() votes: number = 0;
  @Input() author: string = '';
  @Input() shortReview: string = '';
}
