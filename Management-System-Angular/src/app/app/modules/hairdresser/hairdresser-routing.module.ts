import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './hairdresser-component/dashboard/dashboard.component';
import { HairdresserVerifyPasswordComponent } from '../admin/admin-components/hairdresser-management/hairdresser-verifyPassword/hairdresser-verifyPassword.component';
import { HairdresserProfileComponent } from '../admin/admin-components/hairdresser-management/hairdresser-profile/hairdresser-profile.component';
const routes: Routes = [
  {
    path: "hairdresser/dashboard/:hairdresser_id",
    component: DashboardComponent,
  },
  {
    path: 'hairdresser/verify-password',
    component: HairdresserVerifyPasswordComponent,
  },
  {
    path: 'hairdresser/profile/:hairdresser_id',
    component: HairdresserProfileComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HairdresserRoutingModule { }
