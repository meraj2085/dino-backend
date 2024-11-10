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
exports.User = void 0;
/* eslint-disable no-undef */
const mongoose_1 = require("mongoose");
const cryptoPassword_1 = require("../../../utils/cryptoPassword");
const passwordGenerate_1 = require("../../../utils/passwordGenerate");
const UserSchema = new mongoose_1.Schema({
    organization_id: String,
    first_name: String,
    last_name: String,
    date_of_birth: String,
    gender: String,
    employment_status: String,
    employee_code: String,
    office_email: {
        type: String,
        unique: true,
    },
    date_of_joining: String,
    department: String,
    flat_number: String,
    building_name: String,
    street: String,
    city: String,
    landmark: String,
    country: String,
    state: String,
    postal_code: String,
    phone_number: String,
    other_phone_number: String,
    personal_email: String,
    bank_name: String,
    account_number: String,
    branch_name: String,
    designation: String,
    team: String,
    role: String,
    manager_id: String,
    emergency_contact: {
        full_name: String,
        phone_number: String,
        email: String,
        relationship: String,
    },
    contract_date: String,
    user_type: {
        type: String,
        enum: ['super_admin', 'admin', 'employee'],
        default: 'employee',
    },
    password: {
        type: String,
    },
    profile_picture: String,
    status: {
        type: String,
        enum: ['Deleted', 'Disabled', 'Active'],
        default: 'Active',
        required: true,
    },
    is_password_reset: {
        type: Boolean,
        default: false,
    },
    salaryDetails: {
        basic_salary: String,
        total_allowance: String,
        annual_bonus: String,
        total_ctc: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const new_password = yield (0, passwordGenerate_1.generateStrongPassword)();
        this.password = yield (0, cryptoPassword_1.encryptPassword)(new_password);
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
