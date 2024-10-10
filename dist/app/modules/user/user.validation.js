"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const addUserZodSchema = zod_1.z.object({
    organization_id: zod_1.z.string({ required_error: 'OrganizationId is Required' }),
    first_name: zod_1.z.string({ required_error: 'FirstName is Required' }),
    last_name: zod_1.z.string({ required_error: 'LastName is Required' }),
    date_of_birth: zod_1.z.string({ required_error: 'DateOfBirth is Required' }),
    gender: zod_1.z.string({ required_error: 'Gender is Required' }),
    employment_status: zod_1.z.enum(['Contract', 'Intern', 'Temporary', 'Part-time', 'Freelance', 'Full-time'], { required_error: 'Employment Status is Required' }),
    office_email: zod_1.z
        .string({ required_error: 'Office Email is Required' })
        .email({ message: 'Invalid Email' }),
    date_of_joining: zod_1.z.string({
        required_error: 'Date Of Joining is Required',
    }),
    department: zod_1.z.enum(['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations'], { required_error: 'Department is Required' }),
    flat_number: zod_1.z.string().optional(),
    building_name: zod_1.z.string().optional(),
    street: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    landmark: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    phone_number: zod_1.z.string({ required_error: 'PhoneNumber is Required' }),
    other_phone_number: zod_1.z.string().optional(),
    personal_email: zod_1.z.string().optional(),
    bank_name: zod_1.z.string({ required_error: 'Bank Name is Required' }),
    account_number: zod_1.z.string({ required_error: 'Account Number is Required' }),
    branch_name: zod_1.z.string().optional(),
    designation: zod_1.z.enum([
        'Software Engineer',
        'Senior Software Engineer',
        'Team Lead',
        'Project Manager',
        'Product Manager',
        'CEO',
        'CTO',
        'COO',
        'CFO',
        'HR Manager',
        'HR Executive',
        'HR Intern',
        'Marketing Manager',
        'Marketing Executive',
        'Marketing Intern',
        'Sales Manager',
        'Sales Executive',
        'Sales Intern',
        'Finance Manager',
        'Finance Executive',
        'Finance Intern',
        'Operations Manager',
        'Operations Executive',
        'Operations Intern',
    ], { required_error: 'Designation is Required' }),
    team: zod_1.z.enum(['IT', 'Finance', 'Marketing', 'Sales', 'Operations'], {
        required_error: 'Team is Required',
    }),
    role: zod_1.z.enum(['Employee', 'Manager', 'Developer', 'Designer', 'Tester'], {
        required_error: 'Role is Required',
    }),
    manager_id: zod_1.z.string({ required_error: 'ManagerId is Required' }),
    emergency_contact: zod_1.z.object({
        full_name: zod_1.z.string({
            required_error: 'FullName of Emergency Contact is Required',
        }),
        phone_number: zod_1.z.string({
            required_error: 'PhoneNumber of Emergency Contact is Required',
        }),
        email: zod_1.z.string().optional(),
        relationship: zod_1.z.string({
            required_error: 'Relationship of Emergency Contact is Required',
        }),
    }),
    contract_date: zod_1.z.string({ required_error: 'Contract Date is Required' }),
    user_type: zod_1.z
        .enum(['super_admin', 'admin', 'employee'])
        .default('employee')
        .optional(),
    password: zod_1.z.string().default('Dino-123').optional(),
    salaryDetails: zod_1.z.object({
        basic_salary: zod_1.z.string({
            required_error: 'Basic Salary  is Required',
        }),
        total_allowance: zod_1.z.string({
            required_error: 'Total Allowance  is Required',
        }),
        annual_bonus: zod_1.z.string({
            required_error: 'Annual Bonus  is Required',
        }),
        total_ctc: zod_1.z.string({
            required_error: 'Total CTC  is Required',
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    organization_id: zod_1.z.string().optional(),
    first_name: zod_1.z.string().optional(),
    last_name: zod_1.z.string().optional(),
    date_of_birth: zod_1.z.string().optional(),
    gender: zod_1.z.string().optional(),
    employment_status: zod_1.z
        .enum(['Contract', 'Intern', 'Temporary', 'Part-time', 'Freelance', 'Full-time'])
        .optional(),
    office_email: zod_1.z.string().optional(),
    date_of_joining: zod_1.z.string().optional(),
    department: zod_1.z
        .enum(['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations'])
        .optional(),
    flat_number: zod_1.z.string().optional(),
    building_name: zod_1.z.string().optional(),
    street: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    landmark: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    phone_number: zod_1.z.string().optional(),
    other_phone_number: zod_1.z.string().optional(),
    personal_email: zod_1.z.string().optional(),
    bank_name: zod_1.z.string().optional(),
    account_number: zod_1.z.string().optional(),
    branch_name: zod_1.z.string().optional(),
    designation: zod_1.z
        .enum([
        'Software Engineer',
        'Senior Software Engineer',
        'Team Lead',
        'Project Manager',
        'Product Manager',
        'CEO',
        'CTO',
        'COO',
        'CFO',
        'HR Manager',
        'HR Executive',
        'HR Intern',
        'Marketing Manager',
        'Marketing Executive',
        'Marketing Intern',
        'Sales Manager',
        'Sales Executive',
        'Sales Intern',
        'Finance Manager',
        'Finance Executive',
        'Finance Intern',
        'Operations Manager',
        'Operations Executive',
        'Operations Intern',
    ])
        .optional(),
    team: zod_1.z
        .enum(['IT', 'Finance', 'Marketing', 'Sales', 'Operations'])
        .optional(),
    role: zod_1.z
        .enum(['Employee', 'Manager', 'Developer', 'Designer', 'Tester'])
        .optional(),
    manager_id: zod_1.z.string().optional(),
    emergency_contact: zod_1.z
        .object({
        full_name: zod_1.z.string().optional(),
        phone_number: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        relationship: zod_1.z.string().optional(),
    })
        .optional(),
    contract_date: zod_1.z.string().optional(),
    user_type: zod_1.z
        .enum(['super_admin', 'admin', 'employee'])
        .default('employee')
        .optional(),
    password: zod_1.z.string().default('Dino-123').optional(),
    profile_picture: zod_1.z.string().optional(),
    status: zod_1.z
        .enum(['Deleted', 'Disabled', 'Active'])
        .default('Active')
        .optional(),
    is_password_reset: zod_1.z.boolean().default(false).optional(),
    salaryDetails: zod_1.z
        .object({
        basic_salary: zod_1.z.string().optional(),
        total_allowance: zod_1.z.string().optional(),
        annual_bonus: zod_1.z.string().optional(),
        total_ctc: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.UserValidation = {
    addUserZodSchema,
    updateUserZodSchema,
};
