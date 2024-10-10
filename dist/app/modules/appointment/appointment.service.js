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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const appointment_constant_1 = require("./appointment.constant");
const appointment_model_1 = require("./appointment.model");
const notification_model_1 = require("../notification/notification.model");
const addAppointment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield appointment_model_1.Appointment.create(data);
    yield notification_model_1.Notification.create({
        title: 'New Appointment',
        description: data === null || data === void 0 ? void 0 : data.message,
        organization_id: '0000000000',
        user_ids: ['658658163210c17553e99488'],
    });
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
const getAllAppointment = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: appointment_constant_1.appointmentFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield appointment_model_1.Appointment.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield appointment_model_1.Appointment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.AppointmentService = {
    addAppointment,
    getSingleAppointment,
    getAllAppointment,
    updateScheduleAndStatus,
};
