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

   // Getter for paginated and filtered users
   get users(): User[] {
    let filteredUsers = this.allUsers;
    
    // Apply search filter if query exists
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filteredUsers = this.allUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.address.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query)
      );
    }

      // Calculate pagination
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      
      return filteredUsers.slice(startIndex, endIndex);
    }

    // Get total number of filtered items
  get totalItems(): number {
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      return this.allUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.address.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query)
      ).length;
    }
    return this.allUsers.length;
  }

  // Get total number of pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Get display text for current range of items
  get itemsRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end} of ${this.totalItems}`;
  }

  // Navigation methods
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

  // Handle items per page change
  onItemsPerPageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(select.value);
    this.currentPage = 1; // Reset to first page when changing items per page
  }

  // Search method
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.currentPage = 1; // Reset to first page when searching
  }
}
