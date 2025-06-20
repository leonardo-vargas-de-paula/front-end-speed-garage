import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarroService } from '../services/carro-service.service';
import { HeaderComponent } from "../shared/header/header.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  imports: [HeaderComponent, FormsModule]
})
export class AddCarComponent {

  marca: string = '';
  modelo: string = '';
  ano: number | null = null;

  constructor(
    private router: Router,
    private carroService: CarroService
  ) {}

  voltarNewReview() {
    this.router.navigate(['/newreview']);
  }

  salvarCarro() {
    if (!this.marca || !this.modelo || !this.ano) {
      alert('Preencha todos os campos!');
      return;
    }

    const novoCarro = {
      marca: this.marca,
      modelo: this.modelo,
      ano: this.ano
      
    };

    this.carroService.addCarro(novoCarro).subscribe({
      
      next: () => {
        alert('Carro adicionado com sucesso!');
        this.router.navigate(['/newreview']);
      },
      error: err => {
        console.error('Erro ao adicionar carro:', err);
        alert('Erro ao adicionar carro. Veja o console.');
      }
    });
  }
}