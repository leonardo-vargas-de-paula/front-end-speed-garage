import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Carro } from './models/carro.model';

export interface CarroResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Carro[];
}

export interface Review {
  id: number;
  usuario_nome: string;
  carro_nome: string;
  avaliacao: number;
  votes?: number;
  texto?: string;

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
  //private apiUrl = 'https://speedgarage-backend.onrender.com/api/reviews/';
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

    return this.http.get<ReviewResponse>(`${this.apiUrl}?my=true`, { headers });
  }

  createReview(reviewData: any): Observable<Review> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Review>(this.apiUrl, reviewData, { headers });
  }

  getCarros(token: string): Observable<CarroResponse> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<CarroResponse>('http://127.0.0.1:8000/api/reviews/api/cars/', { headers });
}

}
