"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    first_name: zod_1.z.string().optional(),
    middle_name: zod_1.z.string().optional(),
    last_name: zod_1.z.string().optional(),
    date_of_birth: zod_1.z.string().optional(),
    gender: zod_1.z.string().optional(),
    employment_status: zod_1.z.string().optional(),
    flat_number: zod_1.z.string().optional(),
    building_name: zod_1.z.string().optional(),
    street: zod_1.z.string().optional(),
    branch: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    landmark: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    postal_code: zod_1.z.number().optional(),
    permanent_address: zod_1.z.record(zod_1.z.unknown()).optional(),
    phone_number: zod_1.z.string().optional(),
    other_phone_number: zod_1.z.string().optional(),
    personal_email: zod_1.z.string().email().optional(),
    office_email: zod_1.z.string().email().optional(),
    bank_name: zod_1.z.string().optional(),
    account_number: zod_1.z.number().optional(),
    bank_details: zod_1.z.record(zod_1.z.unknown()).optional(),
    designation: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    team: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
    manager_id: zod_1.z.string().optional(),
    date_of_joining: zod_1.z.string().optional(),
    emergency_contact: zod_1.z.record(zod_1.z.unknown()).optional(),
    emergency_contact_details: zod_1.z.record(zod_1.z.unknown()).optional(),
    employee_code: zod_1.z.string().optional(),
    contract_date: zod_1.z.string().optional(),
    user_type: zod_1.z.enum(['super_admin', 'hr', 'employee', 'admin']).optional(),
    organization_id: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    profile_picture: zod_1.z.string().optional(),
    user_id: zod_1.z.string().optional(),
    status: zod_1.z.enum(['Deleted', 'Disabled', 'Active']),
    last_login_time: zod_1.z.string().optional(),
    last_online_time: zod_1.z.string().optional(),
    is_logged_in: zod_1.z.boolean().optional(),
    is_online: zod_1.z.boolean().optional(),
    is_profile_completed: zod_1.z.boolean().optional(),
    is_password_reset: zod_1.z.boolean().optional(),
    is_password_created_by_user: zod_1.z.boolean().optional(),
});
const addUserZodSchema = zod_1.z.object({
    body: userSchema,
});
const updateUserZodSchema = zod_1.z.object({
    body: userSchema,
});
exports.UserValidation = {
    addUserZodSchema,
    updateUserZodSchema,
};
