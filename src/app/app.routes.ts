import { Routes } from '@angular/router';
import { LoginComponent } from './tela-login-cadastro/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {path: 'register', component: LoginComponent}
];

