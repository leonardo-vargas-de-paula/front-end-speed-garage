import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Critica {
  id: number;
  usuario_nome: string;
  carro_nome: string;
  avaliacao: number;
  texto: string;
  criado_em: string; // ou Date, se preferir converter
}

@Injectable({
  providedIn: 'root'
})
export class CriticaService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Injete o AuthService
  ) { }


  getMyReviews(): Observable<Critica[]> {
    const token = this.authService.getToken();


    if (!token) {
      return new Observable<Critica[]>(subscriber => {
        subscriber.next([]);
        subscriber.complete();
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Critica[]>(`${this.baseUrl}/my-reviews/`, { headers });
  }
}
