import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TelaLoginCadastroComponent } from './tela-login-cadastro/tela-login-cadastro.component';
import { CadastroComponent } from './tela-login-cadastro/cadastro/cadastro.component';
import { ProfileComponent } from './profile/profile.component';
import { ReviewComponent } from './review/review.component';
import { NewReviewComponent } from './new-review/new-review.component';
import { AddCarComponent } from './add-car/add-car.component';
import { ReviewPorCarroComponent } from './review-por-carro/review-por-carro.component';

export const routes: Routes = [
    { path: '', component: TelaLoginCadastroComponent },
    {path: 'register', component: CadastroComponent},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'review/:id', component: ReviewComponent},
    {path: 'newreview', component: NewReviewComponent},
    {path: 'newcar', component: AddCarComponent},
    { path: 'reviews/:marca/:modelo/:ano', component: ReviewPorCarroComponent }
];

