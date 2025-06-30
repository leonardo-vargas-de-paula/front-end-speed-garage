import { Component } from '@angular/core';
import { SearchComponent } from "./search/search.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  entrarPerfil() {
    this.router.navigate(['/profile']);
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  entrarNewReview() {
    this.router.navigate(['/newreview']);
  }
}


