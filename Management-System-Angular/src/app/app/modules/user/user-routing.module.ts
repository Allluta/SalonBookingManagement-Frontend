import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user-component/dashboard/dashboard.component';
import { userGuard } from 'src/app/auth/guards/user-guard/user.guard';
import { HairdressersListComponent } from './user-component/hairdressers-list/hairdressers-list.component';
import { ServicesDetailsComponent } from './user-component/services-details/services-details.component';
import { ServicesListComponent } from './user-component/services-list/services-list.component';
import { DateComponent } from './user-component/date/date.component';
import { PaymentComponent } from './user-component/payment/payment.component';
import { ReservationComponent } from './user-component/reservation/reservation.component';
import { NotificationComponent } from './user-component/notification/notification.component';
import { ReviewModalComponent } from './user-component/review-modal/review-modal.component';
import { EditReviewComponent } from './user-component/edit-review/edit-review.component';
const routes: Routes = [

  { 
    path : "dashboard", component: DashboardComponent,
    canActivate: [userGuard]
  },
  { 
    path: 'user/dashboard/services', component: ServicesListComponent
   },

  { 
    path: "user/dashboard/services/:id", component: ServicesDetailsComponent
   }, 
  { 
    path: '', redirectTo: '/services', pathMatch: 'full' 
  },
  {
    path: 'hairdressers/:serviceId',
    component: HairdressersListComponent
  },
  {
    path: 'appointment/:serviceId/:hairdresserId',
    component: DateComponent
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
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
