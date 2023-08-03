import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Appointment } from "src/app/models/appointment.model";
import { AppointmentService } from "src/app/services/appointment.service";
import { tap } from "rxjs";

@Component({
    selector: 'add-appointment-dialog',
    templateUrl: './add-appointment-dialog.component.html',
    styleUrls: ['./add-appointment-dialog.component.css'],
})
export class AddAppointmentDialogComponent implements OnInit {
    appointmentForm: FormGroup;

    ngOnInit() {}

    constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {
        this.appointmentForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            start: ['', Validators.required],
            end: ['', Validators.required]
        })
    }

    onSubmit(): void {
        if (this.appointmentForm.valid) {
            const appointment: Appointment = this.appointmentForm.value;
            appointment.id = this.generateId();

            this.appointmentService
                .setAppointment(appointment)
                .pipe(tap(() => this.appointmentForm.reset()))
                .subscribe();
        }
    }

    private generateId(): number {
        return Math.floor(Math.random() * 1000);
    }

}