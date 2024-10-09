import { Component, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarServiceService } from '../../../core/services/SidebarService/sidebar-service.service';
import { MenuService } from '../../../core/services/menu-service.service';

interface MenuItem {
  label: string;
  icon?: string;
  route: string;
  svgIcon?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent implements OnInit {
  @Output() collapsedChange = new EventEmitter<boolean>();
  isCollapsed: boolean = false;

  UserMenu: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'material-symbols:dashboard',
      route: '/user/dashboard',
    },
  ];

  AdminMenu: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'material-symbols:dashboard',
      route: '/admin/dashboard',
    },
    {
      label: 'User Management',
      icon: 'fa-solid:user-cog',
      route: '/admin/user-management',
    },
    {
      label: 'Business Enrollment',
      icon: 'fa-solid:business-time',
      route: '/admin/business-enrollment',
    },
    {
      label: 'Permit Application Processing',
      icon: 'mdi:file-clock',
      route: '/admin/permit-application',
    },
    {
      label: 'Payment Processing',
      icon: 'material-symbols:payments-rounded',
      route: '/admin/payment-processing',
    },
    {
      label: 'Reports',
      icon: 'lucide:clipboard-list',
      route: '/admin/admin-reports',
    }
  ];

  generalMenu: MenuItem[] = [
    {
      label: 'Report a Problem',
      icon: 'weui:report-problem-filled',
      route: '#',
    },
    {
      label: 'Sign Out',
      icon: 'lets-icons:sign-out-squre',
      route: '#',
    },
  ];

  currentMenu: MenuItem[] = [];
  othersMenu: MenuItem[] = [];

  constructor(
    private router: Router,
    private sidebarService: SidebarServiceService,
    private menuService: MenuService
  ) {}

  onMenuItemClick(label: string) {
    if (label !== 'Sign Out') {
      this.menuService.setSelectedMenuLabel(label);
    }
  }

  ngOnInit() {
    this.setMenuByRole();
    this.sidebarService.isCollapsed$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
      this.collapsedChange.emit(this.isCollapsed);
    });
  }

  setMenuByRole() {
    const userRole = localStorage.getItem('userRole') as 'user' | 'admin';
    console.log('User Role:', userRole);
    switch (userRole) {
      case 'user':
        this.currentMenu = [...this.UserMenu];
        break;
      case 'admin':
        this.currentMenu = [...this.AdminMenu];
        break;
      default:
        console.error('Invalid role');
        this.router.navigate(['/login']);
    }
    this.othersMenu = [...this.generalMenu];
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  signOut() {
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  getSvgPath(svgIcon: string): string | null {
    switch (svgIcon) {
      case 'meet-icon':
        return 'M25.001 ... Z'; // Truncated for brevity
      case 'speech-lab-icon':
        return 'M25.251 ... Z'; // Truncated for brevity
      case 'text-to-speech-icon':
        return 'M18.24 ... Z'; // Truncated for brevity
      case 'speech-analyzer-icon':
        return null;
      default:
        return '';
    }
  }

  getMenuItemClasses(): string {
    return `flex items-center py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 glassmorph group`;
  }

  getTextClasses(): string {
    return this.isCollapsed ? 'hidden sidebar-hover-text' : 'block sidebar-text';
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }

  getMenuItemColor(route: string): string {
    return this.isActive(route) ? 'yellow' : 'white';
  }
}