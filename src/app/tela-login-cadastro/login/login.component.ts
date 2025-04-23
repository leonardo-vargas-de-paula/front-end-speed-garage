import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() clickCadastro = new EventEmitter<void>();
  constructor(private router: Router) {}

  fazerLogin() {
    this.router.navigate(['/home']);
  }
  irParaCadastro() {
    this.clickCadastro.emit();
  }
}
