import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TastsComponent } from './tasts.component';

describe('TastsComponent', () => {
  let component: TastsComponent;
  let fixture: ComponentFixture<TastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TastsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
