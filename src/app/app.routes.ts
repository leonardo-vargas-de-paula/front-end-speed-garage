import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TelaLoginCadastroComponent } from './tela-login-cadastro/tela-login-cadastro.component';
import { CadastroComponent } from './tela-login-cadastro/cadastro/cadastro.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: TelaLoginCadastroComponent },
    {path: 'register', component: CadastroComponent},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent}
];

