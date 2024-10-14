import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environments.prod';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  registration_date: string;
  role: string;
}

interface SavedSearch {
  name: string;
  query: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserManagementComponent implements OnInit {
  private supabase: SupabaseClient;
  searchTerm: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  itemsPerPageOptions: number[] = [5, 10, 20, 50];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  itemsRange: string = '';
  loading: boolean = true;
  error: string | null = null;
  showModal: boolean = false;
  selectedUser: User | null = null;
  showSortDropdown: boolean = false;
  showSavedSearchDropdown: boolean = false;
  currentSort: string = 'Name (A-Z)';
  sortOptions: string[] = ['Name (A-Z)', 'Name (Z-A)', 'Email (A-Z)', 'Email (Z-A)', 'Join Date (Newest)', 'Join Date (Oldest)'];
  savedSearches: SavedSearch[] = [
    { name: 'Admin Users', query: 'role:Admin' },
    { name: 'Recent Joins', query: 'join_date:>2023-01-01' }
  ];

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async ngOnInit() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.loading = true;
      const { data, error } = await this.supabase
        .from('usermanagement')
        .select('id, name, email, phone, registration_date, role');

      if (error) throw error;

      this.users = data;
      this.applyFiltersAndPagination();
    } catch (err) {
      if (err instanceof Error) {
        this.error = err.message;
      } else {
        this.error = 'An unknown error occurred';
      }
    } finally {
      this.loading = false;
    }
  }


  applyFiltersAndPagination() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm) ||
      user.registration_date.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
    this.updateItemsRange();
  }

  updateItemsRange() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredUsers.length);
    this.itemsRange = `${start}-${end} of ${this.filteredUsers.length}`;
  }

  onItemsPerPageChange(event: Event) {
    this.itemsPerPage = parseInt((event.target as HTMLSelectElement).value);
    this.applyFiltersAndPagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  openAddUserModal() {
    this.selectedUser = null;
    this.showModal = true;
  }

  openEditUserModal(user: User) {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
  }

  async handleUserAdded(user: User) {
    try {
      const { data, error } = await this.supabase
        .from('usermanagement')
        .insert([user])
        .select();

      if (error) throw error;

      this.users.push(data[0]);
      this.applyFiltersAndPagination();
      this.closeModal();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  async handleUserUpdated(updatedUser: User) {
    try {
      const { error } = await this.supabase
        .from('usermanagement')
        .update(updatedUser)
        .eq('id', updatedUser.id);

      if (error) throw error;

      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
        this.applyFiltersAndPagination();
      }
      this.closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  async deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        const { error } = await this.supabase
          .from('usermanagement')
          .delete()
          .eq('id', user.id);

        if (error) throw error;

        this.users = this.users.filter(u => u.id !== user.id);
        this.applyFiltersAndPagination();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }

  toggleSavedSearchDropdown() {
    this.showSavedSearchDropdown = !this.showSavedSearchDropdown;
  }

  sortUsers(option: string) {
    this.currentSort = option;
    this.showSortDropdown = false;

    switch (option) {
      case 'Name (A-Z)':
        this.filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z-A)':
        this.filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Email (A-Z)':
        this.filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'Email (Z-A)':
        this.filteredUsers.sort((a, b) => b.email.localeCompare(a.email));
        break;
      case 'Join Date (Newest)':
        this.filteredUsers.sort((a, b) => new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime());
        break;
      case 'Join Date (Oldest)':
        this.filteredUsers.sort((a, b) => new Date(a.registration_date).getTime() - new Date(b.registration_date).getTime());
        break;
    }

    this.updatePaginatedUsers();
  }

  applySavedSearch(search: SavedSearch) {
    this.searchTerm = search.query;
    this.showSavedSearchDropdown = false;
    this.applyFiltersAndPagination();
  }
}
