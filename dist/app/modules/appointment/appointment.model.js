"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
const appointment_interface_1 = require("./appointment.interface");
const appointmentSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    company_name: { type: String },
    appointment_date: { type: String, required: true },
    appointment_time: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    appointment_status: {
        type: String,
        enum: appointment_interface_1.AppointmentStatus,
        default: appointment_interface_1.AppointmentStatus.PENDING,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Appointment = (0, mongoose_1.model)('Appointment', appointmentSchema);
