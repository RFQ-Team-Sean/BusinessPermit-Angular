import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessUserModalComponent } from './add-business-user-modal.component';

describe('AddBusinessUserModalComponent', () => {
  let component: AddBusinessUserModalComponent;
  let fixture: ComponentFixture<AddBusinessUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBusinessUserModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBusinessUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
