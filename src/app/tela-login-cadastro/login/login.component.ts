import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() clickCadastro = new EventEmitter<void>();

  // Alterado de email para username
  username = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private router: Router, private authService: AuthService) {}



  async fazerLogin() {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('Username e senha são obrigatórios');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const credentials = {
        username: this.username(),
        password: this.password()
      };

      const res = await lastValueFrom(this.authService.login(credentials));
       this.authService.saveTokenAndUser(res.access, res.user);
      this.authService.saveToken(res.access);
      this.router.navigate(['/home']);
    } catch (err: any) {
      console.error('Erro no login:', err);

      if (err.status === 401) {
        this.errorMessage.set('Credenciais inválidas. Verifique seu username e senha.');
      } else {
        this.errorMessage.set('Erro ao conectar com o servidor');
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  irParaCadastro() {
    this.clickCadastro.emit();
  }
}
