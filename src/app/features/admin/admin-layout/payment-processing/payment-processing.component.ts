import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Payment {
  transactionId: string;
  date: string;
  amount: number;
  method: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

@Component({
  selector: 'app-payment-processing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.css']
})
export class PaymentProcessingComponent implements OnInit {
  itemsPerPageOptions: number[] = [5, 10, 20, 50];
  allPayments: Payment[] = [];
  displayedPayments: Payment[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  totalItems = 0;
  totalPages = 0;
  searchTerm = '';
  sortCriterion: 'date' | 'amount' | 'status' = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    // Simulating API call to load payments
    this.allPayments = [
      { transactionId: 'TX001', date: '2024-10-09', amount: 100.00, method: 'Credit Card', status: 'Completed' },
      { transactionId: 'TX002', date: '2024-10-08', amount: 75.50, method: 'PayPal', status: 'Pending' },
      { transactionId: 'TX003', date: '2024-10-07', amount: 200.00, method: 'Bank Transfer', status: 'Failed' },
      { transactionId: 'TX004', date: '2024-10-06', amount: 150.25, method: 'Credit Card', status: 'Completed' },
      { transactionId: 'TX005', date: '2024-10-05', amount: 50.00, method: 'PayPal', status: 'Pending' },
    ];
    this.filterAndSortPayments();
  }

  filterAndSortPayments() {
    let filteredPayments = this.allPayments;

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filteredPayments = filteredPayments.filter(payment => 
        payment.transactionId.toLowerCase().includes(searchLower) ||
        payment.method.toLowerCase().includes(searchLower) ||
        payment.status.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filteredPayments.sort((a, b) => {
      let comparison = 0;
      if (this.sortCriterion === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (this.sortCriterion === 'amount') {
        comparison = a.amount - b.amount;
      } else {
        comparison = a.status.localeCompare(b.status);
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.totalItems = filteredPayments.length;
    this.calculateTotalPages();

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedPayments = filteredPayments.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearch() {
    this.currentPage = 1;
    this.filterAndSortPayments();
  }

  onSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filterAndSortPayments();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.calculateTotalPages();
    this.filterAndSortPayments();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterAndSortPayments();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterAndSortPayments();
    }
  }

  get currentPageRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end}`;
  }
}