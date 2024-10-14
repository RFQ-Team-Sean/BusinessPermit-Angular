import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitApplicationModalComponent } from './permit-application-modal.component';

describe('PermitApplicationModalComponent', () => {
  let component: PermitApplicationModalComponent;
  let fixture: ComponentFixture<PermitApplicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitApplicationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
