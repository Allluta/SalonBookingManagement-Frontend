import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Dodaj ten import

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { HairdresserManagementComponent } from './admin-components/hairdresser-management/hairdresser-management.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HairdresserTableComponent } from './admin-components/hairdresser-management/hairdresser-table/hairdresser-table.component';
import { HairdresserEditComponent } from './admin-components/hairdresser-management/hairdresser-edit/hairdresser-edit.component';
import { FormsModule } from '@angular/forms';
import { HairdresserVerifyPasswordComponent } from './admin-components/hairdresser-management/hairdresser-verifyPassword/hairdresser-verifyPassword.component';
import { HairdresserProfileComponent } from './admin-components/hairdresser-management/hairdresser-profile/hairdresser-profile.component';
import { UserManagementComponent } from './admin-components/user-management/user-management.component';
import { UserTableComponent } from './admin-components/user-management/user-table/user-table.component';
import { ServiceManagementComponent } from './admin-components/service-management/service-management.component';
import { ServiceTableComponent } from './admin-components/service-management/service-table/service-table.component';
import { ServiceEditComponent } from './admin-components/service-management/service-edit/service-edit.component';
import { ReservationTableComponent } from './admin-components/reservation-management/reservation-table/reservation-table.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HairdresserManagementComponent,
    HairdresserTableComponent,
    HairdresserEditComponent,
    HairdresserVerifyPasswordComponent,
    HairdresserProfileComponent,
    UserManagementComponent,
    UserTableComponent,
    ServiceManagementComponent,
    ServiceTableComponent,
    ServiceEditComponent,
    ReservationTableComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule ,
    ReactiveFormsModule,
    FormsModule ,
  
  ]
  
    
    
    
  
})
export class AdminModule { }