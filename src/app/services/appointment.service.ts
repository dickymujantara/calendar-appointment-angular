import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Appointment } from "../models/appointment.model";

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private appointments: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([])

    constructor(){}

    getAppointments(): Observable<Appointment[]> {
        return this.appointments.asObservable()
    }

    setAppointment(appointment: Appointment): Observable<Appointment[]> {
        const updateAppointments = [...this.appointments.value, appointment]
        this.appointments.next(updateAppointments)
        return this.appointments.asObservable();
    }

    deleteAppointment(id: number): void {
        const updatedAppointments = this.appointments.value.filter((a) => a.id !== id);
        this.appointments.next(updatedAppointments)
    }

}