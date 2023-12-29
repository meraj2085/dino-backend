import { z } from 'zod';

const addOrganizationZodSchema = z.object({
  body: z.object({
    bin_number: z.string({ required_error: 'BIN Number is required' }),
    nid_number: z.string({ required_error: 'NID Number is required' }),
    tin_number: z.string({ required_error: 'TIN Number is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    street: z.string({ required_error: 'Street is required' }),
    city: z.string({ required_error: 'City is required' }),
    landmark: z.string({ required_error: 'Landmark is required' }),
    country: z.string({ required_error: 'Country is required' }),
    state: z.string({ required_error: 'State is required' }),
    postal_code: z.string({ required_error: 'Postal Code is required' }),
    billing_street: z.string({ required_error: 'Billing Street is required' }),
    billing_city: z.string({ required_error: 'Billing City is required' }),
    billing_landmark: z.string({
      required_error: 'Billing Landmark is required',
    }),
    billing_country: z.string({
      required_error: 'Billing Country is required',
    }),
    billing_state: z.string({ required_error: 'Billing State is required' }),
    billing_postal_code: z.string({
      required_error: 'Billing Postal Code is required',
    }),
    registered_street: z.string({
      required_error: 'Registered Street is required',
    }),
    registered_city: z.string({
      required_error: 'Registered City is required',
    }),
    registered_landmark: z.string({
      required_error: 'Registered Landmark is required',
    }),
    registered_country: z.string({
      required_error: 'Registered Country is required',
    }),
    registered_state: z.string({
      required_error: 'Registered State is required',
    }),
    registered_postal_code: z.string({
      required_error: 'Registered Postal Code is required',
    }),
    contact_person_first_name: z.string({
      required_error: 'Contact Person First Name is required',
    }),
    contact_person_last_name: z.string({
      required_error: 'Contact Person Last Name is required',
    }),
    contact_person_email: z
      .string({ required_error: 'Contact Person Email is required' })
      .email({ message: 'Invalid email address' }),
    contact_person_phone_number: z.string({
      required_error: 'Contact Person Phone Number is required',
    }),
    account_manager_first_name: z.string({
      required_error: 'Account Manager First Name is required',
    }),
    account_manager_last_name: z.string({
      required_error: 'Account Manager Last Name is required',
    }),
    account_manager_designation: z.string({
      required_error: 'Account Manager Designation is required',
    }),
    account_manager_email: z
      .string({ required_error: 'Account Manager Email is required' })
      .email({ message: 'Invalid email address' }),
    account_manager_phone_number: z.string({
      required_error: 'Account Manager Phone Number is required',
    }),
    billing_contact_person_first_name: z.string({
      required_error: 'Billing Contact Person First Name is required',
    }),
    billing_contact_person_last_name: z.string({
      required_error: 'Billing Contact Person Last Name is required',
    }),
    billing_contact_person_email: z
      .string({ required_error: 'Billing Contact Person Email is required' })
      .email({ message: 'Invalid email address' }),
    billing_contact_person_phone_number: z.string({
      required_error: 'Billing Contact Person Phone Number is required',
    }),
    bank_name: z.string({ required_error: 'Bank Name is required' }),
    account_number: z.string({ required_error: 'Account Number is required' }),
    routing_number: z.string({ required_error: 'Routing Number is required' }),
    plan_validity: z.string({ required_error: 'Plan Validity is required' }),
    number_of_users: z.string({
      required_error: 'Number of Users is required',
    }),
    company_name: z.string({ required_error: 'Company Name is required' }),
    company_code: z.string({ required_error: 'Company Code is required' }),
    // is_profile_completed: z.boolean().optional(),
    // is_admin_user_created: z.boolean().optional(),
    // status: z.enum(['Deleted', 'Disabled', 'Active']).optional(),
  }),
});

const updateOrganizationZodSchema = z.object({
  body: z.object({
    bin_number: z.string().optional(),
    nid_number: z.string().optional(),
    tin_number: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    landmark: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    billing_street: z.string().optional(),
    billing_city: z.string().optional(),
    billing_landmark: z.string().optional(),
    billing_country: z.string().optional(),
    billing_state: z.string().optional(),
    billing_postal_code: z.string().optional(),
    registered_street: z.string().optional(),
    registered_city: z.string().optional(),
    registered_landmark: z.string().optional(),
    registered_country: z.string().optional(),
    registered_state: z.string().optional(),
    registered_postal_code: z.string().optional(),
    contact_person_first_name: z.string().optional(),
    contact_person_last_name: z.string().optional(),
    contact_person_email: z
      .string()
      .email({ message: 'Invalid email address' })
      .optional(),
    contact_person_phone_number: z.string().optional(),
    account_manager_first_name: z.string().optional(),
    account_manager_last_name: z.string().optional(),
    account_manager_designation: z.string().optional(),
    account_manager_email: z
      .string()
      .email({ message: 'Invalid email address' })
      .optional(),
    account_manager_phone_number: z.string().optional(),
    billing_contact_person_first_name: z.string().optional(),
    billing_contact_person_last_name: z.string().optional(),
    billing_contact_person_email: z.string().email().optional(),
    billing_contact_person_phone_number: z.string().optional(),
    bank_name: z.string().optional(),
    account_number: z.string().optional(),
    routing_number: z.string().optional(),
    plan_validity: z.string().optional(),
    number_of_users: z.string().optional(),
    company_name: z.string().optional(),
    company_code: z.string().optional(),
    is_profile_completed: z.boolean().optional(),
    is_admin_user_created: z.boolean().optional(),
    status: z.enum(['Deleted', 'Disabled', 'Active']).optional(),
  }),
});

export const OrganizationValidation = {
  addOrganizationZodSchema,
  updateOrganizationZodSchema,
};
