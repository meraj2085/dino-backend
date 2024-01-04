"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationValidation = void 0;
const zod_1 = require("zod");
const addOrganizationZodSchema = zod_1.z.object({
    bin_number: zod_1.z.string({ required_error: 'BIN Number is required' }),
    nid_number: zod_1.z.string({ required_error: 'NID Number is required' }),
    tin_number: zod_1.z.string({ required_error: 'TIN Number is required' }),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    street: zod_1.z.string().optional(),
    city: zod_1.z.string({ required_error: 'City is required' }),
    landmark: zod_1.z.string().optional(),
    country: zod_1.z.string({ required_error: 'Country is required' }),
    state: zod_1.z.string({ required_error: 'State is required' }),
    postal_code: zod_1.z.string({ required_error: 'Postal Code is required' }),
    billing_street: zod_1.z.string().optional(),
    billing_city: zod_1.z.string().optional(),
    billing_landmark: zod_1.z.string().optional(),
    billing_country: zod_1.z.string().optional(),
    billing_state: zod_1.z.string().optional(),
    billing_postal_code: zod_1.z.string().optional(),
    registered_street: zod_1.z.string().optional(),
    registered_city: zod_1.z.string({
        required_error: 'Registered City is required',
    }),
    registered_landmark: zod_1.z.string().optional(),
    registered_country: zod_1.z.string({
        required_error: 'Registered Country is required',
    }),
    registered_state: zod_1.z.string({
        required_error: 'Registered State is required',
    }),
    registered_postal_code: zod_1.z.string({
        required_error: 'Registered Postal Code is required',
    }),
    contact_person_first_name: zod_1.z.string({
        required_error: 'Contact Person First Name is required',
    }),
    contact_person_last_name: zod_1.z.string({
        required_error: 'Contact Person Last Name is required',
    }),
    contact_person_email: zod_1.z
        .string({ required_error: 'Contact Person Email is required' })
        .email({ message: 'Invalid email address' }),
    contact_person_phone_number: zod_1.z.string({
        required_error: 'Contact Person Phone Number is required',
    }),
    account_manager_first_name: zod_1.z.string({
        required_error: 'Account Manager First Name is required',
    }),
    account_manager_last_name: zod_1.z.string({
        required_error: 'Account Manager Last Name is required',
    }),
    account_manager_designation: zod_1.z.string().optional(),
    account_manager_email: zod_1.z
        .string()
        .email({ message: 'Invalid email address' })
        .optional(),
    account_manager_phone_number: zod_1.z.string().optional(),
    billing_contact_person_first_name: zod_1.z.string({
        required_error: 'Billing Contact Person First Name is required',
    }),
    billing_contact_person_last_name: zod_1.z.string({
        required_error: 'Billing Contact Person Last Name is required',
    }),
    billing_contact_person_email: zod_1.z
        .string({ required_error: 'Billing Contact Person Email is required' })
        .email({ message: 'Invalid email address' }),
    billing_contact_person_phone_number: zod_1.z.string({
        required_error: 'Billing Contact Person Phone Number is required',
    }),
    bank_name: zod_1.z.string({ required_error: 'Bank Name is required' }),
    account_number: zod_1.z.string({ required_error: 'Account Number is required' }),
    routing_number: zod_1.z.string().optional(),
    plan_validity: zod_1.z.string({ required_error: 'Plan Validity is required' }),
    number_of_users: zod_1.z.string({
        required_error: 'Number of Users is required',
    }),
    company_name: zod_1.z.string({ required_error: 'Company Name is required' }),
});
const updateOrganizationZodSchema = zod_1.z.object({
    // body: z.object({
    bin_number: zod_1.z.string().optional(),
    nid_number: zod_1.z.string().optional(),
    tin_number: zod_1.z.string().optional(),
    email: zod_1.z.string().email({ message: 'Invalid email address' }).optional(),
    street: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    landmark: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    billing_street: zod_1.z.string().optional(),
    billing_city: zod_1.z.string().optional(),
    billing_landmark: zod_1.z.string().optional(),
    billing_country: zod_1.z.string().optional(),
    billing_state: zod_1.z.string().optional(),
    billing_postal_code: zod_1.z.string().optional(),
    registered_street: zod_1.z.string().optional(),
    registered_city: zod_1.z.string().optional(),
    registered_landmark: zod_1.z.string().optional(),
    registered_country: zod_1.z.string().optional(),
    registered_state: zod_1.z.string().optional(),
    registered_postal_code: zod_1.z.string().optional(),
    contact_person_first_name: zod_1.z.string().optional(),
    contact_person_last_name: zod_1.z.string().optional(),
    contact_person_email: zod_1.z
        .string()
        .email({ message: 'Invalid email address' })
        .optional(),
    contact_person_phone_number: zod_1.z.string().optional(),
    account_manager_first_name: zod_1.z.string().optional(),
    account_manager_last_name: zod_1.z.string().optional(),
    account_manager_designation: zod_1.z.string().optional(),
    account_manager_email: zod_1.z
        .string()
        .email({ message: 'Invalid email address' })
        .optional(),
    account_manager_phone_number: zod_1.z.string().optional(),
    billing_contact_person_first_name: zod_1.z.string().optional(),
    billing_contact_person_last_name: zod_1.z.string().optional(),
    billing_contact_person_email: zod_1.z.string().email().optional(),
    billing_contact_person_phone_number: zod_1.z.string().optional(),
    bank_name: zod_1.z.string().optional(),
    account_number: zod_1.z.string().optional(),
    routing_number: zod_1.z.string().optional(),
    plan_validity: zod_1.z.string().optional(),
    number_of_users: zod_1.z.string().optional(),
    company_name: zod_1.z.string().optional(),
    company_code: zod_1.z.string().optional(),
    is_profile_completed: zod_1.z.boolean().optional(),
    is_admin_user_created: zod_1.z.boolean().optional(),
    status: zod_1.z.enum(['Deleted', 'Disabled', 'Active']).optional(),
    // }),
});
exports.OrganizationValidation = {
    addOrganizationZodSchema,
    updateOrganizationZodSchema,
};
