import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReviewComponent } from './review/review.component';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8000/api/reviews';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getReviews(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        return response.results || [];
      })
    );
  }


  getFullReview(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/`);
  }

  getMyReviews(): Observable<any[]> {
    const token = this.authService.getToken();
    if (!token) {
      return of([]); 
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    return this.http.get<any>(`${this.apiUrl}`, { headers }).pipe(
        map(response => response.results || [])
    );
  }
}
