import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/review';

  constructor(private http: HttpClient) { }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFullReview(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
