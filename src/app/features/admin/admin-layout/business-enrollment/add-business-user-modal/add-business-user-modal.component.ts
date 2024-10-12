import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  address: string;
  phone: string;
  joinDate: string;
  status: string;
  action: string;
  addedTimestamp: number;
}

@Component({
  selector: 'app-add-business-user-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-business-user-modal.component.html',
  styleUrls: ['./add-business-user-modal.component.css']
})
export class AddBusinessUserModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() addUser: EventEmitter<User> = new EventEmitter();

  newUser: User = this.resetNewUser();

  resetNewUser(): User {
    return {
      name: '',
      address: '',
      phone: '',
      joinDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      status: 'pending',
      action: 'Approve',
      addedTimestamp: Date.now()
    };
  }

  onAddUser(): void {
    if (this.validateNewUser()) {
      this.addUser.emit({ ...this.newUser, addedTimestamp: Date.now() });
      this.newUser = this.resetNewUser();
    }
  }

  validateNewUser(): boolean {
    return !!(this.newUser.name && this.newUser.address && this.newUser.phone);
  }

  onClose(): void {
    this.closeModal.emit();
    this.newUser = this.resetNewUser();
  }
}