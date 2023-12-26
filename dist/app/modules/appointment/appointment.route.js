"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("./appointment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const appointment_validation_1 = require("./appointment.validation");
const router = express_1.default.Router();
// Routes
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), appointment_controller_1.AppointmentController.getAllAppointment);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), appointment_controller_1.AppointmentController.getSingleAppointment);
router.post('/', (0, validateRequest_1.default)(appointment_validation_1.AppointmentValidation.addAppointmentZodSchema), appointment_controller_1.AppointmentController.addAppointment);
router.patch('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(appointment_validation_1.AppointmentValidation.updateAppointmentZodSchema), appointment_controller_1.AppointmentController.updateScheduleAndStatus);
exports.AppointmentRoutes = router;
