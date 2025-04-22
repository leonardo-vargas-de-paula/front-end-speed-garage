import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() clickCadastro = new EventEmitter<void>();

  irParaCadastro() {
    this.clickCadastro.emit();
  }
}
