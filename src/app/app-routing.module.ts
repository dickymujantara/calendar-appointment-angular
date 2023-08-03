import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'calendar-appointment', loadChildren: () => import("./components/calendar-appointment/calendar-appointment.module").then(m => m.CalendarAppointmentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
