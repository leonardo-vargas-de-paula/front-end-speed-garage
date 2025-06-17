import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Review {
  id: number;
  usuario_nome: string;
  carro_nome: string;
  avaliacao: number;
  votes?: number;
  shortReview?: string;
  // outros campos que você usa
}

export interface ReviewResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Review[];
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8000/api/reviews/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getReviews(): Observable<ReviewResponse> {
    return this.http.get<ReviewResponse>(this.apiUrl);
  }

  getFullReview(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}${id}/`);
  }

  getMyReviews(): Observable<ReviewResponse> {
  const token = this.authService.getToken(); // Certifique-se de que esse método retorna o JWT atual

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<ReviewResponse>(`${this.apiUrl}?my=true`, { headers });
}
}
