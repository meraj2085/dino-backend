import { Model } from 'mongoose';

export type IOrganization = {
  bin_number?: string;
  nid_number?: string;
  tin_number?: string;
  email?: string;
  street?: string;
  city?: string;
  landmark?: string;
  country?: string;
  state?: string;
  postal_code?: string;
  billing_street?: string;
  billing_city?: string;
  billing_landmark?: string;
  billing_country?: string;
  billing_state?: string;
  billing_postal_code?: string;
  registered_street?: string;
  registered_city?: string;
  registered_landmark?: string;
  registered_country?: string;
  registered_state?: string;
  registered_postal_code?: string;
  contact_person_first_name?: string;
  contact_person_last_name?: string;
  contact_person_email?: string;
  contact_person_phone_number?: string;
  account_manager_first_name?: string;
  account_manager_last_name?: string;
  account_manager_designation?: string;
  account_manager_email?: string;
  account_manager_phone_number?: string;
  billing_contact_person_first_name?: string;
  billing_contact_person_last_name?: string;
  billing_contact_person_email?: string;
  billing_contact_person_phone_number?: string;
  bank_name?: string;
  account_number?: string;
  routing_number?: string;
  plan_validity?: string;
  number_of_users?: string;
  profile_picture?: string;
  company_name?: string;
  company_code?: string;
  is_profile_completed?: boolean;
  is_admin_user_created?: boolean;
  status?: 'Deleted' | 'Disabled' | 'Active';
};

export type OrganizationModel = Model<IOrganization, Record<string, unknown>>;

export type IOrganizationFilters = {
  searchTerm?: string;
  id?: string;
  company_name?: string;
};
