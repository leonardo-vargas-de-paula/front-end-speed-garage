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
  carro_nome: string;   // modelo
  carro_marca: string;  // marca (FALTAVA)
  carro_ano: number;
  carro_imagem: string; // ano (FALTAVA)
  avaliacao: number;
  texto?: string;
  total_likes?: number;
  liked_by_me?: boolean;
  criado_em?: string;
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
  private apiUrl = 'https://speedgarage-backend.up.railway.app/api/reviews/';
  //private apiUrl = 'http://127.0.0.1:8000/api/reviews/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }



  // 1) assinatura sem parâmetros (continua igual)
  getReviews(): Observable<ReviewResponse>;

  // 2) assinatura opcional com query
  getReviews(query: string): Observable<ReviewResponse>;

  // 3) implementação única
  getReviews(query: string = ''): Observable<ReviewResponse> {
    return this.http.get<ReviewResponse>(`${this.apiUrl}${query}`);
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

    return this.http.get<CarroResponse>(this.apiUrl + 'api/cars/', { headers });
  }

  deleteReview(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}${id}/`, { headers });
  }


}
