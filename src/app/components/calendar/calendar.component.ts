import { Component, OnInit } from "@angular/core";
import { Appointment } from "src/app/models/appointment.model";
import { AppointmentService } from "src/app/services/appointment.service";
import {MatDialog} from '@angular/material/dialog';
import { AddAppointmentDialogComponent } from "src/app/dialog/add-appointment-dialog/add-appointment-dialog.component";

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
    appointments: Appointment[] = []

    constructor(private appointmentService: AppointmentService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.appointmentService.getAppointments()
        .subscribe((res) => {
            this.appointments = res
        })
    }

    onDeleteAppointment(id: number): void {
        this.appointmentService.deleteAppointment(id)
    }

    openAppointment(): void {
        this.dialog.open(AddAppointmentDialogComponent, {
            width: '400px',
        })
    }

}