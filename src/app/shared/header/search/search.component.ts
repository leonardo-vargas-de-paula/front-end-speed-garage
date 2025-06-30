// src/app/shared/search/search.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subject, debounceTime, switchMap, takeUntil } from 'rxjs';

import { CarroService } from '../../../services/carro-service.service';
import { Carro } from '../../../models/carro.model';
import { AuthService } from '../../../auth.service';

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
    // Stream de busca
    this.termo$.pipe(
      debounceTime(300),
      switchMap(t =>
        this.carroService.search(
          t,
          this.auth.getToken() ?? undefined
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe(res => (this.resultados = res));
  }

  /** Dispara a busca enquanto digita */
  buscar(termo: string) {
    this.termo$.next(termo);
  }

  /** Clicou em resultado */
  selecionar(c: Carro) {
    this.router.navigate(['/reviews', c.marca, c.modelo, c.ano]);
    this.resultados = [];
  }

  /** Enter ou clique na lupa */
  onSubmit(term: string) {
    this.buscar(term);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
