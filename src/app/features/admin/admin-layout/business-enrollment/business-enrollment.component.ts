import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgFor and other directives

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
  imports: [CommonModule],
  templateUrl: './business-enrollment.component.html',
  styleUrl: './business-enrollment.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BusinessEnrollmentComponent {
  itemsPerPageOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  users: User[] = [
    {
      name: 'Angelo John Calleja',
      address: '123 Main St, San Francisco, CA',
      phone: '415-555-1234',
      joinDate: 'Jan 1, 2023',
      status: 'approved',
      action: 'Send notification'
    },
    {
      name: 'Angelo John Calleja',
      address: '456 Elm St, San Francisco, CA',
      phone: '415-555-5678',
      joinDate: 'Feb 15, 2023',
      status: 'pending',
      action: 'Approve'
    },
    {
      name: 'Angelo John Calleja',
      address: '789 Oak St, San Francisco, CA',
      phone: '415-555-9012',
      joinDate: 'Mar 30, 2023',
      status: 'rejected',
      action: 'Reject'
    },
    {
      name: 'Angelo John Calleja',
      address: '321 Pine St, San Francisco, CA',
      phone: '415-555-3456',
      joinDate: 'Apr 5, 2023',
      status: 'approved',
      action: 'Send notification'
    },
    {
      name: 'Angelo John Calleja',
      address: '654 Birch St, San Francisco, CA',
      phone: '415-555-7890',
      joinDate: 'May 20, 2023',
      status: 'approved',
      action: 'Approve'
    }
  ];
}
