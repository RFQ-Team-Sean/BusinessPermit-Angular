// src/app/user-management/add-user-modal/add-user-modal.component.ts

import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../user-model/user.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10%)' }))
      ])
    ])
  ]
})
export class AddUserModalComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Output() userAdded = new EventEmitter<User>();
  @Output() userUpdated = new EventEmitter<User>();
  @Output() modalClosed = new EventEmitter<void>();

  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  userForm: FormGroup;
  showModalInternal: boolean = true;
  isChangingPassword: boolean = false;
  maskedPassword: string = '';

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.validateEmailUniqueness()]],
      phone: ['', [Validators.required, Validators.pattern(/^(09|\+639)\d{2}[-\s]?\d{3}[-\s]?\d{4}$/)]],
      role: ['User', Validators.required],
      password: [''],
      newPassword: [''],
      confirmPassword: [''],
      joinDate: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.initializeForm();
    }
  }

  togglePasswordVisibility(field: 'password' | 'currentPassword' | 'newPassword' | 'confirmPassword'): void {
    switch (field) {
      case 'password':
      case 'currentPassword':
        this.showPassword = !this.showPassword;
        break;
      case 'newPassword':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirmPassword':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  initializeForm(): void {
    if (this.user) {
      this.userForm.patchValue({
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        role: this.user.role,
        joinDate: this.user.joinDate
      });
      this.userForm.get('password')?.clearValidators();
      this.maskedPassword = this.maskPassword(this.user.password);
    } else {
      this.userForm.reset({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: 'User',
        password: '',
        newPassword: '',
        confirmPassword: '',
        joinDate: ''
      });
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.maskedPassword = '';
    }
    this.userForm.updateValueAndValidity();
  }

  maskPassword(password: string): string {
    return '*'.repeat(password.length);
  }

  get editingMode(): boolean {
    return this.user !== null;
  }

  toggleChangePassword(): void {
    this.isChangingPassword = !this.isChangingPassword;
    if (this.isChangingPassword) {
      this.userForm.get('newPassword')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('confirmPassword')?.setValidators([Validators.required]);
    } else {
      this.userForm.get('newPassword')?.clearValidators();
      this.userForm.get('confirmPassword')?.clearValidators();
    }
    this.userForm.get('newPassword')?.updateValueAndValidity();
    this.userForm.get('confirmPassword')?.updateValueAndValidity();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      if (!formValue.joinDate) {
        formValue.joinDate = new Date().toLocaleDateString();
      }

      if (this.editingMode) {
        if (this.isChangingPassword && formValue.newPassword) {
          formValue.password = formValue.newPassword;
        } else if (!formValue.password) {
          formValue.password = this.user?.password || 'password123';
        }
        delete formValue.newPassword;
        delete formValue.confirmPassword;
        this.userUpdated.emit(formValue);
      } else {
        formValue.password = formValue.password || 'password123';
        this.userAdded.emit(formValue);
      }

      this.closeModal();
    }
  }

  closeModal(): void {
    this.showModalInternal = false;
    setTimeout(() => {
      this.userForm.reset();
      this.isChangingPassword = false;
      this.modalClosed.emit();
    }, 200);
  }

  validateEmailUniqueness(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        map(email => {
          const emailExists = email.toLowerCase() === 'taken@example.com';
          return emailExists ? { emailTaken: true } : null;
        })
      );
    };
  }
}