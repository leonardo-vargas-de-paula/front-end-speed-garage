import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from "../../review-list/review-list.component";

@Component({
  selector: 'app-profile-main',
  imports: [CommonModule, ReviewListComponent],
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.css'
})
export class ProfileMainComponent {
  constructor(public authService: AuthService) {}
  

}
