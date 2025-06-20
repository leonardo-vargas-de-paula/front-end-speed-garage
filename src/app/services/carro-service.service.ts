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
}

@Injectable({ providedIn: 'root' })
export class CarroService {
  private apiUrl = 'http://127.0.0.1:8000/api/cars/';

  constructor(private http: HttpClient,
    private authService: AuthService,
  ) { }

  getCarros(token: string): Observable<CarroResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<CarroResponse>(this.apiUrl, { headers });
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

}
