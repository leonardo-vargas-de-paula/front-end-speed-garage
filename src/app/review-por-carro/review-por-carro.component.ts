// src/app/review-por-carro/review-por-carro.component.ts
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { ReviewListComponent } from '../review-list/review-list.component';
import { ReviewService, Review } from '../review.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-review-por-carro',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReviewListComponent],
  templateUrl: './review-por-carro.component.html',
  styleUrl: './review-por-carro.component.css'
})
export class ReviewPorCarroComponent implements OnDestroy {
  reviews: Review[] = [];
  marca  = '';
  modelo = '';
  ano    = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          // lê parâmetros SEM refresh
          this.marca  = params.get('marca')  ?? '';
          this.modelo = params.get('modelo') ?? '';
          this.ano    = params.get('ano')    ?? '';

          // consulta filtrada direto na API
          return this.reviewService.getReviews(
            `?carro_marca=${this.marca}&carro_modelo=${this.modelo}&carro_ano=${this.ano}`
          );
        })
      )
      .subscribe(resp => (this.reviews = resp.results));
  }

  ngOnDestroy() { this.destroy$.next(); }
}
