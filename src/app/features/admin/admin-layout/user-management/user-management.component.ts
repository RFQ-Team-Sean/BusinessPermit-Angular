import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserModalComponent } from '../../../../add-user-modal/add-user-modal.component';

interface User {
  id?: number;  // Optional for new users
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AddUserModalComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  searchTerm: string = '';
  users: User[] = [
    { id: 1, name: 'Angelo John Calleja', email: 'angelo@example.com', phone: '0917-123-4567', joinDate: 'Jan 1, 2023', role: 'User' },
    { id: 2, name: 'Maria Clara Reyes', email: 'maria@example.com', phone: '0917-234-5678', joinDate: 'Feb 15, 2023', role: 'Admin' },
    { id: 3, name: 'Jose Rizal', email: 'jose@example.com', phone: '0917-345-6789', joinDate: 'Mar 30, 2023', role: 'User' },
    { id: 4, name: 'Juan Luna', email: 'juan@example.com', phone: '0917-456-7890', joinDate: 'Apr 5, 2023', role: 'User' },
    { id: 5, name: 'Emilio Aguinaldo', email: 'emilio@example.com', phone: '0917-567-8901', joinDate: 'May 20, 2023', role: 'User' },
  ];

  itemsPerPageOptions: number[] = [5, 10, 20, 50];
  selectedUser: User | null = null;
  showModal: boolean = false;

  ngOnInit() {}

  get filteredUsers(): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm) ||
      user.joinDate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Open Modal for Adding a New User
  openAddUserModal() {
    this.selectedUser = null; // No user selected for adding
    this.showModal = true;
  }

  // Open Modal for Editing an Existing User
  openEditUserModal(user: User) {
    this.selectedUser = { ...user }; // Create a copy to prevent direct mutations
    this.showModal = true;
  }

  // Handle User Added Event
  handleUserAdded(newUser: User) {
    // Assign a unique ID (could be handled by backend in real scenarios)
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id || 0)) + 1 : 1;
    newUser.id = newId;
    this.users.push(newUser);
  }

  // Handle User Updated Event
  handleUserUpdated(updatedUser: User) {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  // Close Modal
  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
  }

  // Delete User
  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }
}
