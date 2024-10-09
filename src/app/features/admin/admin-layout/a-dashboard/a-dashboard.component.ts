import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-a-dashboard',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule to the imports array
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css']
})
export class ADashboardComponent {
manageUsers() {
throw new Error('Method not implemented.');
}
  stats = [
    { title: 'New Users', value: '5,000' },
    { title: 'Pending Applications', value: '2,500' },
    { title: 'Pending Business Enrollments', value: '3,000' },
    { title: 'Pending Payments', value: '1,000' }
  ];
}
