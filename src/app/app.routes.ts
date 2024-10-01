import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from './core/guards/role-guard.guard';
import { AuthLayoutComponent } from './features/auth/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './features/user/user-layout/user-layout.component';
import { UDashboardComponent } from './features/user/user-layout/u-dashboard/u-dashboard.component';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { ADashboardComponent } from './features/admin/admin-layout/a-dashboard/a-dashboard.component';

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
    ],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
