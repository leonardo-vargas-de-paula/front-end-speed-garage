import { Component, signal,  WritableSignal } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-review',
  imports: [HeaderComponent],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.css'
})
export class NewReviewComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  voltarHome() {
    this.router.navigate(['/home']);
  }

    imagePreview: WritableSignal<string | null> = signal(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      // Quando o arquivo for lido, o evento onload é disparado.
      reader.onload = () => {
        // 2. Usamos o método .set() para atualizar o valor do signal.
        //    O resultado da leitura (reader.result) é uma string base64.
        this.imagePreview.set(reader.result as string);
      };

      // Inicia a leitura do arquivo, convertendo-o para uma Data URL.
      reader.readAsDataURL(file);
    }
  }

}
