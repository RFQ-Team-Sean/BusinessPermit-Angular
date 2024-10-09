import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgFor and other directives

interface User {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule to imports
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserManagementComponent {
  itemsPerPageOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
    users: User[] = [
      {
        name: 'Angelo John Calleja',
        email: 'wintheiser_enos@yahoo.com',
        phone: '415-555-1234',
        joinDate: 'Jan 1, 2023',
        role: 'User'
      },
      {
        name: 'Angelo John Calleja',
        email: 'wintheiser_enos@yahoo.com',
        phone: '415-555-5678',
        joinDate: 'Feb 15, 2023',
        role: 'Admin'
      },
      {
        name: 'Angelo John Calleja',
        email: 'wintheiser_enos@yahoo.com',
        phone: '415-555-9012',
        joinDate: 'Mar 30, 2023',
        role: 'User'
      },
      {
        name: 'Angelo John Calleja',
        email: 'wintheiser_enos@yahoo.com',
        phone: '415-555-3456',
        joinDate: 'Apr 5, 2023',
        role: 'User'
      },
      {
        name: 'Angelo John Calleja',
        email: 'wintheiser_enos@yahoo.com',
        phone: '415-555-7890',
        joinDate: 'May 20, 2023',
        role: 'User'
      }
    ];
}
