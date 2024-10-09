import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

interface User {
  id?: number;  // Optional for new users
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  role: string;
}

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class AddUserModalComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Output() userAdded = new EventEmitter<User>();
  @Output() userUpdated = new EventEmitter<User>();
  @Output() modalClosed = new EventEmitter<void>();

  userForm: FormGroup;
  showModal = true;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.validateEmailUniqueness()]],
      phone: ['', [Validators.required, Validators.pattern(/^(09|\+639)\d{2}[-\s]?\d{3}[-\s]?\d{4}$/)]],
      role: ['User', Validators.required],
      joinDate: ['']
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.initializeForm();
    }
  }

  initializeForm() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    } else {
      this.userForm.reset({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: 'User',
        joinDate: ''
      });
    }
  }

  get editingMode(): boolean {
    return this.user !== null;
  }

  submitForm() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      if (!formValue.joinDate) {
        formValue.joinDate = new Date().toLocaleDateString();
      }
      
      if (this.editingMode) {
        this.userUpdated.emit(formValue);
      } else {
        this.userAdded.emit(formValue);
      }
      
      this.closeModal();
    }
  }

  closeModal() {
    this.showModal = false;
    setTimeout(() => {
      this.userForm.reset({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: 'User',
        joinDate: ''
      });
      this.modalClosed.emit();
    }, 200); // Match this with the animation duration
  }

  validateEmailUniqueness(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        map(email => {
          // Replace this with actual API call logic
          const emailExists = false; // Simulate email uniqueness
          return emailExists ? { emailTaken: true } : null;
        })
      );
    };
  }
}
