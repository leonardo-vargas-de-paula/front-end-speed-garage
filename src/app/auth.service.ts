import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

// Interface para a resposta do token JWT
export interface AuthTokenResponse {
  access: string;
  refresh: string;
}

// Interface para o payload de registro
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

// Interface para o payload de login
export interface LoginPayload {
  email: string;
  password: string;
}

// Interface para a resposta do login
export interface LoginResponse {
  access: string;
  refresh: string;
  user: {  // Adicione esta parte
    username: string;
    email: string;
    is_staff: boolean;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private baseUrl = 'http://127.0.0.1:8000/api/'; //teste
  private baseUrl = 'https://speedgarage-backend.up.railway.app/api/';
  private authToken = signal<string | null>(null);
  private currentUser = signal<any>(null);
  readonly currentUserSignal = this.currentUser.asReadonly()


  constructor(private http: HttpClient) {
    // Restaura o token
    this.authToken.set(localStorage.getItem('token'));

    // Restaura o usuário
    const userJson = localStorage.getItem('user');
    if (userJson && userJson !== 'undefined' && userJson !== 'null') {
      try {
        const user = JSON.parse(userJson);
        this.currentUser.set(user);  // <- ESSENCIAL
      } catch (e) {
        console.error('Erro ao restaurar usuário do localStorage:', e);
        localStorage.removeItem('user');
      }
    }
  }

  userIsStaff(): boolean {
    const user = this.getCurrentUser();
    return user && user.is_staff ? true : false;
  }

  // Headers reutilizáveis
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // Login com tipagem forte
  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(
      `${this.baseUrl}token/`,
      credentials,
      { headers }
    );
  }

  // Registro com tipagem forte
  register(user: RegisterPayload): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post(
      `${this.baseUrl}register/`,
      body,
      { headers: this.getHeaders() }
    );
  }

  // Gerenciamento do token com signals
  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.authToken.set(token);
  }

  getToken(): string | null {
    return this.authToken();
  }

  // Estado de autenticação computado
  isAuthenticated(): boolean {
    return !!this.authToken();
  }



  // Método opcional para atualizar o token
  refreshToken(refreshToken: string): Observable<AuthTokenResponse> {
    const body = JSON.stringify({ refresh: refreshToken });
    return this.http.post<AuthTokenResponse>(
      `${this.baseUrl}token/refresh/`,
      body,
      { headers: this.getHeaders() }
    );
  }

  saveTokenAndUser(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken.set(token);
    this.currentUser.set(user);
  }

  getCurrentUser(): any {
    const cachedUser = this.currentUser();
    if (cachedUser) return cachedUser;

    try {
      const userJson = localStorage.getItem('user');
      if (userJson && userJson !== 'undefined' && userJson !== 'null') {
        const user = JSON.parse(userJson);
        this.currentUser.set(user);

        return user;

      }
    } catch (e) {
      console.error('Erro ao processar o usuário:', e);
      localStorage.removeItem('user');
    }

    return null;
  }

  // Atualize o método logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authToken.set(null);
    this.currentUser.set(null);
  }


}
