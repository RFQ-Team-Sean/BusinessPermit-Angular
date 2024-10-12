import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddBusinessUserModalComponent } from './add-business-user-modal/add-business-user-modal.component';

interface User {
  name: string;
  address: string;
  phone: string;
  joinDate: string;
  status: string;
  action: string;
  addedTimestamp: number;
}

type SortableUserKey = keyof Omit<User, 'action' | 'addedTimestamp'>;

@Component({
  selector: 'app-business-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule, AddBusinessUserModalComponent],
  templateUrl: './business-enrollment.component.html',
  styleUrls: ['./business-enrollment.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BusinessEnrollmentComponent {
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15, 20, 25];
  searchQuery: string = '';
  showModal: boolean = false;
  sortOption: SortableUserKey = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  savedSearches: string[] = ['Recent Approvals', 'Pending Reviews', 'Rejected Applications'];
  selectedSavedSearch: string = '';
  sortMenuOpen: boolean = false;
  savedSearchMenuOpen: boolean = false;

  sortOptions: { key: SortableUserKey; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address' },
    { key: 'phone', label: 'Phone' },
    { key: 'joinDate', label: 'Registration Date' },
    { key: 'status', label: 'Status' }
  ];

  allUsers: User[] = [
    {
      name: 'Angelo John Calleja',
      address: '123 Main St, San Francisco, CA',
      phone: '415-555-1234',
      joinDate: 'Jan 1, 2023',
      status: 'approved',
      action: 'Send notification',
      addedTimestamp: Date.now() - 5000000
    },
    {
      name: 'Maria Clara',
      address: '456 Elm St, San Francisco, CA',
      phone: '415-555-5678',
      joinDate: 'Feb 15, 2023',
      status: 'pending',
      action: 'Approve',
      addedTimestamp: Date.now() - 4000000
    },
    {
      name: 'Jose Rizal',
      address: '321 Pine St, San Francisco, CA',
      phone: '415-555-3456',
      joinDate: 'Apr 5, 2023',
      status: 'pending',
      action: 'Send notification',
      addedTimestamp: Date.now() - 2000000
    },
    {
      name: 'Juan Luna',
      address: '654 Birch St, San Francisco, CA',
      phone: '415-555-7890',
      joinDate: 'May 20, 2023',
      status: 'approved',
      action: 'Send notification',
      addedTimestamp: Date.now() - 1000000
    }
  ];

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleAddUser(newUser: User): void {
    this.allUsers.unshift({ ...newUser, addedTimestamp: Date.now() });
    this.closeModal();
    this.currentPage = 1;
    this.sortUsers(this.sortOption);
  }
  handleAction(user: User, action?: 'approve' | 'reject'): void {
    if (user.status === 'pending' && action) {
      if (action === 'approve') {
        user.status = 'approved';
        user.action = 'Send notification';
      } else if (action === 'reject') {
        user.status = 'rejected';
        user.action = 'Send notification';
      }
    } else {
      switch (user.action) {
        case 'Approve':
          user.status = 'approved';
          user.action = 'Send notification';
          break;
        case 'Send notification':
          this.sendNotification(user);
          break;
      }
    }
  }

  sendNotification(user: User): void {
    // Implement notification logic here
    console.log(`Notification sent to ${user.name}`);
    // After sending notification, you might want to change the action
    // For example, you could set it back to 'Approve' for rejected businesses
    if (user.status === 'rejected') {
      user.action = 'Send notification';
    }
  }

  getActionLabel(action: string): string {
    return action;
  }

  sortUsers(option: SortableUserKey): void {
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

  getSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.key === this.sortOption);
    return option ? option.label : 'Name';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  }

  getActionClass(action: string): string {
    switch (action) {
      case 'Approve':
        return 'text-blue-600';
      case 'Reject':
        return 'text-red-600';
      case 'Send notification':
        return 'text-gray-600';
      default:
        return '';
    }
  }
}