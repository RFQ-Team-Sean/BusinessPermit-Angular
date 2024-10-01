import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule here

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [FormsModule],  // Include FormsModule to enable ngModel
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']  // Fix typo: should be 'styleUrls' instead of 'styleUrl'
})
export class AuthLayoutComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if user is already logged in
    const userRole = localStorage.getItem('userRole');

    if (userRole) {
      // Redirect to the appropriate dashboard
      this.redirectToDashboard(userRole);
    }
  }

  loginWithPredefinedAccount(role: 'user' | 'admin') {
    // Predefined accounts based on role
    let email = '';
    let password = '';

    switch (role) {
      case 'user':
        email = 'james@gmail.com';
        password = 'password';
        break;
      case 'admin':
        email = 'adam@admin.com';
        password = 'password';
        break;
    }

    // Set the predefined credentials
    this.email = email;
    this.password = password;

    // Authenticate user with predefined accounts
    this.login();
  }

  // Make this method public since it's called in the template
  login() {
    try {
      // For predefined accounts, authenticate based on static role mapping
      let userRole: string | null = null;

      if (this.email === 'james@gmail.com' && this.password === 'password') {
        userRole = 'user';
      } else if (this.email === 'adam@admin.com' && this.password === 'password') {
        userRole = 'admin';
      } else {
        alert('Invalid credentials. Please try again.');
        return;
      }

      // Store the userRole in localStorage
      localStorage.setItem('userRole', userRole);

      // Redirect to the appropriate dashboard
      this.redirectToDashboard(userRole);
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  }

  // Helper function to redirect to the appropriate dashboard
  private redirectToDashboard(userRole: string) {
    switch (userRole) {
      case 'user':
        this.router.navigate(['/user/dashboard']);
        break;
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        console.error('Unknown role:', userRole);
        alert('Unknown user role.');
    }
  }
}
