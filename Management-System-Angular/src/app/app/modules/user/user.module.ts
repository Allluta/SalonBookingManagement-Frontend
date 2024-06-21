import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './user-component/date/date.component';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './user-component/dashboard/dashboard.component';
import { ServicesListComponent } from './user-component/services-list/services-list.component';
import { ServicesDetailsComponent } from './user-component/services-details/services-details.component';
import { HairdressersListComponent } from './user-component/hairdressers-list/hairdressers-list.component';
import { MatDatepickerModule} from  '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './user-component/payment/payment.component';
import { ReservationComponent } from './user-component/reservation/reservation.component';
import { NotificationComponent } from './user-component/notification/notification.component';
import { ChangeReservationDateModelComponent } from './user-component/change-reservation-date-model/change-reservation-date-model.component';
import { DatePipe } from '@angular/common';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ReviewModalComponent } from './user-component/review-modal/review-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditReviewComponent } from './user-component/edit-review/edit-review.component';
import { InterestDialogComponent } from './user-component/interest-dialog/interest-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    DashboardComponent,
    ServicesListComponent,
    ServicesDetailsComponent,
    HairdressersListComponent,
    DateComponent,
    PaymentComponent,
    ReservationComponent,
    NotificationComponent,
    ChangeReservationDateModelComponent,
    ReviewModalComponent,
    EditReviewComponent,
    InterestDialogComponent
    

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule
    
  ],

  providers: [DatePipe, MatDialog
    
  ]
})
export class UserModule { }
