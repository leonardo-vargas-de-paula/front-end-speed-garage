import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro.model';
import { AuthService } from '../auth.service';


export interface CarroResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Carro[];
  media_avaliacao: number;
}



@Injectable({ providedIn: 'root' })
export class CarroService {
  //private apiUrl = 'http://127.0.0.1:8000/api/cars/';
  private apiUrl = 'https://speedgarage-backend.up.railway.app/api/cars/';

  constructor(private http: HttpClient,
    private authService: AuthService,
  ) { }

  getCarros(token: string): Observable<CarroResponse> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });


    let allCarros: Carro[] = [];
    let nextUrl: string | null = this.apiUrl;

    return new Observable<CarroResponse>(observer => {
      const fetchNext = (url: string) => {
        this.http.get<CarroResponse>(url, { headers }).subscribe({
          next: response => {
            allCarros.push(...response.results);
            if (response.next) {
              fetchNext(response.next);
            } else {
              // Monta manualmente um CarroResponse ao final
              const finalResponse: CarroResponse = {
                count: allCarros.length,
                next: null,
                previous: null,
                results: allCarros,
                media_avaliacao: 0 // <-- ou calcule se precisar
              };
              observer.next(finalResponse);
              observer.complete();
            }
          },
          error: err => observer.error(err)
        });
      };

      if (nextUrl) fetchNext(nextUrl);
    });
  }

  getMarcas(token: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<string[]>(`${this.apiUrl}marcas/`, { headers });
  }

  getModelos(marca: string, token: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<string[]>(`${this.apiUrl}modelos/?marca=${marca}`, { headers });
  }

  getAnos(marca: string, modelo: string, token: string): Observable<number[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<number[]>(`${this.apiUrl}anos/?marca=${marca}&modelo=${modelo}`, { headers });
  }

  addCarro(carro: { marca: string; modelo: string; ano: number }) {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<CarroResponse>(`${this.apiUrl}`, carro, { headers });
  }

  getTopCars(n = 3, token: string): Observable<Carro[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Carro[]>(`${this.apiUrl}top/?n=${n}`, { headers });
  }

}
