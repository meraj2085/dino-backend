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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable no-undef */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const UserSchema = new mongoose_1.Schema({
    organization_id: String,
    first_name: String,
    middle_name: String,
    last_name: String,
    date_of_birth: String,
    gender: String,
    employment_status: String,
    employee_code: String,
    office_email: String,
    date_of_joining: String,
    department: String,
    flat_number: String,
    building_name: String,
    street: String,
    branch: String,
    city: String,
    landmark: String,
    country: String,
    state: String,
    postal_code: Number,
    permanent_address: Object,
    phone_number: String,
    other_phone_number: String,
    personal_email: String,
    bank_name: String,
    account_number: Number,
    bank_details: Object,
    designation: String,
    team: String,
    role: String,
    manager_id: String,
    emergency_contact: Object,
    emergency_contact_details: Object,
    contract_date: String,
    user_type: {
        type: String,
        enum: ['super_admin', 'hr', 'employee', 'admin'],
        default: 'employee',
    },
    password: String,
    profile_picture: String,
    user_id: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ['Deleted', 'Disabled', 'Active'],
        default: 'Active',
        required: true,
    },
    last_login_time: {
        type: String,
    },
    last_online_time: {
        type: String,
    },
    is_logged_in: {
        type: Boolean,
        default: false,
    },
    is_online: {
        type: Boolean,
        default: false,
    },
    is_profile_completed: {
        type: Boolean,
        default: false,
    },
    is_password_reset: {
        type: Boolean,
        default: false,
    },
    is_password_created_by_user: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
