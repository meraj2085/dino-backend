"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_route_1 = require("../modules/address/address.route");
const appointment_route_1 = require("../modules/appointment/appointment.route");
const attendance_route_1 = require("../modules/attendance/attendance.route");
const auth_route_1 = require("../modules/auth/auth.route");
const event_route_1 = require("../modules/event/event.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const notification_route_1 = require("../modules/notification/notification.route");
const organization_route_1 = require("../modules/organization/organization.route");
const user_route_1 = require("../modules/user/user.route");
const Leave_route_1 = require("../modules/leave/Leave.route");
const otp_route_1 = require("../modules/otp/otp.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/organization',
        route: organization_route_1.OrganizationRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/reset-password',
        route: otp_route_1.OtpRoutes,
    },
    {
        path: '/address',
        route: address_route_1.AddressRoutes,
    },
    {
        path: '/notification',
        route: notification_route_1.NotificationRoutes,
    },
    {
        path: '/appointment',
        route: appointment_route_1.AppointmentRoutes,
    },
    {
        path: '/feedback',
        route: feedback_route_1.FeedbackRoutes,
    },
    {
        path: '/event',
        route: event_route_1.EventRoutes,
    },
    {
        path: '/attendance',
        route: attendance_route_1.AttendanceRoutes,
    },
    {
        path: '/leave',
        route: Leave_route_1.LeaveRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
