import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { HairdresserManagementComponent } from './admin-components/hairdresser-management/hairdresser-management.component';
import { adminGuard } from 'src/app/auth/guards/admin-guard/admin.guard';
import { HairdresserEditComponent } from './admin-components/hairdresser-management/hairdresser-edit/hairdresser-edit.component';
import { HairdresserVerifyPasswordComponent } from './admin-components/hairdresser-management/hairdresser-verifyPassword/hairdresser-verifyPassword.component';
import { HairdresserProfileComponent } from './admin-components/hairdresser-management/hairdresser-profile/hairdresser-profile.component';
import { ErrorMessageComponent } from 'src/app/error-message/error-message.component';
import { ServiceManagementComponent } from './admin-components/service-management/service-management.component';
import { ServiceEditComponent } from './admin-components/service-management/service-edit/service-edit.component';

const routes: Routes = [

  {
    path: "dashboard", 
    component: DashboardComponent,
    canActivate: [adminGuard]
},

{   path: "addHairdresser", 
component: HairdresserManagementComponent
},
{
  path: "edit/:id",
  component: HairdresserEditComponent
},
{
  path: "verifyPassword/:id",
  component: HairdresserVerifyPasswordComponent
},
{
  path: "profile/:hairdresserId",
  component: HairdresserProfileComponent
},
{
  path: "addService",
  component: ServiceManagementComponent
},
{
  path: "editService/:id",
  component: ServiceEditComponent 
}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
