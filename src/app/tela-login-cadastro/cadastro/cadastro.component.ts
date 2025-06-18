import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {


  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

   @Output() clickLogin = new EventEmitter<void>();

  voltarParaLogin() {
    this.clickLogin.emit();
  }


  fazerCadastro() {
  if (this.password !== this.confirmPassword) {
    alert('As senhas não coincidem');
    return;
  }

  this.authService.register({
    username: this.username,
    email: this.email,
    password: this.password
  }).subscribe({
    next: (response) => {
      console.log('Cadastro bem-sucedido:', response);
      this.router.navigate(['home']);
    },
    error: (error) => {
      console.error('Erro no cadastro:', error);

      // Mostra mensagens de erro específicas do backend
      if (error.error) {
        let errorMessage = 'Erro no cadastro:';
        for (const key in error.error) {
          errorMessage += `\n${key}: ${error.error[key]}`;
        }
        alert(errorMessage);
      } else {
        alert('Erro desconhecido ao cadastrar');
      }
    }
  });
}
}
