import { Component } from '@angular/core';
import { SearchComponent } from "./search/search.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  entrarPerfil() {
    this.router.navigate(['/profile']);
  }

}
