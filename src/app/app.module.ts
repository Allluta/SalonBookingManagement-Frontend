import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AboutSalonComponent } from './about-salon/about-salon.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule} from  '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PaymentService } from './auth/services/payment/payment.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from './auth/services/notification/notification.service';
import { SocketIoModule } from 'ngx-socket-io';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DateComponent } from './modules/user/user-component/date/date.component';
import { InterestDialogComponent } from './modules/user/user-component/interest-dialog/interest-dialog.component';
import { HairdresserTableComponent } from './modules/admin/admin-components/hairdresser-management/hairdresser-table/hairdresser-table.component';
import { HairdressersListComponent } from './hairdressers-list/hairdressers-list.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AboutSalonComponent,
    ServicesListComponent,
    ErrorMessageComponent,
    HairdressersListComponent,
    ReviewsListComponent
  ],
  exports: [RegistrationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
   
  ],
  providers: [
    PaymentService,
    DatePipe,
    NotificationService,
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
