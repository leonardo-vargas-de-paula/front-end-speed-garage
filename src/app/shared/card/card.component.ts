import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ReviewService } from '../../review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() id: number = 0;
  @Input() carModel: string = '';
  @Input() rating: number = 0;
  @Input() votes: number = 0;
  @Input() author: string = '';
  @Input() texto: string | undefined = '';
  @Input() marca: string | undefined = '';
  @Input() ano: number | undefined = 0;
  @Input() imagem!: string;

  currentUserName: string = '';
  @Output() reviewDeleted = new EventEmitter<number>();

  constructor(private router: Router,
    public authService: AuthService,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.currentUserName = user?.username || '';
    console.log('Usuário logado:', this.currentUserName);
    console.log('Usuário logado:', this.currentUserName);
  }

  onReadMore() {
    this.router.navigate(['/review', this.id]);
  }

  onDelete(): void {
    if (confirm('Tem certeza que deseja deletar esta review?')) {
      this.reviewService.deleteReview(this.id).subscribe({
        next: () => {
          this.reviewDeleted.emit(this.id);
        },
        error: (err) => {
          console.error('Erro ao deletar review:', err);
          alert('Erro ao deletar review.');
        }
      });
    }
  }

}
