import { ReviewComponent } from './../review/review.component';
import { Component, OnInit, signal } from '@angular/core'; // Importe 'signal'
import { ReviewService} from '../review.service'; // Importe a interface Review
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../shared/card/card.component";
// Importe a interface Review

@Component({
  selector: 'app-review-list',
  standalone: true, // Adicione standalone: true se este for o caso
  imports: [CommonModule, HttpClientModule, CardComponent],
  templateUrl: './my-review-list.component.html',
  styleUrl: './my-review-list.component.css'
})
export class ReviewListComponent implements OnInit {
  // Use a interface para tipagem forte e um signal para reatividade
  reviews = signal<ReviewComponent[]>([]);
  isLoading = signal(true); // Signal para controlar o estado de carregamento

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.isLoading.set(true);
    // A ÚNICA MUDANÇA LÓGICA É AQUI:
    this.reviewService.getMyReviews().subscribe(data => {
      this.reviews.set(data);
      this.isLoading.set(false); // Finaliza o carregamento
    });
  }
}
