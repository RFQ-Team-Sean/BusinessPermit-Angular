import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitApplicationComponent } from './permit-application.component';

describe('PermitApplicationComponent', () => {
  let component: PermitApplicationComponent;
  let fixture: ComponentFixture<PermitApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
