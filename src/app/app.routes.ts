import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from './core/guards/role-guard.guard';
import { AuthLayoutComponent } from './features/auth/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './features/user/user-layout/user-layout.component';
import { UDashboardComponent } from './features/user/user-layout/u-dashboard/u-dashboard.component';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { ADashboardComponent } from './features/admin/admin-layout/a-dashboard/a-dashboard.component';
import { UserManagementComponent } from './features/admin/admin-layout/user-management/user-management.component';
import { BusinessEnrollmentComponent } from './features/admin/admin-layout/business-enrollment/business-enrollment.component';
import { PermitApplicationComponent } from './features/admin/admin-layout/permit-application/permit-application.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthLayoutComponent },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [roleGuard],
    data: { expectedRole: ['user'] },
    children: [
      { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UDashboardComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [roleGuard],
    data: { expectedRole: ['admin'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ADashboardComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'business-enrollment', component: BusinessEnrollmentComponent },
      { path: 'permit-application', component: PermitApplicationComponent },
    ],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
