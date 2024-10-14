import { z } from 'zod';

const addUserZodSchema = z.object({
  organization_id: z.string({ required_error: 'OrganizationId is Required' }),
  first_name: z.string({ required_error: 'FirstName is Required' }),
  last_name: z.string({ required_error: 'LastName is Required' }),
  date_of_birth: z.string({ required_error: 'DateOfBirth is Required' }),
  gender: z.string({ required_error: 'Gender is Required' }),
  employment_status: z.enum(
    ['Contract', 'Intern', 'Temporary', 'Part-time', 'Freelance', 'Full-time'],
    { required_error: 'Employment Status is Required' }
  ),
  office_email: z
    .string({ required_error: 'Office Email is Required' })
    .email({ message: 'Invalid Email' }),

  date_of_joining: z.string({
    required_error: 'Date Of Joining is Required',
  }),
  department: z.enum(
    ['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations'],
    { required_error: 'Department is Required' }
  ),
  flat_number: z.string().optional(),
  building_name: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  landmark: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  phone_number: z.string({ required_error: 'PhoneNumber is Required' }),
  other_phone_number: z.string().optional(),
  personal_email: z.string().optional(),
  bank_name: z.string({ required_error: 'Bank Name is Required' }),
  account_number: z.string({ required_error: 'Account Number is Required' }),
  branch_name: z.string().optional(),
  designation: z.enum(
    [
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
    ],
    { required_error: 'Designation is Required' }
  ),
  team: z.enum(['IT', 'Finance', 'Marketing', 'Sales', 'Operations'], {
    required_error: 'Team is Required',
  }),
  role: z.enum(['Employee', 'Manager', 'Developer', 'Designer', 'Tester'], {
    required_error: 'Role is Required',
  }),
  manager_id: z.string({ required_error: 'ManagerId is Required' }),
  emergency_contact: z.object({
    full_name: z.string({
      required_error: 'FullName of Emergency Contact is Required',
    }),
    phone_number: z.string({
      required_error: 'PhoneNumber of Emergency Contact is Required',
    }),
    email: z.string().optional(),
    relationship: z.string({
      required_error: 'Relationship of Emergency Contact is Required',
    }),
  }),
  contract_date: z.string({ required_error: 'Contract Date is Required' }),
  user_type: z
    .enum(['super_admin', 'admin', 'employee'])
    .default('employee')
    .optional(),
  password: z.string().default('Dino-123').optional(),
  salaryDetails: z.object({
    basic_salary: z.string({
      required_error: 'Basic Salary  is Required',
    }),
    total_allowance: z.string({
      required_error: 'Total Allowance  is Required',
    }),
    annual_bonus: z.string({
      required_error: 'Annual Bonus  is Required',
    }),
    total_ctc: z.string({
      required_error: 'Total CTC  is Required',
    }),
  }),
});


const updateUserZodSchema = z.object({
    organization_id: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    date_of_birth: z.string().optional(),
    gender: z.string().optional(),
    employment_status: z
      .enum(['Contract', 'Intern', 'Temporary', 'Part-time', 'Freelance', 'Full-time'])
      .optional(),
    office_email: z.string().optional(),
    date_of_joining: z.string().optional(),
    department: z
      .enum(['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations'])
      .optional(),
    flat_number: z.string().optional(),
    building_name: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    landmark: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    phone_number: z.string().optional(),
    other_phone_number: z.string().optional(),
    personal_email: z.string().optional(),
    bank_name: z.string().optional(),
    account_number: z.string().optional(),
    branch_name: z.string().optional(),
    designation: z
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
    team: z
      .enum(['IT', 'Finance', 'Marketing', 'Sales', 'Operations'])
      .optional(),
    role: z
      .enum(['Employee', 'Manager', 'Developer', 'Designer', 'Tester'])
      .optional(),
    manager_id: z.string().optional(),
    emergency_contact: z
      .object({
        full_name: z.string().optional(),
        phone_number: z.string().optional(),
        email: z.string().optional(),
        relationship: z.string().optional(),
      })
      .optional(),
    contract_date: z.string().optional(),
    user_type: z
      .enum(['super_admin', 'admin', 'employee'])
      .default('employee')
      .optional(),
    password: z.string().default('Dino-123').optional(),
    profile_picture: z.string().optional(),
    status: z
      .enum(['Deleted', 'Disabled', 'Active'])
      .default('Active')
      .optional(),
    is_password_reset: z.boolean().default(false).optional(),
    salaryDetails: z
      .object({
        basic_salary: z.string().optional(),
        total_allowance: z.string().optional(),
        annual_bonus: z.string().optional(),
        total_ctc: z.string().optional(),
      })
      .optional(),
});

export const UserValidation = {
  addUserZodSchema,
  updateUserZodSchema,
};
