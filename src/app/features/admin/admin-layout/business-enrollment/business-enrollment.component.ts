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
  itemsPerPageOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
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
    }
  ];

  get users(): User[] {
    if (!this.searchQuery) {
      return this.allUsers;
    }

    const query = this.searchQuery.toLowerCase();
    return this.allUsers.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.address.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query)
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }
}