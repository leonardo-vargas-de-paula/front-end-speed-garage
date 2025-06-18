import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Carro } from '../models/carro.model';
import { CarroService } from '../services/carro-service.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-review',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.css'
})


export class NewReviewComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carroService: CarroService,
    private authService: AuthService
  ) { }

  carros: Carro[] = [];
  selectedCarro?: Carro
  marcas: string[] = [];
  modelos: string[] = [];
  anos: number[] = [];

  selectedMarca: string | null = null;
  selectedModelo: string | null = null;
  selectedAno: number | null = null;


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
      return; // ou redireciona para login, etc.
    }

    this.carroService.getMarcas(token).subscribe({
      next: data => this.marcas = data,
      error: err => console.error('Erro ao carregar marcas:', err)
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

    const token = this.authService.getToken();
    if (token) {
      this.carroService.getModelos(marcaSelecionada, token).subscribe({
        next: data => this.modelos = data,
        error: err => console.error('Erro ao carregar modelos:', err)
      });
    }
  }

  onModeloChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const modeloSelecionado = selectElement.value;

    if (!this.selectedMarca) return;

    this.selectedModelo = modeloSelecionado;
    this.selectedAno = null;
    this.anos = [];

    const token = this.authService.getToken();
    if (token) {
      this.carroService.getAnos(this.selectedMarca, modeloSelecionado, token).subscribe({
        next: data => this.anos = data,
        error: err => console.error('Erro ao carregar anos:', err)
      });
    }
  }

  onAnoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const anoSelecionado = +selectElement.value;

    this.selectedAno = isNaN(anoSelecionado) ? null : anoSelecionado;
  }
}
