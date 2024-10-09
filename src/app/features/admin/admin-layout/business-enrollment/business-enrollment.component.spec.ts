import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEnrollmentComponent } from './business-enrollment.component';

describe('BusinessEnrollmentComponent', () => {
  let component: BusinessEnrollmentComponent;
  let fixture: ComponentFixture<BusinessEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessEnrollmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
