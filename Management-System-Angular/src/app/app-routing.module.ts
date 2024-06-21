import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AppComponent } from './app.component';
import { noAuthGuard } from './auth/guards/no-auth-guard/no-auth.guard';
import { userGuard } from './auth/guards/user-guard/user.guard';
import { adminGuard } from './auth/guards/admin-guard/admin.guard';
import { HairdresserEditComponent } from './modules/admin/admin-components/hairdresser-management/hairdresser-edit/hairdresser-edit.component';
import { HairdresserVerifyPasswordComponent } from './modules/admin/admin-components/hairdresser-management/hairdresser-verifyPassword/hairdresser-verifyPassword.component';
import { HairdresserProfileComponent } from './modules/admin/admin-components/hairdresser-management/hairdresser-profile/hairdresser-profile.component';
import { ServiceManagementComponent } from './modules/admin/admin-components/service-management/service-management.component';
import { ServiceEditComponent } from './modules/admin/admin-components/service-management/service-edit/service-edit.component';
import { ServicesListComponent } from './modules/user/user-component/services-list/services-list.component';
import { ServicesDetailsComponent } from './modules/user/user-component/services-details/services-details.component';
import { HairdressersListComponent } from './modules/user/user-component/hairdressers-list/hairdressers-list.component';
import { DateComponent } from './modules/user/user-component/date/date.component';
import { DashboardComponent } from './modules/hairdresser/hairdresser-component/dashboard/dashboard.component';
import { PaymentComponent } from './modules/user/user-component/payment/payment.component';
import { ReservationComponent } from './modules/user/user-component/reservation/reservation.component';
import { NotificationComponent } from './modules/user/user-component/notification/notification.component';
import { ReviewModalComponent } from './modules/user/user-component/review-modal/review-modal.component';
import { EditReviewComponent } from './modules/user/user-component/edit-review/edit-review.component';

const routes: Routes = [
  
    {
    path: "login", component: LoginComponent,
    canActivate: [noAuthGuard]
    },
    {
    path: "registration", component: RegistrationComponent
    },

    {
      path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m=> m.AdminModule),
      
    },
    {
      path: "user", loadChildren: () => import("./modules/user/user.module").then(m=> m.UserModule),
      
    },
    { path: "edit/:id", component: HairdresserEditComponent

   },
  {
    path: "addService",
    component: ServiceManagementComponent
  },
  {
    path: "editService/:id",
    component: ServiceEditComponent 
  },
  {
    path: "hairdresser/dashboard/:hairdresser_id",
    component: DashboardComponent,
  },
  { 
    path: 'user/dashboard/services', component: ServicesListComponent
   },

  { 
    path: 'user/dashboard/services/:id', component: ServicesDetailsComponent
   }, 
  
   {
    path: 'hairdressers/:serviceId',
    component: HairdressersListComponent
  },
  {
    path: 'appointment/:serviceId/:hairdresserId',
    component: DateComponent
  },
  {
    path: "hairdresser/verify-password",
    component: HairdresserVerifyPasswordComponent,
  },
  {
    path: 'hairdresser/profile/:hairdresser_id',
    component: HairdresserProfileComponent,
  },
  { path: 'platnosc/:reservationId', 
  component: PaymentComponent
 },
 { path: 'user/yourreservations', 
 component: ReservationComponent
},
{ path: 'user/notifications', 
 component: NotificationComponent
},
{
  path : 'add-review/:reservationId/:hairdresserId',
  component : ReviewModalComponent
},
{
  path : 'edit-review/:reviewId',
  component : EditReviewComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
