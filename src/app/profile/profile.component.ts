import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ProfileMainComponent } from "./profile-main/profile-main.component";

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, ProfileMainComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
