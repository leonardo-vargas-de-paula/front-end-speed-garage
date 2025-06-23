import { Component } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { ReviewListComponent } from "../../review-list/review-list.component";
import { CarroService } from '../../services/carro-service.service';
import { Carro } from '../../models/carro.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-main',
  imports: [CardComponent, ReviewListComponent, CommonModule, RouterModule ],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {
  mvw = "MOST VIWED OF THE WEEK";
  topHundred = "TOP 3 OF ALL TIME";

  topCars: Carro[] = [];

  constructor(private carService: CarroService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token não encontrado, usuário não autenticado.');
      return;
    }
    this.carService.getTopCars(3, token).subscribe({
      next: (cars) => this.topCars = cars,
      error: (err) => console.error('Erro ao buscar top cars', err)
    });
  }


}
