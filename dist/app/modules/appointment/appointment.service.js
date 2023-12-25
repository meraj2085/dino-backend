"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const appointment_model_1 = require("./appointment.model");
const addAppointment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield appointment_model_1.Appointment.create(data);
    return service;
});
const getSingleAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield appointment_model_1.Appointment.findById(id);
    return appointment;
});
const updateScheduleAndStatus = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = data;
    const appointment = yield appointment_model_1.Appointment.findByIdAndUpdate(id, {
        appointment_date: data === null || data === void 0 ? void 0 : data.appointment_date,
        appointment_time: data === null || data === void 0 ? void 0 : data.appointment_time,
        appointment_status: data === null || data === void 0 ? void 0 : data.appointment_status,
    }, {
        new: true,
    });
    return appointment;
});
const getAllAppointment = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield appointment_model_1.Appointment.find()
        .sort({ createdAt: 'desc' })
        .exec();
    return appointments;
});
exports.AppointmentService = {
    addAppointment,
    getSingleAppointment,
    getAllAppointment,
    updateScheduleAndStatus,
};
