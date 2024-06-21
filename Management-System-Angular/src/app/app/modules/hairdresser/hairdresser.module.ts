import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HairdresserRoutingModule } from './hairdresser-routing.module';
import { DashboardComponent } from './hairdresser-component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { ClientAppearanceDialogComponent } from './hairdresser-component/client-appearance-dialog/client-appearance-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ClientAppearanceDialogComponent,
    
    
  ],
  imports: [
    CommonModule,
    HairdresserRoutingModule,
    FormsModule
   
    
  
    
  ]
})
export class HairdresserModule { }
