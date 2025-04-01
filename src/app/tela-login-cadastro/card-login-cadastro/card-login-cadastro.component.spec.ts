import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoginCadastroComponent } from './card-login-cadastro.component';

describe('CardLoginCadastroComponent', () => {
  let component: CardLoginCadastroComponent;
  let fixture: ComponentFixture<CardLoginCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLoginCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLoginCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
