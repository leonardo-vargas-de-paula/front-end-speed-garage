import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { HomeMainComponent } from "./home-main/home-main.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HomeMainComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
