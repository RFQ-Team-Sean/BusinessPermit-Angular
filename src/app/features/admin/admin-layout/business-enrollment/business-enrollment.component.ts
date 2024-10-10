import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  address: string;
  phone: string;
  joinDate: string;
  status: string;
  action: string;
}

@Component({
  selector: 'app-business-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-enrollment.component.html',
  styleUrl: './business-enrollment.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BusinessEnrollmentComponent {
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15, 20, 25];
  searchQuery: string = '';
  showModal: boolean = false;
  sortOption: keyof User = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  savedSearches: string[] = ['Recent Approvals', 'Pending Reviews', 'Rejected Applications'];
  selectedSavedSearch: string = '';
  sortMenuOpen: boolean = false;
  savedSearchMenuOpen: boolean = false;

  sortOptions: { key: keyof User; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address' },
    { key: 'phone', label: 'Phone' },
    { key: 'joinDate', label: 'Registration Date' },
    { key: 'status', label: 'Status' }
  ];

  newUser: User = {
    name: '',
    address: '',
    phone: '',
    joinDate: new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    status: 'pending',
    action: 'Approve'
  };

  allUsers: User[] = [
    {
      name: 'Angelo John Calleja',
      address: '123 Main St, San Francisco, CA',
      phone: '415-555-1234',
      joinDate: 'Jan 1, 2023',
      status: 'approved',
      action: 'Send notification'
    },
    {
      name: 'Maria Clara',
      address: '456 Elm St, San Francisco, CA',
      phone: '415-555-5678',
      joinDate: 'Feb 15, 2023',
      status: 'pending',
      action: 'Approve'
    },
    {
      name: 'Andres Bonifacio',
      address: '789 Oak St, San Francisco, CA',
      phone: '415-555-9012',
      joinDate: 'Mar 30, 2023',
      status: 'rejected',
      action: 'Reject'
    },
    {
      name: 'Jose Rizal',
      address: '321 Pine St, San Francisco, CA',
      phone: '415-555-3456',
      joinDate: 'Apr 5, 2023',
      status: 'approved',
      action: 'Send notification'
    },
    {
      name: 'Juan Luna',
      address: '654 Birch St, San Francisco, CA',
      phone: '415-555-7890',
      joinDate: 'May 20, 2023',
      status: 'approved',
      action: 'Approve'
    },
    {
      name: 'Juancho',
      address: '654 Birch St, San Francisco, CA',
      phone: '415-555-7890',
      joinDate: 'May 20, 2023',
      status: 'approved',
      action: 'Approve'
    },
    {
      name: 'Pepito',
      address: '654 Birch St, San Francisco, CA',
      phone: '415-555-7890',
      joinDate: 'May 20, 2023',
      status: 'approved',
      action: 'Approve'
    },
    {
      name: 'Tommy',
      address: '654 Birch St, San Francisco, CA',
      phone: '415-555-7890',
      joinDate: 'May 20, 2023',
      status: 'approved',
      action: 'Approve'
    }
  ];

  openModal(): void {
    this.showModal = true;
    this.resetNewUser();
  }

  closeModal(): void {
    this.showModal = false;
  }

  resetNewUser(): void {
    this.newUser = {
      name: '',
      address: '',
      phone: '',
      joinDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      status: 'pending',
      action: 'Approve'
    };
  }

  addUser(): void {
    if (this.validateNewUser()) {
      this.allUsers.unshift({ ...this.newUser });
      this.closeModal();
      this.currentPage = 1;
      this.sortUsers(this.sortOption);
    }
  }

  validateNewUser(): boolean {
    return !!(this.newUser.name && this.newUser.address && this.newUser.phone);
  }

  sortUsers(option: keyof User): void {
    if (this.sortOption === option) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOption = option;
      this.sortDirection = 'asc';
    }
    
    this.allUsers.sort((a, b) => {
      if (a[option] < b[option]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[option] > b[option]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  applySavedSearch(search: string): void {
    this.selectedSavedSearch = search;
    this.searchQuery = '';
    this.currentPage = 1;

    switch (search) {
      case 'Recent Approvals':
        this.searchQuery = 'approved';
        break;
      case 'Pending Reviews':
        this.searchQuery = 'pending';
        break;
      case 'Rejected Applications':
        this.searchQuery = 'rejected';
        break;
      default:
        break;
    }
  }

  get users(): User[] {
    let filteredUsers = this.allUsers;
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filteredUsers = this.allUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.address.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query)
      );
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    return filteredUsers.slice(startIndex, endIndex);
  }

  get totalItems(): number {
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      return this.allUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.address.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query)
      ).length;
    }
    return this.allUsers.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get itemsRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end} of ${this.totalItems}`;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onItemsPerPageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(select.value);
    this.currentPage = 1;
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.currentPage = 1;
    this.selectedSavedSearch = '';
  }
}