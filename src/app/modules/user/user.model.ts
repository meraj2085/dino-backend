import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    organization_id: String,
    first_name: String,
    last_name: String,
    middle_name: String,
    date_of_birth: Date,
    gender: String,
    employment_status: String,
    employee_code: String,
    office_email: String,
    date_of_joining: Date,
    department: String,
    flat_number: String,
    building_name: String,
    street: String,
    branch: String,
    city: String,
    landmark: String,
    country: String,
    state: String,
    postal_code: Number,
    permanent_address: Object,
    phone_number: String,
    other_phone_number: String,
    personal_email: String,
    bank_name: String,
    account_number: Number,
    bank_details: Object,
    designation: String,
    team: String,
    role: String,
    manager_id: String,
    emergency_contact: Object,
    emergency_contact_details: Object,
    contract_date: Date,
    user_type: {
      type: String,
      enum: ['super_admin', 'hr', 'employee', 'admin'],
      default: 'employee',
    },
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>('User', UserSchema);
