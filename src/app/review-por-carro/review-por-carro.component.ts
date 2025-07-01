import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService, Review } from '../review.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../shared/header/header.component";
import { ReviewListComponent } from '../review-list/review-list.component';

@Component({
  selector: 'app-review-por-carro',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReviewListComponent],
  templateUrl: './review-por-carro.component.html',
  styleUrl: './review-por-carro.component.css'
})
export class ReviewPorCarroComponent {
  reviews: Review[] = [];
  marca = '';
  modelo = '';
  ano = '';

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) { }

 ngOnInit(): void {
  this.marca = this.route.snapshot.paramMap.get('marca') || '';
  this.modelo = this.route.snapshot.paramMap.get('modelo') || '';
  this.ano = this.route.snapshot.paramMap.get('ano') || '';

  this.reviewService.getReviews().subscribe(response => {
    this.reviews = response.results.filter(r =>
      r.carro_marca.toLowerCase() === this.marca.toLowerCase() &&
      r.carro_nome.toLowerCase() === this.modelo.toLowerCase() &&
      r.carro_ano.toString() === this.ano
    );
  });
}
}
