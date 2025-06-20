import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() id: number = 0;
  @Input() carModel: string = '';
  @Input() rating: number = 0;
  @Input() votes: number = 0;
  @Input() author: string = '';
  @Input() texto: string = '';

  constructor(private router: Router) {}

  onReadMore() {
    this.router.navigate(['/review', this.id]);
  }

}
