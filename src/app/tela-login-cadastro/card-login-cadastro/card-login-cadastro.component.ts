import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from "../cadastro/cadastro.component";

@Component({
  selector: 'app-card-login-cadastro',
  imports: [LoginComponent, CadastroComponent],
  templateUrl: './card-login-cadastro.component.html',
  styleUrl: './card-login-cadastro.component.css'
})
export class CardLoginCadastroComponent {
  isLogin: boolean = true;

  alternarParaCadastro() {
    this.isLogin = false;
  }

  alternarParaLogin() {
    this.isLogin = true;
  }

}
