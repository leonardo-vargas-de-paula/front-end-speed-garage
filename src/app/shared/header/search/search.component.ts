import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Subject, takeUntil, debounceTime, switchMap } from 'rxjs';
import { CarroService } from '../../../services/carro-service.service';
import { Carro } from '../../../models/carro.model';
import { AuthService } from '../../../auth.service';
import { RouterModule } from '@angular/router';     


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],            
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  resultados: Carro[] = [];
  termo$ = new Subject<string>();

  constructor(
    private carroService: CarroService,
    private auth: AuthService,
    private router: Router
  ) {
    // stream de busca
    this.termo$.pipe(
      debounceTime(300),
      switchMap(t =>
        this.carroService.search(
          t,
          this.auth.getToken() ?? undefined   // ← converte null → undefined
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe(res => (this.resultados = res));

  }

  buscar(termo: string) {
    this.termo$.next(termo);
  }

  selecionar(c: Carro) {
    // navega para rota de reviews filtradas
    this.router.navigate(['/reviews', c.marca, c.modelo, c.ano]);
    this.resultados = [];         // limpa dropdown
  }

  ngOnDestroy() { this.destroy$.next(); }

  onSubmit(term: string) {
    this.buscar(term);              
    event?.preventDefault();        
  }

}
