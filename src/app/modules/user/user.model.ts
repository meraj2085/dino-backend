/* eslint-disable no-undef */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { encryptPassword } from '../../../utils/cryptoPassword';
import { generateStrongPassword } from '../../../utils/passwordGenerate';

const UserSchema = new Schema<IUser, UserModel>(
  {
    organization_id: String,
    first_name: String,
    last_name: String,
    date_of_birth: String,
    gender: String,
    employment_status: String, // ['Contract', 'Intern', 'Temporary', 'Part-time', 'Freelance']
    employee_code: String, // [EMP00001]
    office_email: {
      type: String,
      unique: true,
    },
    date_of_joining: String,
    department: String, // ['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations']
    flat_number: String,
    building_name: String,
    street: String,
    city: String,
    landmark: String,
    country: String,
    state: String,
    postal_code: String,
    phone_number: String,
    other_phone_number: String,
    personal_email: String,
    bank_name: String,
    account_number: String,
    branch_name: String,
    designation: String, // ['Software Engineer', 'Senior Software Engineer', 'Team Lead', 'Project Manager', 'Product Manager', 'CEO', 'CTO', 'COO', 'CFO', 'HR Manager', 'HR Executive', 'HR Intern', 'Marketing Manager', 'Marketing Executive', 'Marketing Intern', 'Sales Manager', 'Sales Executive', 'Sales Intern', 'Finance Manager', 'Finance Executive', 'Finance Intern', 'Operations Manager', 'Operations Executive', 'Operations Intern']
    team: String, // ['IT', 'Finance', 'Marketing', 'Sales', 'Operations']
    role: String, // ['Employee', 'Manager', 'Developer', 'Designer', 'Tester']
    manager_id: String, // [_id of user thats role is manager]
    emergency_contact: {
      full_name: String,
      phone_number: String,
      email: String,
      relationship: String,
    },
    contract_date: String,
    user_type: {
      type: String,
      enum: ['super_admin', 'admin', 'employee'],
      default: 'employee',
    },
    password: {
      type: String,
    },
    profile_picture: String,
    status: {
      type: String,
      enum: ['Deleted', 'Disabled', 'Active'],
      default: 'Active',
      required: true,
    },
    is_password_reset: {
      type: Boolean,
      default: false,
    },
    salaryDetails: {
      basic_salary: String,
      total_allowance: String,
      annual_bonus: String,
      total_ctc: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre('save', async function (next) {
  const new_password = await generateStrongPassword();
  this.password = await encryptPassword(new_password as string);
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
