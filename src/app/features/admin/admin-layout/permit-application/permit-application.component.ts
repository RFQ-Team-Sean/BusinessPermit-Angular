import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgFor and other directives

interface User {
  application_no: string;
  business_name: string;
  subdate: string;
  status: string;
  action: string;
}

@Component({
  selector: 'app-permit-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permit-application.component.html',
  styleUrl: './permit-application.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PermitApplicationComponent {
  itemsPerPageOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  users: User[] = [
    {
      application_no: '#123',
      business_name: 'Sunset Laundry',
      subdate: 'Jan 1, 2023',
      status: 'Pending review',
      action: 'Review'
    },
    {
      application_no: '#1232',
      business_name: 'Taste of Italy',
      subdate: 'Feb 15, 2023',
      status: 'In progress',
      action: 'Review'
    },
    {
      application_no: '#1236',
      business_name: 'City Fitness',
      subdate: 'Mar 30, 2023',
      status: 'In progress',
      action: 'Review'
    },
    {
      application_no: '#1239',
      business_name: 'Downtown Cafe',
      subdate: 'Apr 5, 2023',
      status: 'approved',
      action: 'Review'
    },
    {
      application_no: '#12321',
      business_name: 'Golden Gate Florist',
      subdate: 'May 20, 2023',
      status: 'approved',
      action: 'View'
    }
  ];
}
