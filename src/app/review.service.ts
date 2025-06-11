import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReviewComponent } from './review/review.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://127.0.0.1:8000/api/reviews';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }



  getFullReview(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/`);
  }

  getMyReviews(): Observable<ReviewComponent[]> {
    const token = this.authService.getToken();

    // Se o usuário não estiver logado, retorna um array vazio sem chamar a API.
    if (!token) {
      return of([]); // 'of' cria um Observable que emite um valor e completa.
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Chama o endpoint que criamos no Django
    return this.http.get<ReviewComponent[]>(`${this.apiUrl}/my-reviews/`, { headers });
  }
}
