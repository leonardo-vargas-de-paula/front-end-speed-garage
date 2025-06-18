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
  private apiUrl = 'http://127.0.0.1:8000/api/reviews/';

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
  const token = this.authService.getToken();

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  console.log('Token:', token); // Verifique se o token está sendo passado corretamente
  console.log('Headers:', headers); // Verifique os headers
  console.log('API URL:', `${this.apiUrl}?my=true/`); // Verifique a URL da API

  return this.http.get<ReviewResponse>(`${this.apiUrl}?my=true`, { headers });
}
}
