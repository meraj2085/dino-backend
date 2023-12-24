"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentValidation = void 0;
const zod_1 = require("zod");
const addAppointmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().nonempty(),
        email: zod_1.z.string().nonempty(),
        mobileNumber: zod_1.z.string().nonempty(),
        company_name: zod_1.z.string(),
        appointment_date: zod_1.z.string().nonempty(),
        appointment_time: zod_1.z.string().nonempty(),
        subject: zod_1.z.string().nonempty(),
        message: zod_1.z.string().nonempty(),
        appointment_status: zod_1.z.string().nonempty(),
    }),
});
const updateAppointmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().nonempty(),
        appointment_date: zod_1.z.string().nonempty(),
        appointment_time: zod_1.z.string().nonempty(),
        appointment_status: zod_1.z.string().nonempty(),
    }),
});
exports.AppointmentValidation = {
    updateAppointmentZodSchema,
    addAppointmentZodSchema,
};
