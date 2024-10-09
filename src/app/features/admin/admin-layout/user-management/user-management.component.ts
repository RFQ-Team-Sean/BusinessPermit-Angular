// src/app/user-management/user-management.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { User } from './user-model/user.model';

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
    {
      id: 1,
      name: 'Angelo John Calleja',
      email: 'angelo@example.com',
      phone: '0917-123-4567',
      joinDate: 'Jan 1, 2023',
      role: 'User',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Maria Clara Reyes',
      email: 'maria@example.com',
      phone: '0917-234-5678',
      joinDate: 'Feb 15, 2023',
      role: 'Admin',
      password: 'password123',
    },
    {
      id: 3,
      name: 'Jose Rizal',
      email: 'jose@example.com',
      phone: '0917-345-6789',
      joinDate: 'Mar 30, 2023',
      role: 'User',
      password: 'password123',
    },
    {
      id: 4,
      name: 'Juan Luna',
      email: 'juan@example.com',
      phone: '0917-456-7890',
      joinDate: 'Apr 5, 2023',
      role: 'User',
      password: 'password123',
    },
    {
      id: 5,
      name: 'Emilio Aguinaldo',
      email: 'emilio@example.com',
      phone: '0917-567-8901',
      joinDate: 'May 20, 2023',
      role: 'User',
      password: 'password123',
    },
  ];

  itemsPerPageOptions: number[] = [5, 10, 20, 50];
  selectedUser: User | null = null;
  showModal: boolean = false;
  itemsPerPage: number = this.itemsPerPageOptions[0];

  ngOnInit(): void {}

  get filteredUsers(): User[] {
    return this.users.filter((user) =>
      Object.values(user).some(value => 
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
  openAddUserModal(): void {
    this.selectedUser = null;
    this.showModal = true;
  }

  openEditUserModal(user: User): void {
    this.selectedUser = { ...user };
    this.showModal = true;
  }

  handleUserAdded(newUser: User): void {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id || 0)) + 1 : 1;
    newUser.id = newId;
    if (!newUser.password) {
      newUser.password = 'password123';
    }
    newUser.joinDate = new Date().toLocaleDateString();
    
    // Add the new user to the beginning of the array
    this.users.unshift(newUser);
    
    // Reset itemsPerPage to show all users if the new total exceeds the current itemsPerPage
    if (this.users.length > this.itemsPerPage) {
      this.itemsPerPage = this.users.length;
    }
    
    this.closeModal();
  }

  handleUserUpdated(updatedUser: User): void {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
    }
    this.closeModal();
  }

  

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }
}