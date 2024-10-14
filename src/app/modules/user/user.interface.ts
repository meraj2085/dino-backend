import { Model } from 'mongoose';

export type IUser = {
  organization_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  employment_status?: string;
  employee_code?: string;
  office_email?: string;
  date_of_joining?: string;
  department?: string;
  flat_number?: string;
  building_name?: string;
  street?: string;
  city?: string;
  landmark?: string;
  country?: string;
  state?: string;
  postal_code?: string;
  phone_number?: string;
  other_phone_number?: string;
  personal_email?: string;
  bank_name?: string;
  account_number?: string;
  branch_name?: string;
  designation?: string;
  team?: string;
  role?: string;
  manager_id?: string;
  emergency_contact?: {
    full_name?: string;
    phone_number?: string;
    email?: string;
    relationship?: string;
  };
  contract_date?: string;
  user_type?: 'super_admin' | 'admin' | 'employee';
  password?: string;
  profile_picture?: string;
  status?: 'Deleted' | 'Disabled' | 'Active';
  is_password_reset?: boolean;
  salaryDetails?: {
    basic_salary?: string;
    total_allowance?: string;
    annual_bonus?: string;
    total_ctc?: string;
  };
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
};

export type IReq_user = {
  userId?: string;
  user_type?: string;
  organization_id?: string;
  role?: string;
  iat?: number;
  exp?: number;
};
