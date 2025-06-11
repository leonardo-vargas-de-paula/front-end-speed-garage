import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-main',
  imports: [CommonModule],
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.css'
})
export class ProfileMainComponent {
  constructor(public authService: AuthService) {}


}
