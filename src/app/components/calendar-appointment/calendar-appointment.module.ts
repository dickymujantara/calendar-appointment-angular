import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarAppointmentRoutingModule } from './calendar-appointment-routing.module';
import { CalendarAppointmentComponent } from './calendar-appointment.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';


@NgModule({
    declarations: [
      CalendarAppointmentComponent,
    ],
    imports: [
      CommonModule,
      CalendarAppointmentRoutingModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      MatButtonModule,
      MatCardModule,
      MatGridListModule
    ]
  })
  export class CalendarAppointmentModule { }