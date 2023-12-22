import { z } from 'zod';

const organizationSchema = z.object({
  bin_number: z.string().optional(),
  nid_number: z.string().optional(),
  tin_number: z.string().optional(),
  email: z.string().email().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  landmark: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.number().optional(),
  billing_street: z.string().optional(),
  billing_city: z.string().optional(),
  billing_landmark: z.string().optional(),
  billing_country: z.string().optional(),
  billing_state: z.string().optional(),
  billing_postal_code: z.number().optional(),
  registered_street: z.string().optional(),
  registered_city: z.string().optional(),
  registered_landmark: z.string().optional(),
  registered_country: z.string().optional(),
  registered_state: z.string().optional(),
  registered_postal_code: z.number().optional(),
  contact_person_first_name: z.string().optional(),
  contact_person_last_name: z.string().optional(),
  contact_person_middle_name: z.string().optional(),
  contact_person_email: z.string().email().optional(),
  contact_person_phone_number: z.string().optional(),
  account_manager_first_name: z.string().optional(),
  account_manager_last_name: z.string().optional(),
  account_manager_middle_name: z.string().optional(),
  account_manager_designation: z.string().optional(),
  account_manager_email: z.string().email().optional(),
  account_manager_phone_number: z.string().optional(),
  billing_contact_person_first_name: z.string().optional(),
  billing_contact_person_last_name: z.string().optional(),
  billing_contact_person_middle_name: z.string().optional(),
  billing_contact_person_email: z.string().email().optional(),
  billing_contact_person_phone_number: z.string().optional(),
  bank_name: z.string().optional(),
  account_number: z.number().optional(),
  routing_number: z.string().optional(),
  plan_validity: z.string().optional(),
  number_of_users: z.string().optional(),
  profile_picture: z.string().optional(),
  company_name: z.string().optional(),
  company_code: z.string().optional(),
  is_profile_completed: z.boolean().optional(),
  is_admin_user_created: z.boolean().optional(),
  status: z.enum(['Deleted', 'Disabled', 'Active']).optional(),
});

const addOrganizationZodSchema = z.object({
  body: organizationSchema,
});

const updateOrganizationZodSchema = z.object({
  body: organizationSchema,
});

export const OrganizationValidation = {
  addOrganizationZodSchema,
  updateOrganizationZodSchema,
};
