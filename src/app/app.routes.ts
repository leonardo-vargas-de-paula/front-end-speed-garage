import { Routes } from '@angular/router';
import { LoginComponent } from './tela-login-cadastro/login/login.component';
import { HomeComponent } from './home/home.component';
import { TelaLoginCadastroComponent } from './tela-login-cadastro/tela-login-cadastro.component';
import { CadastroComponent } from './tela-login-cadastro/cadastro/cadastro.component';

export const routes: Routes = [
    { path: '', component: TelaLoginCadastroComponent },
    {path: 'register', component: CadastroComponent},
    {path: 'home', component: HomeComponent},
];

