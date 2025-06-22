import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Carro } from '../models/carro.model';
import { CarroService } from '../services/carro-service.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ReviewService } from '../review.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-new-review',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.css'
})


export class NewReviewComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carroService: CarroService,
    private authService: AuthService,
    private reviewService: ReviewService
  ) { }

  carros: Carro[] = [];
  selectedCarro?: Carro
  marcas: string[] = [];
  modelos: string[] = [];
  anos: number[] = [];

  selectedMarca: string | null = null;
  selectedModelo: string | null = null;
  selectedAno: number | null = null;

  reviewText: string = '';
  avaliacao: number | null = null;
  selectedFile: File | null = null;


  voltarHome() {
    this.router.navigate(['/home']);
  }

  imagePreview: WritableSignal<string | null> = signal(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token não encontrado, usuário não autenticado.');
      return;
    }

    // Carrega todos os carros (marca, modelo, ano, id)
    this.carroService.getCarros(token).subscribe({
      next: data => {
        this.carros = data.results;
        // Extrai e remove duplicatas das marcas
        this.marcas = [...new Set(this.carros.map(c => c.marca))];
      },
      error: err => console.error('Erro ao carregar carros:', err)
    });
  }

  onMarcaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const marcaSelecionada = selectElement.value;

    this.selectedMarca = marcaSelecionada;
    this.selectedModelo = null;
    this.selectedAno = null;
    this.modelos = [];
    this.anos = [];

    // Filtra os carros dessa marca e extrai modelos únicos
    const modelosFiltrados = this.carros
      .filter(c => c.marca === marcaSelecionada)
      .map(c => c.modelo);

    this.modelos = [...new Set(modelosFiltrados)];
  }

  onModeloChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const modeloSelecionado = selectElement.value;

    if (!this.selectedMarca) return;

    this.selectedModelo = modeloSelecionado;
    this.selectedAno = null;
    this.anos = [];

    // Filtra os carros com marca e modelo e extrai anos únicos
    const anosFiltrados = this.carros
      .filter(c => c.marca === this.selectedMarca && c.modelo === modeloSelecionado)
      .map(c => c.ano);

    this.anos = [...new Set(anosFiltrados)];
  }

  onAnoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const anoSelecionado = +selectElement.value;

    this.selectedAno = isNaN(anoSelecionado) ? null : anoSelecionado;

  }

  onRatingChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.avaliacao = parseInt(input.value);
  }

  submitReview(): void {
    if (!this.selectedMarca || !this.selectedModelo || !this.selectedAno || !this.avaliacao) {
      alert('Preencha todos os campos antes de enviar!');
      return;
    }

    const carro = this.carros.find(c =>
      c.marca === this.selectedMarca &&
      c.modelo === this.selectedModelo &&
      c.ano === this.selectedAno
    );

    if (!carro) {
      alert('Carro não encontrado.');
      return;
    }

    const formData = new FormData();
    formData.append('carro', String(carro.id)); // ID do carro
    formData.append('avaliacao', String(this.avaliacao));
    formData.append('texto', this.reviewText);  // campo correto para o texto da review

    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    this.reviewService.createReview(formData).subscribe({
      next: res => {
        alert('Review enviada com sucesso!');
        this.router.navigate(['home/']);
      },
      error: err => {
        console.error('Erro ao enviar review:', err);
        alert('Erro ao enviar review. Veja o console para detalhes.');
      }
    });
  }

  toNewCar() {
    this.router.navigate(['/newcar']);
  }
}
