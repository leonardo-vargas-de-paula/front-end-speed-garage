import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @Output() clickLogin = new EventEmitter<void>();

voltarParaLogin() {
  this.clickLogin.emit();
}
}
