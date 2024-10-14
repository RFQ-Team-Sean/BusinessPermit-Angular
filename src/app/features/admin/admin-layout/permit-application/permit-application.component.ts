import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { PermitApplicationModalComponent } from './permit-application-modal/permit-application-modal.component';

interface User {
  application_no: string;
  business_name: string;
  subdate: string;
  status: string;
}

@Component({
  selector: 'app-permit-application',
  standalone: true,
  imports: [CommonModule, FormsModule, PermitApplicationModalComponent],
  templateUrl: './permit-application.component.html',
  styleUrls: ['./permit-application.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PermitApplicationComponent {
  itemsPerPage = 10;
  currentPage = 1;
  totalItems = 0;
  totalPages = 0;
  searchTerm = '';
  sortCriterion: 'subdate' | 'status' = 'subdate';
  sortDirection: 'asc' | 'desc' = 'asc'; // Changed default to 'asc'
  filteredStatus: string = '';
  activeTab: string = 'all';
  searchQuery = '';
  // Existing properties
  isModalOpen: boolean = false;
  selectedUser: User | null = null;

  // Existing methods...

  openModal(user: User) {
    this.selectedUser = user; // Set the selected user to display in the modal
    this.isModalOpen = true;  // Open the modal
  }

  closeModal() {
    this.isModalOpen = false; // Close the modal
    this.selectedUser = null; // Reset the selected user
  }

  users: User[] = [
    {
      application_no: '#123',
      business_name: 'Sunset Laundry',
      subdate: 'Jan 1, 2023',
      status: 'Pending review'
    },
    {
      application_no: '#1232',
      business_name: 'Taste of Italy',
      subdate: 'Feb 15, 2023',
      status: 'In progress'
    },
    {
      application_no: '#1236',
      business_name: 'City Fitness',
      subdate: 'Mar 30, 2023',
      status: 'In progress'
    },
    {
      application_no: '#1239',
      business_name: 'Downtown Cafe',
      subdate: 'Apr 5, 2023',
      status: 'Approved'
    },
    {
      application_no: '#12321',
      business_name: 'Golden Gate Florist',
      subdate: 'May 20, 2023',
      status: 'Rejected'
    },
    {
      application_no: '#12322',
      business_name: 'Golden Gate Florist',
      subdate: 'May 21, 2023',
      status: 'Approved'
    }
  ];

  showSortDropdown: boolean = false;
  currentSort: string = 'Application# (A-Z)';
  sortOptions: string[] = [
    'Application# (A-Z)', 
    'Application# (Z-A)', 
    'BusinessName (A-Z)', 
    'BusinessName (Z-A)', 
    'SubmittedDate (Newest)', 
    'SubmittedDate (Oldest)'
  ];

  displayedUsers: User[] = [];
  itemsPerPageOptions: number[] = [5, 10, 15, 20];

  ngOnInit() {
    this.filterAndSortPermit();
  }

  onFilterByStatus(status: string) {
    this.filteredStatus = status;
    this.currentPage = 1; 
    this.filterAndSortPermit();
    this.activeTab = status;
  }

  getStatusCounts() {
    const statusCounts = {
      all: this.users.length,
      inProgress: 0,
      pendingReview: 0,
      approved: 0,
      rejected: 0
    };
  
    this.users.forEach(user => {
      switch (user.status.toLowerCase()) {
        case 'in progress':
          statusCounts.inProgress++;
          break;
        case 'pending review':
          statusCounts.pendingReview++;
          break;
        case 'approved':
          statusCounts.approved++;
          break;
        case 'rejected':
          statusCounts.rejected++;
          break;
      }
    });
  
    return statusCounts;
  }
  
  filterAndSortPermit() {
    let filteredUsers = this.users.filter(user => {
      const matchesStatus = !this.filteredStatus || this.filteredStatus === 'all' || user.status.toLowerCase() === this.filteredStatus.toLowerCase();
      const matchesSearchQuery = !this.searchQuery || 
        user.business_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.application_no.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearchQuery;
    });

    // Sort the filtered users based on the selected criterion
    this.sortUsers(filteredUsers);

    this.totalItems = filteredUsers.length;
    this.calculateTotalPages();
  
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedUsers = filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  sortUsers(usersToSort: User[]) {
    usersToSort.sort((a, b) => {
      let comparison = 0;

      if (this.currentSort.startsWith('Application#')) {
        comparison = this.currentSort === 'Application# (A-Z)'
          ? a.application_no.localeCompare(b.application_no)
          : b.application_no.localeCompare(a.application_no);
      } else if (this.currentSort.startsWith('BusinessName')) {
        comparison = this.currentSort === 'BusinessName (A-Z)'
          ? a.business_name.localeCompare(b.business_name)
          : b.business_name.localeCompare(a.business_name);
      } else if (this.currentSort.startsWith('SubmittedDate')) {
        comparison = this.currentSort === 'SubmittedDate (Newest)'
          ? new Date(b.subdate).getTime() - new Date(a.subdate).getTime()
          : new Date(a.subdate).getTime() - new Date(b.subdate).getTime();
      }

      return comparison;
    });
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.calculateTotalPages();
    this.filterAndSortPermit();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterAndSortPermit();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterAndSortPermit();
    }
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get currentPageRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end}`;
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.currentPage = 1;
    this.filterAndSortPermit();
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  sortUsersByOption(option: string): void {
    this.currentSort = option;
    this.showSortDropdown = false;
    this.filterAndSortPermit(); // Call filter and sort after setting the sort option
  }

  toggleSavedSearchDropdown(): void {
    this.showSortDropdown = false;
  }

  
}
