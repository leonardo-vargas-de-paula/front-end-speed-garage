import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPorCarroComponent } from './review-por-carro.component';

describe('ReviewPorCarroComponent', () => {
  let component: ReviewPorCarroComponent;
  let fixture: ComponentFixture<ReviewPorCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewPorCarroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPorCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
