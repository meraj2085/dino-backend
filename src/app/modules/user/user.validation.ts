import { z } from 'zod';

const userSchema = z.object({
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.string().optional(),
  employment_status: z.string().optional(),
  flat_number: z.string().optional(),
  building_name: z.string().optional(),
  street: z.string().optional(),
  branch: z.string().optional(),
  city: z.string().optional(),
  landmark: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.number().optional(),
  permanent_address: z.record(z.unknown()).optional(),
  phone_number: z.string().optional(),
  other_phone_number: z.string().optional(),
  personal_email: z.string().email().optional(),
  office_email: z.string().email().optional(),
  bank_name: z.string().optional(),
  account_number: z.number().optional(),
  bank_details: z.record(z.unknown()).optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  team: z.string().optional(),
  role: z.string().optional(),
  manager_id: z.string().optional(),
  date_of_joining: z.string().optional(),
  emergency_contact: z.record(z.unknown()).optional(),
  emergency_contact_details: z.record(z.unknown()).optional(),
  employee_code: z.string().optional(),
  contract_date: z.string().optional(),
  user_type: z.enum(['super_admin', 'hr', 'employee', 'admin']).optional(),
  organization_id: z.string().optional(),
  password: z.string().optional(),
  profile_picture: z.string().optional(),
  user_id: z.string().optional(),
  status: z.enum(['Deleted', 'Disabled', 'Active']),
  last_login_time: z.string().optional(),
  last_online_time: z.string().optional(),
  is_logged_in: z.boolean().optional(),
  is_online: z.boolean().optional(),
  is_profile_completed: z.boolean().optional(),
  is_password_reset: z.boolean().optional(),
  is_password_created_by_user: z.boolean().optional(),
}); 

const addUserZodSchema = z.object({
  body: userSchema,
});

const updateUserZodSchema = z.object({
  body: userSchema,
});

export const UserValidation = {
  addUserZodSchema,
  updateUserZodSchema,
};
