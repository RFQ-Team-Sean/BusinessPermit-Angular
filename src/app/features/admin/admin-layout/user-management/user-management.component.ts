// src/app/user-management/user-management.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { User } from './user-model/user.model';

interface SavedSearch {
  name: string;
  term: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AddUserModalComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  Math = Math; // Make Math available in the template
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
    // Add more users if needed
  ];

  itemsPerPageOptions: number[] = [5, 10, 20, 50];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  currentPage: number = 1;
  selectedUser: User | null = null;
  showModal: boolean = false;

  showSortDropdown: boolean = false;
  currentSort: string = 'Name (A-Z)';
  sortOptions: string[] = [
    'Name (A-Z)',
    'Name (Z-A)',
    'Email (A-Z)',
    'Email (Z-A)',
    'Join Date (Newest)',
    'Join Date (Oldest)',
  ];

  showSavedSearchDropdown: boolean = false;
  savedSearches: SavedSearch[] = [
    { name: 'Admin Users', term: 'admin' },
    { name: 'Recent Users', term: '2023' },
  ];

  ngOnInit(): void {}

  // Getter for filtered users based on the search term
  get filteredUsers(): User[] {
    return this.users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  // Getter for paginated users based on current page and items per page
  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  // Getter for total number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  // Getter for displaying the range of items currently shown
  get itemsRange(): string {
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(
      startItem + this.paginatedUsers.length - 1,
      this.filteredUsers.length
    );
    return `${startItem}-${endItem} of ${this.filteredUsers.length}`;
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Handle change in items per page
  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1; // Reset to first page when changing items per page
  }

  // Open the modal to add a new user
  openAddUserModal(): void {
    this.selectedUser = null;
    this.showModal = true;
  }

  // Open the modal to edit an existing user
  openEditUserModal(user: User): void {
    this.selectedUser = { ...user };
    this.showModal = true;
  }

  // Handle adding a new user
  handleUserAdded(newUser: User): void {
    const newId =
      this.users.length > 0 ? Math.max(...this.users.map((u) => u.id || 0)) + 1 : 1;
    newUser.id = newId;
    if (!newUser.password) {
      newUser.password = 'password123';
    }
    newUser.joinDate = new Date().toLocaleDateString();
    this.users.unshift(newUser);
    this.closeModal();
    this.currentPage = 1; // Reset to first page when adding a new user
  }

  // Handle updating an existing user
  handleUserUpdated(updatedUser: User): void {
    const index = this.users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
    }
    this.closeModal();
  }

  // Delete a user from the list
  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.users = this.users.filter((u) => u.id !== user.id);
      // Adjust current page if necessary
      if (this.paginatedUsers.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }

  // Close the modal
  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  // Toggle the sort dropdown visibility
  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
    this.showSavedSearchDropdown = false;
  }

  // Sort users based on the selected option
  sortUsers(option: string): void {
    this.currentSort = option;
    this.showSortDropdown = false;

    switch (option) {
      case 'Name (A-Z)':
        this.users.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z-A)':
        this.users.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Email (A-Z)':
        this.users.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'Email (Z-A)':
        this.users.sort((a, b) => b.email.localeCompare(a.email));
        break;
      case 'Join Date (Newest)':
        this.users.sort(
          (a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        );
        break;
      case 'Join Date (Oldest)':
        this.users.sort(
          (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
        );
        break;
    }
    this.currentPage = 1; // Reset to first page when sorting
  }

  // Toggle the saved search dropdown visibility
  toggleSavedSearchDropdown(): void {
    this.showSavedSearchDropdown = !this.showSavedSearchDropdown;
    this.showSortDropdown = false;
  }

  // Apply a saved search
  applySavedSearch(search: SavedSearch): void {
    this.searchTerm = search.term;
    this.showSavedSearchDropdown = false;
    this.currentPage = 1; // Reset to first page when applying a saved search
  }
}
