import { Component, OnInit } from "@angular/core";
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {MatDialog} from '@angular/material/dialog';
import { AppointmentService } from "src/app/services/appointment.service";
import { AddAppointmentDialogComponent } from "src/app/dialog/add-appointment-dialog/add-appointment-dialog.component";

@Component({
    selector: 'calendar-appointment',
    templateUrl: './calendar-appointment.component.html',
    styleUrls: ['./calendar-appointment.component.css'],
})
export class CalendarAppointmentComponent implements OnInit {
  view: CalendarView = CalendarView.Month
  CalendarView = CalendarView
  viewDate: Date = new Date()
  activeDayIsOpen: boolean = true;

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  constructor(private dialog: MatDialog, private appointmentService: AppointmentService){}

  ngOnInit(): void {
    this.appointmentService.getAppointments()
    .subscribe((res) => {
      
      let tempEvents: CalendarEvent[] = []
      res.map(e => {
        tempEvents.push({
          title: e.title,
          start: e.start,
          end: e.end,
          color: {
            primary: this.getRandomHexColor(),
            secondary: this.getRandomHexColor()
          },
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        })
      })

      this.events = tempEvents
      console.log(this.events);
      
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
  }

  eventTimesChanged({
      event,
      newStart,
      newEnd,
    }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
  }

  openAppointment(): void {
    this.dialog.open(AddAppointmentDialogComponent, {
        width: '400px',
    })
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private getRandomHexColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}