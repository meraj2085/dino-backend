import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    first_name: String,
    last_name: String,
    middle_name: String,
    date_of_birth: Date,
    gender: String,
    employment_status: String,
    flat_number: String,
    building_name: String,
    street: String,
    branch: String,
    city: String,
    landmark: String,
    country: String,
    state: String,
    postal_code: Number,
    basic_details: Object,
    permanent_address: Object,
    phone_number: String,
    other_phone_number: String,
    personal_email: String,
    office_email: String,
    communication_details: Object,
    bank_name: String,
    account_number: Number,
    ifsc_code: String,
    bank_details: Object,
    level: String,
    designation: String,
    department: String,
    team: String,
    role: String,
    manager_id: String,
    date_of_joining: Date,
    uan_number: String,
    job_details: Object,
    emergency_contact: Object,
    emergency_contact_details: Object,
    employee_code: String,
    contract_date: Date,
    user_type: {
      type: String,
      enum: ['super_admin', 'hr', 'employee', 'admin', 'payslipUser'],
      default: 'employee',
    },
    other: Object,
    hr_only: Object,
    organization_id: String,
    password: String,
    profile_picture: String,
    user_id: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ['Deleted', 'Disabled', 'Active'],
      default: 'Active',
      required: true,
    },
    last_login_time: {
      type: Date,
    },
    last_online_time: {
      type: Date,
    },
    is_logged_in: {
      type: Boolean,
      default: false,
    },
    is_online: {
      type: Boolean,
      default: false,
    },
    is_profile_completed: {
      type: Boolean,
      default: false,
    },
    is_password_reset: {
      type: Boolean,
      default: false,
    },
    is_password_created_by_user: {
      type: Boolean,
      default: false,
    },
    height: String,

    weight: String,
    steps_everyday_goal: Number,
    esic_number: String,
    pf_number: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>('User', UserSchema);
