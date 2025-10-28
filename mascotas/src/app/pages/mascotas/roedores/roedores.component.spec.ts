import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoedoresComponent } from './roedores.component';

describe('RoedoresComponent', () => {
  let component: RoedoresComponent;
  let fixture: ComponentFixture<RoedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
