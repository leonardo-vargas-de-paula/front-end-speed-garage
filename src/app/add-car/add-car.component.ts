import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarroService } from '../services/carro-service.service';
import { HeaderComponent } from "../shared/header/header.component";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


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
  selectedFile: File | null = null;
  tipo: string = "EX"; // valor default

  constructor(
    private router: Router,
    private carroService: CarroService,
    private http: HttpClient,
  ) { }

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
      next: (carroCriado) => {
        alert('Carro adicionado com sucesso!');

        // Agora sim: envia a imagem, usando o ID do carro
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('foto', this.selectedFile);
          formData.append('tipo', this.tipo);
          formData.append('carro', carroCriado.count.toString());

          this.http.post('/api/car-images/', formData).subscribe({
            next: () => {
              alert('Imagem enviada com sucesso!');
              this.router.navigate(['/newreview']);
            },
            error: (err) => {
              console.error('Erro ao enviar imagem:', err);
              alert('Erro ao enviar imagem. Veja o console.');
            }
          });
        } else {
          this.router.navigate(['/newreview']);
        }
      },
      error: err => {
        console.error('Erro ao adicionar carro:', err);
        alert('Erro ao adicionar carro. Veja o console.');
      }
    });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

}

